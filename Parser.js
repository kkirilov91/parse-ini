// function Parser() {};

/*
	Static functions for parsing
*/

exports.parseIniToJson = function(file) {
	var length = file.length,
		newFile = '',
		start = -1,
		wordStarted = false;
		curlBrakeds = 0,
		word = '',
		isAttribute = false,
		attribute = '';

	for (var i = 0; i < file.length - 1; i++) {
		if (file[i] === '[' && !wordStarted) {
			wordStarted = true;
		}

		if (file[i] === ']' && !wordStarted) {
			curlBrakeds--;
			isAttribute = false;
		}

		if (file[i] === '"') {
			if (wordStarted) {
				//TODO FIX this too slow, no need
				word = file.substring(start+1, i);
				wordStarted = false;

				if (curlBrakeds === 1) {
					newFile += '\n\n';
					newFile += "[" + word + "]"
				}

				if (curlBrakeds === 2) {
					if(isAttribute) {
					//TODO FIX this too slow, no need
						attribute =  file.substring(start+1, i);
						isAttribute = false;
					} else {
						newFile += '\n' + attribute + '=' + word;
						isAttribute = true;
					}
				}
			} else {
				wordStarted = true;
				start = i;
			}
		}
	};
	return newFile;
};

exports.parseJsonToIni = function(file) {
	var length = file.length,
		newFile = '',
		start = -1,
		wordStarted = false;
		curlBrakeds = 0,
		word = '',
		isAttribute = false,
		attribute = '';

	for (var i = 0; i < file.length - 1; i++) {
		if (file[i] === '{' && !wordStarted) {
			curlBrakeds++;
			isAttribute = true;

			if (curlBrakeds > 2)
				throw "The JSON file can't be parsed, because of too many nested objects(max is 2)"
		}

		if (file[i] === '}' && !wordStarted) {
			curlBrakeds--;
			isAttribute = false;
		}

		if (file[i] === '"') {
			if (wordStarted) {
				//TODO FIX this too slow, no need
				word = file.substring(start+1, i);
				wordStarted = false;

				if (curlBrakeds === 1) {
					newFile += '\n\n';
					newFile += "[" + word + "]"
				}

				if (curlBrakeds === 2) {
					if(isAttribute) {
					//TODO FIX this too slow, no need
						attribute =  file.substring(start+1, i);
						isAttribute = false;
					} else {
						newFile += '\n' + attribute + '=' + word;
						isAttribute = true;
					}
				}
			} else {
				wordStarted = true;
				start = i;
			}
		}
	};
	return newFile;
};