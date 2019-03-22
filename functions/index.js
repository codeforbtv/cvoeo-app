const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
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
 