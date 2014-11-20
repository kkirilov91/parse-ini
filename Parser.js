// function Parser() {};

/*
	Static functions for parsing
*/

//TODO: Not implemented yet
exports.parseIniToJson = function(file) {
	var length = file.length,
		attribute = '',
		attributeValue = '',
		lines = file.split('\n'),
		currWord = '',
		jsonObj = {};

	for (var i = 0; i < lines.length; i++) {
		if (lines[i].charAt(0) === '#') {
			// If the line is comment
			continue;
		}

		if (lines[i].charAt(0) === '[') {
			// If the line is upper class 
			var brakedIndex = lines[i].indexOf(']');

			if (brakedIndex === -1) {
				throw 'Incorrect INI format there is "]" missing on line' + lines[i];
			}

			currWord = lines[i].substring(1, brakedIndex);
			jsonObj[currWord] = {};
		} else {
			// If the line is attribute
			var eqIndex = lines[i].indexOf('=');
			if (eqIndex !== -1) {
				attribute = lines[i].substring(0, eqIndex);
				attributeValue = lines[i].substring(eqIndex + 1);
				if (currWord === '') {
					throw 'Incorrect INI format, the file, should start with [name] instead of a=b';
				}
				jsonObj[currWord][attribute] = attributeValue;
			}
		}
	}

	return JSON.stringify(jsonObj);
};

exports.parseJsonToIni = function(file) {
	var jsonObj = JSON.parse(file),
		newFile = '';

	for (var cls in jsonObj) {
		newFile += '\n[' + cls + ']';
		for (var attr in jsonObj[cls]) {
			newFile += '\n' + attr + '=' + jsonObj[cls][attr];
		}
	}

	return newFile;
};