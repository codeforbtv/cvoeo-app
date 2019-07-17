const functions = require('firebase-functions'); 
const Client = require('ssh2-sftp-client'); // Added to Package.json
const AdmZip = require('adm-zip'); // Added to Package.json

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
 // exports.helloWorld = functions.https.onRequest((request, response) => {
	//  response.send("Hello from Firebase!");

	// 	console.log("Attempting to access environment configuration data") //Must be configured on the firebase side using the firebase cli: https://firebase.google.com/docs/functions/config-env
	// 	 try {
	// 		 console.log(`user: ${functions.config().credentials.user} password: ${functions.config().credentials.password}`)
	// 	 }
	// 	 catch (error) {
	// 		 console.log(`Got the following error when trying to access credentials: ${{error}}`)
	// 	 }
 // });
 
// Host: floersch.net
// User: sftptest
// Password: fLvVcrWcC2cMR4ezHEJ)
 exports.sftptest = functions.https.onRequest((request, response) => {
 	var outString = "";
 	var sftp = new Client();
 	// We can only return a response to the HTTP client once.
 	// So this string will collect various updates through the function's run
 	// and when we finally respond to the request, we can have all the 
 	// messages returned at once.
 	outString = outString + "sftp client created.\n";
 	sftp.connect(
 		{
 			host: 'floersch.net',
 			port: '22',
 			username: 'sftptest',
 			password: 'fLvVcrWcC2cMR4ezHEJ)'
 		}
 	)
	.then(
		() => {
			var readableSFTP = sftp.get('test.zip');
			console.log('readableSFTP: ' + JSON.stringify(readableSFTP,null,'  '));
			return readableSFTP;
		}
	)
	.then(
		(chunk) => {
			console.log('chunk: ' + JSON.stringify(chunk,null,'  '));
			outString += chunk;
			var csvzip = new AdmZip(chunk);
			var zipEntries = csvzip.getEntries();
			outString += "Zip Entries: " + JSON.stringify(zipEntries,null,'  ') + "\n";
			if (zipEntries.length > 0) {
				outString += "CSV Content: " + csvzip.readAsText(zipEntries[0]);
			}
			response.send(outString, 200);

			return true;
		}
	)
	.catch(
		(err) => {
			outString = 'ERROR: ' + err + "\n";
			response.send(outString, 500);
		}
	);

 	
 });
