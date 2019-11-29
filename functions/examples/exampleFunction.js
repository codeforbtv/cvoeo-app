const functions = require('firebase-functions');

/*
 * This is a simplified example of creating a firebase function in the cvoeo project.
 * Create your own firebase function as you normally would in it's own file, then make
 * sure to include it in the functions/index.js file.
 * 
 * Using this kind of directory structure provides two benefits over putting all the 
 * functions in the same index.js file:
 * 
 *  1. With each function isolated from all the others, things are more clear & readable
 *  2. It minimizes the chances of merge conflicts since its unlikely for people to be 
 *     working on the same file often.
 */

const exampleFunction = functions.https.onRequest((request, response) => {
	response.send("What a nice, tidy firebase function!");
});

module.exports = exampleFunction;