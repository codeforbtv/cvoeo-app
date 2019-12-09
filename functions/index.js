const functions = require('firebase-functions');
const Client = require('ssh2-sftp-client');
const AdmZip = require('adm-zip');
const sort = require('fast-sort');
const Papa = require('papaparse');
const admin = require('firebase-admin');
const User = require('./models/user');
const {isValidEmail} = require('./models/validators');

admin.initializeApp();
const db = admin.firestore();

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

exports.pullDataFromLocalCSVFile = functions.https.onRequest((request, response) => {
  var fileContent="";
  var readableSFTP="";
  readableSFTP = request.body.readableSFTP
  console.log('readableSFTP: ' + JSON.stringify(readableSFTP));
  var csvzip = new AdmZip(readableSFTP);
  var zipEntries = csvzip.getEntries();
  if (zipEntries.length > 0) {
      console.log('Found ' + zipEntries.length + ' entry in the zip file');
      fileContent += csvzip.readAsText(zipEntries[0]);
}
  parseCSVFromServer (fileContent);
  response.send('done');
})

exports.pullDataFromSftp= functions.https.onRequest((request, response) => {
	 const sftpConnectionToCvoeo = new Client();
   var outString = "";
   var fileContent = "";
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
      var fileNames = []; // create array to dump file names into and to sort later
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
        fRegEx = /(gm_clients_served_)(\d\d\d\d)-(\d?\d)-(\d?\d)-?(\d?\d)?/;
        // Applies the regex pattern to our filename and stores result in fnParts (file name parts)
        fnParts = fRegEx.exec(fileName);
        // we'll construct a new object to keep track of each files important details
        // and more importantly, to make it easy to sort/search
        let newFile = {
          name: fileName,
          year: parseInt(fnParts[2]), 	// year
          month: parseInt(fnParts[3]), 	// month
          day: parseInt(fnParts[4]), 		// day
          hour: parseInt(fnParts[5]) || 0 // hour - first file of day has no hour in name so use 0 instead
        };
        fileNames.push(newFile) // toss new object into array
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
      var readableSFTP = sftpConnectionToCvoeo.get(directoryName + newestFileName);
      // Tell the server log about it...
       console.log('readableSFTP: ' + JSON.stringify(readableSFTP));
      // Returning the variable here passes it back out to be caught
      // in the next '.then' clause
      return readableSFTP;
    })
  .then(
    // We can call the incoming data anything. Chunk is fairly
    // common with working with Node's in-memory streams/buffers.
    // Chunk also refers to the true hero in The Goonies.
    (chunk) => {
      // Tell the server log what's going on
       // console.log('chunk: ' + JSON.stringify(chunk));
      // Collect output for future response
      //outString += chunk; // Display ZIP file as binary output... looks ugly and is useless.
      // Create a new unzipper using the Chunk as input...
      var csvzip = new AdmZip(chunk);
      // Figure out how many files are in the Chunk-zip
      // Presumably always 1, but it could be any number.
      var zipEntries = csvzip.getEntries();
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
      // Finally send the response string along with the official A-OK code (200)
      console.log('Parsing file content');
      parseCSVFromServer (fileContent);
      response.send(outString, 200);
      return true;
      })
      // Error handler ... which just spits out the error message.
    .catch(
      (err) => {
        outString = 'ERROR: ' + err + "\n";
        console.log (outString);
        // Note we use a code of 500 here instead of 200 as above.
        response.send(outString, 500);
      });
 });

 function parseCSVFromServer(fileContent) {
  //papaparse (https://www.papaparse.com)returns 'results' which has an array 'data'.
  // Each entry in 'data' is an object, a set of key/values that match the header at the head of the csv file.
    Papa.parse(fileContent, {
      header: true,
      skipEmptyLines: true,
      complete: function(results) {
        console.log("Found "+ results.data.length + " lines in file content\n");
        //printing all the key values in the csv file to console ** for now **
        for (var i = 0;i<results.data.length ;i++) {
          console.log("Entry number", i, ":");
          console.log("---------------");
          var user = new User();
          user.dateCreated = Date.now();
          for (var key in results.data[i]) {
              if(results.data[i][key] != "") {
                console.log("key " + key + " has value " + results.data[i][key]);
                switch (key) {
                  case 'System Name ID':
                    user.uid = results.data[i][key];
                    console.log(user.uid);
                    break;
                   case 'First Name':
                     user.firstName = results.data[i][key];
                     console.log(user.firstName);
                     break;
                   case 'Last Name':
                     user.lastName = results.data[i][key];
                     console.log(user.lastName);
                     break;
                   case 'Email Address':
                      user.email = isValidEmail(results.data[i][key])
                      ? results.data[i][key].trim().toLowerCase()
                      : null;
                     console.log(user.email);
                    break;
                }
              }
              else {
                console.log("key " + key + " has no value ");
              }
          }
          updateOrCreateUseronFireStore (user)
        console.log("**************************************\n");
        }
     }
  });
}

function updateOrCreateUseronFireStore (user){
  let usersCollection = db.collection('users');
  usersCollection.where('uid', '==', user.uid).get()
    .then(snapshot => {
      if (snapshot.empty) {
        console.log('No matching documents. Creating a new document for this user');
        let currentUser = {
          created: user.dateCreated,
          uid: user.uid,
          displayName: user.firstName,
          lastName: user.lastName,
          email: user.email
        };
        usersCollection.doc(user.uid).set(currentUser);
      }
      else {
        console.log("User already exists. Updating new data only");
          if (user.firstName) {
            console.log ("Updating first name");          
            usersCollection.doc(user.uid).update({displayName: user.firstName});

          if (user.lastName) {
            console.log ("Updating Last name");          
            usersCollection.doc(user.uid).update({lastName: user.lastName});
          }
          if (user.email) {
            console.log ("Updating email address");          
            usersCollection.doc(user.uid).update({email: user.email});
          }
        }
      }
    })
    .catch(err => {
      console.log('Error getting documents', err);
    });
}
