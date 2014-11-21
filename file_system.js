var fileToOpen = process.argv[2],
	fileExtention = '',
	convertedFile = '',
	self = this;

if (!fileToOpen) {
	throw 'No argument found.';
}

//TODO: ITS stupid, to do it that wy, but it is faster for me упрей гу
var fileSplit = fileToOpen.split('.'),
	parser = require('./Parser.js'),
	isUrl =  function(string) {
		return string.substring(0, 7) === 'http://';
	};
fileExtention = fileSplit[fileSplit.length-1];

if (isUrl(fileToOpen)) {
	console.log('dasdsad')
	var http = require('http'),
		options = {
			method: 'GET',
			host: 'http://ip.jsontest.com/'
		};

		http.request(options, function(response) {
			console.log(response);
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
	fs.readFile(fileToOpen, 'utf8', function (err, data) {
		if(err) {
			throw err;
		}		

		if (fileExtention === 'ini') {
			convertedFile = parser.parseIniToJson(data);
		} else if (fileExtention === 'json') {
			convertedFile = parser.parseJsonToIni(data);
		}

		console.log(convertedFile);
	})
}

