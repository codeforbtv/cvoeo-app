const functions = require('firebase-functions'); 
const Client = require('ssh2-sftp-client'); // Added to Package.json
const AdmZip = require('adm-zip'); // Added to Package.json
 
// Host: floersch.net
// User: sftptest
// Password: fLvVcrWcC2cMR4ezHEJ)
// -- YES I KNOW THERE IS A PASSWORD HERE
// -- YES I INTENDED IT TO HELP OTHERS LEARN/TEST
 exports.sftptest = functions.https.onRequest((request, response) => {
 	var outString = "";
 	var sftp = new Client();
 	// We can only return a response to the HTTP client once.
 	// So this string will collect various updates through the function's run
 	// and when we finally respond to the request, we can have all the 
 	// messages returned at once.
 	outString = outString + "sftp client created.\n";
 	// create a new SFTP connection
 	sftp.connect(
 		{
 			host: 'floersch.net',
 			port: '22',
 			username: 'sftptest',
 			password: 'fLvVcrWcC2cMR4ezHEJ)'
 		}
 	)
 	// Once we have successfully connected...
	.then(
		() => {
			// Request this specific ZIP file
			var readableSFTP = sftp.get('test.zip');
			// Tell the server log about it...
			console.log('readableSFTP: ' + JSON.stringify(readableSFTP,null,'  '));
			// Returning the variable here passes it back out to be caught
			// in the next '.then' clause
			return readableSFTP;
		}
	)
	// Once the file is transferred it is in memory/ returned as input...
	.then(
		// We can call the incoming data anything. Chunk is fairly 
		// common with working with Node's in-memory streams/buffers.
		// Chunk also refers to the true hero in The Goonies.
		(chunk) => {
			// Tell the server log what's going on
			console.log('chunk: ' + JSON.stringify(chunk,null,'  '));
			// Collect output for future response
			outString += chunk;
			// Create a new unzipper using the Chunk as input...
			var csvzip = new AdmZip(chunk);
			// Figure out how many files are in the Chunk-zip
			// Presumably always 1, but it could be any number.
			var zipEntries = csvzip.getEntries();
			// Again, collect output for future response...
			outString += "Zip Entries: " + JSON.stringify(zipEntries,null,'  ') + "\n";
			// Assuming that there is at least 1 entry in the Zip...
			// that is at least a single file inside the Zip...
			if (zipEntries.length > 0) {
				// HERE IS WHERE WE COULD PUT CODE OR A FUNCTION CALL
				// TO LOAD THE CSV INTO THE FIREBASE DATABASE
				//
				// Right now we just read the first file in the Zip, whatever it is,
				// but we are assuming it is probably a CSV file, as text.
				// We append the CSV content to our forthcoming response output.
				outString += "CSV Content: " + csvzip.readAsText(zipEntries[0]);
			}
			// Finally send the response string along with the official A-OK code (200)
			response.send(outString, 200);

			return true;
		}
	)
	// Error handler ... which just spits out the error message.
	.catch(
		(err) => {
			outString = 'ERROR: ' + err + "\n";
			// Note we use a code of 500 here instead of 200 as above.
			response.send(outString, 500);
		}
	);

 	
 });
