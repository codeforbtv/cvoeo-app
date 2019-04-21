const functions = require('firebase-functions');
const client = require('ssh2-sftp-client');

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
 
exports.sftpConnect = functions.https.onRequest((request, response) => {
	 var sftp = new client();
	 //connect to cvoeo sftp server
	 sftp.connect({
		 host: `${functions.config().serverinfo.host}`,
		 username: `${functions.config().serverinfo.username}`,
		 password: `${functions.config().serverinfo.password}`
	 })
	 .then(() => {
		 return sftp.list('/');
	 })
	 .then((data) => {
		 console.log(data, 'the data info');
	        response.send(data);
	 })
	 .then(() => {
		 return sftp.end();
	 })
	 .catch((error) => {
		 console.log(`Got the following error when trying to connect to the sftp server: ${{error}}`)
		 return sftp.end();
	 });
 });
 