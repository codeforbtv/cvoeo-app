const Client = require('ssh2-sftp-client'); // Added to Package.json
const sort = require('fast-sort');

var sftp = new Client();

sftp.connect(
	{
		host: 'sftp.vistashare.com',
		port: '22',
		username: 'cvoeo9261',
		password: 'Ae4Oogha3eep'
	}
)
.then(
	() => {
		var fileList = sftp.list('/dropbox');
		return fileList;
	}
).then(
	(fileList) => {
		var fileNames = []; // create array to dump file names into and to sort later
		for (zipFileIdx in fileList) {
			var fileName = fileList[zipFileIdx].name; // actual name of file
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
			var newFile = {
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
		console.log(fileNames[0].name);
		return;
	}
);
return;