const functions = require('firebase-functions');
const client = require('ssh2-sftp-client');
const streamZip = require('node-stream-zip');
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

exports.pullDataFromsFtp = functions.https.onRequest((request, response) => {
	 const sftpConnectionToCvoeo = new client();
	 //Connect to cvoeo sftp server using environment configuration. These have to be configured and deployed to firebase using the firebase cli.
   //https://firebase.google.com/docs/functions/config-env
	 sftpConnectionToCvoeo.connect({
		 host: `${functions.config().cvoeosftp.host}`,
		 username: `${functions.config().cvoeosftp.username}`,
		 password: `${functions.config().cvoeosftp.password}`
	 })
	 .then(() => {
		 return sftpConnectionToCvoeo.list('/');
	 })
	 .then((data) => {
		 console.log(data, 'the data info');
     response.send(data);
	 })
	 .then(() => {
		 return sftpConnectionToCvoeo.end();
	 })
	 .catch((error) => {
		 console.log(`Got the following error when trying to connect to the sftp server: ${{error}}`)
		 return sftpConnectionToCvoeo.end();
	 });
 });

 exports.streamZip = functions.https.onRequest((request, response) =>{
   const zip = new streamZip({
     file: 'gm_clients_served_2019-04-28-17.zip',
     storeEntries: true
   });

   zip.on('ready', () => {
     zip.stream('GM Clients Served in Date Range.csv', (err, stm) => {
     stm.on("data", function(data) {
       let chunk = data.toString();
       console.log(chunk);
       response.send(chunk);
       });
     stm.on('end', () => zip.close());
     });
   });
 })
