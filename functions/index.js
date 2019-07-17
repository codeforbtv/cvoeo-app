const functions = require('firebase-functions');
const Client = require('ssh2-sftp-client');
const admZip = require('adm-zip');

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
 	let sftp = new Client();
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
			return sftp.list('/');
		}
	)
	.then(
		(data) => {
			outString = outString + 'the data:' + JSON.stringify(data,null,'  '); + "\n";
			response.send(outString);
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
