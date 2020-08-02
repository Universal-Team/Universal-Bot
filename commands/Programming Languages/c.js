const searchFlags = require('../../utils/searchFlags');
const MessageAttachment = require('../../utils/MessageAttachment');
const compile = require('../../utils/compile');

module.exports = {
	name: 'C',
	usage: '[-__h__ide|-__d__el|-__t__emplate] <code>',
	desc: 'Executes C code. Use -hide for hide the output, -del for delete the invocation message and -template for automatically add stdio.h, main and booleans.',
	DM: true,
	permissions: [ 'DEV' ],
	async exec(UnivBot, msg) {
		if(!msg.args.value)
			return msg.send('**Oops!** You didn\'t provided enough arguments');

		if(msg.args.template || msg.args.t)
			msg.args.value = `
#include <stdio.h>
#define bool char
#define true 1
#define false 0

int main(int argc, char *argv[]) {
${msg.args.value}
return 0;
}`;

		if((msg.args.del || msg.args.d) && msg.guild)
			msg.delete();

		let output;
		let object = compile(msg.args.value, 'c');

		if(msg.args.hide || msg.args.h)
			return;

		if(typeof object !== 'object')
			return msg.send(object, {code: 'js'});

		output = object.stdout;
		if(output.length == 0)
			output = 'Successfully executed script without errors. Exit with code 0';

		let options = new MessageAttachment(object.binary, 'binary');
		options.push(output, 'output.txt');
		options.code = 'c';

		if(output.length >= 1024) {
			await msg.send('The output has been trimmed to the first 1024 characters.');
			msg.send(output.substr(0, 1024), options);
		} else {
			msg.send(output, options);
		}
	}
}
