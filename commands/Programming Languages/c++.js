const searchFlags = require('../../utils/searchFlags');
const MessageAttachment = require('../../utils/MessageAttachment');
const compile = require('../../utils/compile');

module.exports = {
	name: ['C++', 'CPP'],
	usage: '[-__h__ide|-__d__el|-__t__emplate] <code>',
	desc: 'Executes C++ code. Use -hide for hide the output, -del for delete the invocation message and -template for automatically add stdio.h, string, and vector.',
	DM: true,
	permissions: [ 'DEV' ],
	async exec(UnivBot, msg) {
		if(!msg.args.value)
			return msg.send('**Oops!** You didn\'t provided enough arguments');

		if(msg.args.template || msg.args.t)
			msg.args.value = `
#include <stdio.h>
#include <string>
#include <vector>

int main(int argc, char *argv[]) {
${msg.args.value}
return 0;
}`;

		if((msg.args.delete || msg.args.d) && msg.guild)
			msg.delete();

		let output;
		let object = compile(msg.args.value, 'cpp');

		if(msg.args.hide || msg.args.h)
			return;

		if(typeof object !== 'object')
			return msg.send(object, {code: 'js'});

		output = object.stdout;
		if(output.length == 0)
		output = 'Successfully executed script without errors. Exit with code 0';

		if(output.length >= 1024) {
			msg.send("The output is too long, sending as attachment:", MessageAttachment(output, "output.txt"));
		} else {
			msg.send(output, {code: "cpp"});
		}
	}
}
