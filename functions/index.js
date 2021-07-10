const functions = require('firebase-functions');
const Client = require('ssh2-sftp-client');
const AdmZip = require('adm-zip');
const sort = require('fast-sort');
const Papa = require('papaparse');
const User = require('./models/user');
const Goal = require('./models/goal');
const {isValidEmail} = require('./models/data-validators');
const {db} = require('./models/user');
var admin = require('firebase-admin');

exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
	console.log("Attempting to access environment configuration data") //Must be configured on the firebase side using the firebase cli: https://firebase.google.com/docs/functions/config-env
	 try {
		 console.log(`user: ${functions.config().credentials.user} password: ${functions.config().credentials.password}`)
	 }
	 catch (error) {
		 console.log(`Got the following error when trying to access credentials: ${{error}}`)
   }
});

/**
 * WIP: Create a new user
 * 
 * Since the use of this app should be restricted to existing CVOEO clients, users 
 * cannot create their own account - the app does that for them. This is the second 
 * step in creating an account for users:
 *  1) MoMM pulls csv data from OutcomeTracker and identifies new ReachUp clients
 *  2) MoMM creates a new user in Firebase with the csv data
 *  3) The new user opens the app for the first time and clicks "register"
 *  4) The "register" behavior is actually the "forgot password" behavior; it walks
 *     the user through resetting the password for the firebase account we've created
 * 
    curl -X POST \
    http://localhost:5001/cvoeo-45350/us-central1/createAccount \
    -H 'Content-Type: application/json' \
    -d '{
      "email": "micahm@gmail.com"
    }'
 */
exports.createAccount = functions.https.onRequest((request, response) => {
  console.info(`Let's try creating an account for ${request.body.email}!`);
  
  // see: https://firebase.google.com/docs/auth/admin/manage-users#create_a_user
  admin.auth().createUser({
    email: request.body.email,
    emailVerified: false,
    phoneNumber: '+11234567890',
    password: 'secretPassword',
    displayName: 'John Doe',
    photoURL: 'http://www.example.com/12345678/photo.png',
    disabled: false
  })
    .then(function(userRecord) {
      // See the UserRecord reference doc for the contents of userRecord.
      console.log('Successfully created new user:', userRecord.email);
      response.send({ status: 200, data: { userRecord }});
    })
    .catch(function(error) {
      console.log('Error creating new user:', error);
      response.send({ status: 500, error: error });
    }); 
});

/*This firebase function is for testing purposes to be able to use a file saved locally as input.
 * @param request.body.clientOrGoalCSV {string} Either 'client' or 'goal', to correspond with the submitted csv
 To run this function, have a firebase server set locally then run the following command: 
 curl -X POST <local path to firebase fuunction> -H "Content-Type:application/json"  -d '{"pathToFile":"<path to local file>"}'
*/
exports.pullDataFromLocalCSVFileTEST = functions.https.onRequest((request, response) => {
  let fileContent="";
  let pathToFile="";
  let clientOrGoalCSV = "";
  pathToFile = request.body.pathToFile;
  clientOrGoalCSV = request.body.clientOrGoalCSV;
  if ((!(clientOrGoalCSV == 'client' || clientOrGoalCSV =='goal')) || (!(pathToFile))) {
    response
        .type('application/json')
        .status(409)
        .send({status:409, message: "Missing required params: clientOrGoalCSV must be 'client' or 'goal';pathToFile must have the path to the csv file being used"});
  }
  else {
    try {
    console.log('Extracting data from the following file: ' + JSON.stringify(pathToFile));
    let csvzip = new AdmZip(pathToFile);
    let zipEntries = csvzip.getEntries();
    if (zipEntries.length > 0) {
        console.log('Found ' + zipEntries.length + ' entry in the zip file');
        fileContent += csvzip.readAsText(zipEntries[0]);
        }
    switch (clientOrGoalCSV) {
      case 'client':
        parseClientCSVAndSaveToFireStore (fileContent);
        response
          .type('application/json')
          .status(200)
          .send({status:200, message: "Completed parsing CSV"});
        break;
      case 'goal':
        parseGoalCSVAndSaveToFireStore (fileContent);
        response
          .type('application/json')
          .status(200)
          .send({status:200, message: "Completed parsing CSV"});
        break;
      default:
        response
              .type('application/json')
              .status(500)
              .send({status:500, message: "Unexpected Failure"});
      } 
    }
    catch (err) {
      response
        .type('application/json')
        .status(500)
        .send({status:500, message: err});
    }
  }
})

/* This firebase function connects to the client's sftp server, 
   gets the most recent zipped CSV file and extracts the content.
  // TODO: look into tracking the name of the last parsed file and pulling all new files that were 
  added to the server since then
  Must pass in an argument stating which csv file to parse (client/goal): 
  curl -X POST <path to firebase fuunction> -H "Content-Type:application/json"  -d '{"
   clientOrGoalCSV:"<client|goal>"}'
*/
exports.pullDataFromSftp= functions.https.onRequest((request, response) => {
  // TODO: add more error handlng to this function
   let clientOrGoalCSV = "";
   clientOrGoalCSV = request.body.clientOrGoalCSV;
   if (!(clientOrGoalCSV == 'client' || clientOrGoalCSV =='goal')) {
    response
        .type('application/json')
        .status(409)
        .send({status:409, message: "Missing required param: clientOrGoalCSV must be 'client' or 'goal'"});
    }
    else {
      const sftpConnectionToCvoeo = new Client();
      let outString = "";
      let fileContent = "";
      const directoryName = '/dropbox/';
      //Connect to cvoeo sftp server using environment configuration. These have to be configured and deployed to firebase using the firebase cli.
      //https://firebase.google.com/docs/functions/config-env
      console.log('Establishing a connection with the sftp server')
      sftpConnectionToCvoeo.connect({
        host: `${functions.config().cvoeosftp.host}`,
        username: `${functions.config().cvoeosftp.username}`,
        password: `${functions.config().cvoeosftp.password}`
      })
      .then(
        () => {
          console.log('Getting the list of files in \'' + directoryName + '\' directory');
          return sftpConnectionToCvoeo.list(directoryName);
      })
      .then(
        (fileList) => {
          let fileNames = []; // create array to dump file names into and to sort later
          for (zipFileIdx in fileList) {
            let fileName = fileList[zipFileIdx].name; // actual name of file
            // Do a regex match using capturing parens to break up the items we want to pull out.
            // Results from regex will be in array of items matched to the capturing parentheses
            //
            // If regex match results were in an array named "res"...
            // res[0] contains the entire input string
            //
            //        Name                Year       Month   Day      Hour
            //        res[1]              res[2]     res[3]  res[4]   res[5]

            // Applies the regex pattern to our filename and stores result in fnParts (file name parts)
            switch (clientOrGoalCSV) {
              case 'client':
                fRegEx_gm_clients = /(gm_clients_served_)(\d\d\d\d)-(\d?\d)-(\d?\d)-?(\d?\d)?/;
                fnParts = fRegEx_gm_clients.exec(fileName);
                break;
              case 'goal':
                fRegEx_gm_goals = /(gm_goals_details_)(\d\d\d\d)-(\d?\d)-(\d?\d)-?(\d?\d)?/;        
                fnParts = fRegEx_gm_goals.exec(fileName);
                break;
              default:
                response
                  .type('application/json')
                  .status(500)
                  .send({status:500, message: "Unexpected Failure"});
              }                
            // we'll construct a new object to keep track of each files important details
            // and more importantly, to make it easy to sort/search
            if(fnParts) {          
            let newFile = {
              name: fileName,
              year: parseInt(fnParts[2]), 	// year
              month: parseInt(fnParts[3]), 	// month
              day: parseInt(fnParts[4]), 		// day
              hour: parseInt(fnParts[5]) || 0 // hour - first file of day has no hour in name so use 0 instead
              };
            fileNames.push(newFile) // toss new object into array
            }
          }
          // sort() is an instance of "fast-sort"
          // So to fine the newest file... sort by the year, then month, then day, then hour in a descending fashion.
          // The sort mutates the fileNames array... changes it directly.
          // In the end, the newest file on the server would be at fileNames[0] in our array.
          sort(fileNames).desc(
            [
              'year',
              'month',
              'day',
              'hour'
            ]
          );
          console.log('Most recent file on server: ' + fileNames[0].name);
          return fileNames[0].name;
          })
      .then(
        (newestFileName) => {
          // Names are like this 'gm_clients_served_2019-07-08-8.zip'
          // Request this specific ZIP file
          console.log('Getting ' + newestFileName + ' from server');
          let readableSFTP = sftpConnectionToCvoeo.get(directoryName + newestFileName);
          // Returning the variable here passes it back out to be caught
          // in the next '.then' clause
          return readableSFTP;
        })
      .then(
        // We can call the incoming data anything. Chunk is fairly
        // common with working with Node's in-memory streams/buffers.
        // Chunk also refers to the true hero in The Goonies.
        (chunk) => {
          // Create a new unzipper using the Chunk as input...
          let csvzip = new AdmZip(chunk);
          // Figure out how many files are in the Chunk-zip
          // Presumably always 1, but it could be any number.
          let zipEntries = csvzip.getEntries();
          // Again, collect output for future response...
          outString += "Zip Entries: " + JSON.stringify(zipEntries) + "\n";
          // Assuming that there is at least 1 entry in the Zip...
          // that is at least a single file inside the Zip...
          if (zipEntries.length > 0) {
            // HERE IS WHERE WE COULD PUT CODE OR A FUNCTION CALL
            // TO LOAD THE CSV INTO THE FIREBASE DATABASE
            //
            // Right now we just read the first file in the Zip, whatever it is,
            // but we are assuming it is probably a CSV file, as text.
            // We append the CSV content to our forthcoming response output.
            console.log('Found ' + zipEntries.length + ' entry in the zip file');
            fileContent += csvzip.readAsText(zipEntries[0]);
            }
          sftpConnectionToCvoeo.end();          
          console.log('Parsing file content');
          switch (clientOrGoalCSV) {
            case 'client':
              parseClientCSVAndSaveToFireStore (fileContent);
              response
              .type('application/json')
              .status(200)
              .send({status:200, message: "Completed parsing CSV"});
              break;
            case 'goal':
              parseGoalCSVAndSaveToFireStore (fileContent);
              response
              .type('application/json')
              .status(200)
              .send({status:200, message: "Completed parsing CSV"});
              break;
            default:
              console.log ("Unexpected Failure");
              response
              .type('application/json')
              .status(500)
              .send({status:500, message: "Unexpected Failure"});
            }      
          })
          // Error handler ... which just spits out the error message.
        .catch(
          (err) => {
            outString = 'ERROR: ' + err + "\n";
            console.log (outString);
            // Note we use a code of 500 here instead of 200 as above.
            response
              .type('application/json')
              .status(500)
              .send({status:500, message: err});
            });
      }
 });

/*This function parses the content provided and saves it to the firestore db:
  -Each user should have a firestore document in the "users" firestore collection
  -The 'System Name ID' field in the CSV file is used as the user unique ID
  TODO: confirm with cvoeo that the 'System Name ID' field is a reliable unique id to use
  -The function checks if the user already exists in the db:
    If user exists, update db with non empty fields + update/create new doc for goal if there is a goal
    If user does not exist, create a new user document under the 'users' collection + create new goal
  TODO: add more error handling to this function
*/
 function parseClientCSVAndSaveToFireStore(fileContent) {
  // TODO: Ideally data validation will be handled in the user/goal class but add any validations that are needed here
   Papa.parse(fileContent, {
    //papaparse (https://www.papaparse.com)returns 'results' which has an array 'data'.
    // Each entry in 'data' is an object, a set of key/values that match the header at the head of the csv file.
      header: true,
      skipEmptyLines: true,
      complete: function(results) {
        console.log("Found "+ results.data.length + " lines in file content\n");
        for (let i = 0;i<results.data.length ;i++) {
          if(!results.data[i]['System Name ID']) {
            console.log ("Missing 'System Name ID' field in file. This field is mandatory for creating and updating data in db"); 
          }          
          else {            
            let user = new User(results.data[i]['System Name ID']);
            for (let key in results.data[i]) {
                if(results.data[i][key] != "") {
                  switch (key) {
                    case 'First Name':
                      user.firstName = results.data[i][key];
                      break;
                    case 'Last Name':
                      user.lastName = results.data[i][key];
                      break;
                    case 'Email Address':
                        user.email = isValidEmail(results.data[i][key])
                        ? results.data[i][key].trim().toLowerCase()
                        : null;
                      break;
                    }
                  }
              }

            let usersCollection = db.collection('testusers');            
            usersCollection.where('uid', '==', user.uid).get()
            .then(userSnapshot => {
              if (userSnapshot.empty) {
                console.log("Did not find a matching document with uid " + user.uid);
                user.createNewUserInFirestore();                
                }
              else {
                console.log("Found a matching document for user uid " + user.uid);
                user.updateExistingUserInFirestore();               
                }
              })
            .catch(err => {
              throw (err);
              });
            }
          }
        }
      })
    }

    function parseGoalCSVAndSaveToFireStore(fileContent) {
      //*** Known issue: When parsing a csv file with multiple lines that have goal data, saving to firestore is not working properly */
     // TODO: Ideally data validation will be handles in the user class but add any validations that are needed here
      Papa.parse(fileContent, {
       //papaparse (https://www.papaparse.com)returns 'results' which has an array 'data'.
       // Each entry in 'data' is an object, a set of key/values that match the header at the head of the csv file.
         header: true,
         skipEmptyLines: true,
         complete: function(results) {
           console.log("Found "+ results.data.length + " lines in file content\n");
           for (let i = 0;i<results.data.length ;i++) {
             if(!results.data[i]['System Name ID']) {          
               console.log ("Missing 'System Name ID' field in file. This field is mandatory for creating and updating data in db"); 
             }          
             else {
               let user = new User(results.data[i]['System Name ID']);  
               let goal = new Goal(results.data[i]['System Name ID']);
               for (let key in results.data[i]) {
                  if (results.data[i][key] != "") {
                    switch (key) {
                      case 'Goal':
                        goal.goaluid = results.data[i][key];
                        break;
                      case 'Goal Category':
                        goal.goalCategory = results.data[i][key];
                        break;
                      case 'Date':
                        goal.goalDate = results.data[i][key];
                        break;
                      case 'Next Steps':
                          goal.goalNextSteps = results.data[i][key];
                          break;
                      case 'Progress':
                          goal.goalProgress = results.data[i][key];
                          break;                          
                      }
                  }
               }
   
               let usersCollection = db.collection('testusers');            
               usersCollection.where('uid', '==', user.uid).get()
               .then(userSnapshot => {
                 if (userSnapshot.empty) {
                   console.log("Did not find a matching document with uid " + user.uid);
                   user.createNewUserInFirestore();
                   goal.createNewGoalInFirestore();                  
                 }
                 else {
                   console.log("Found a matching document for user uid " + user.uid);
                   usersCollection.doc(user.uid).collection('goals').where('goaluid', '==', goal.goaluid).get()
                   .then(goalSnapshot => {
                     if (goalSnapshot.empty) {
                         console.log("Did not find a matching document with goal id " + goal.goaluid + " for user " + goal.useruid);
                         goal.createNewGoalInFirestore();
                      }
                      else {
                         console.log("Found a matching document for goal id " + goal.goaluid + " under document for user " + goal.useruid);
                         goal.updateExistingGoalInFirestore();
                      }
                    })
                  }
                })
               .catch(err => {
                 throw (err);
               });
               }
             }
           }
         })
       }
