'use strict'

const firstFlag = function(target, flags) {
	target = target.toLowerCase();

	for (let flag of flags) {
		if (target.startsWith(flag.toLowerCase()))
			return flag;
	}

	return '';
}

/**
 * Finds all the matches of the array at the start of the string and removes them
 * @example searchFlags('--test --delete Hello world', [ '--DELETE', '--TEST' ]) => { flags: [ '--TEST', '--DELETE' ], string: 'Hello world' }
 * @param {string} target
 * @param {array} flags
 */
function searchFlags(target, flags) {
	let foundFlags = []

	for (let flag  = firstFlag(target, flags); flag.length > 0; flag = firstFlag(target, flags)) {
		target     = target.substr(flag.length).trim();

		foundFlags.push(flag);
	}

	return { flags: foundFlags, string: target };
}

module.exports = searchFlags;
