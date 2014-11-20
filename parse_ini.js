var fileToOpen = process.argv[2],
	fileExtention = '',
	convertedFile = '',
	self = this;

if (!fileToOpen) {
	throw 'No argument found.';
}

var fileSplit = fileToOpen.split('.'),
	parser = require('./parser.js');
fileExtention = fileSplit[fileSplit.length - 1];

if (isUrl(fileToOpen)) {
	var http = require('http'),
		options = {
			method: 'GET',
			host: fileToOpen
		};

	http.request(options, function(response) {
		response.on('data', function(data) {
			if (fileExtention === 'ini') {
				convertedFile = parser.convertIniToJson(data);
			} else if (fileExtention === 'json') {
				convertedFile = parser.convertJsonToIni(data);
			}
		})
	}).end();
} else {
	var fs = require('fs');
	fs.readFile(fileToOpen, 'utf8', function(err, data) {
		if (err) {
			throw err;
		}

		if (fileExtention === 'ini') {
			convertedFile = parser.parseIniToJson(data);
		} else if (fileExtention === 'json') {
			convertedFile = parser.parseJsonToIni(data);
		}

		console.log(convertedFile);
	})
};

function isUrl(string) {
	return string.substring(0, 7) === 'http://';
}