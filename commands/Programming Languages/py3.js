const terminal = require('child_process').execSync;
const searchFlags = require('../../utils/searchFlags');
const MessageAttachment = require('../../utils/MessageAttachment');

module.exports = {
	name: ['Py3', 'Python3'],
	usage: '[-__h__ide|-__d__el] <code>',
	desc: 'Executes Python 3 code. Use -hide for hide the output and -del for delete the invocation message',
	DM: true,
	permissions: [ 'DEV' ],
	async exec(UnivBot, msg) {
		if(!msg.args.value)
			return msg.send('**Oops!** You didn\'t provided enough arguments');

		let output;
		try {
			output = terminal('echo "' + msg.args.value.replace(/"/g, '\\"').replace(/`/g, '\\`') + '" | python3', {shell: '/bin/bash'}).toString();
		} catch(e) {
			if(!hide)
				return msg.send(e.toString(), {code: 'js'});
			return;
		}

		if((msg.args.del || msg.args.d) && msg.guild) {
			msg.delete();
		}
		if(msg.args.hide || msg.args.h) {
			return;
		}

		if(output.length == 0)
			output = 'Successfully executed script without errors. Exit with code 0';

		if(output.length >= 1024) {
			msg.send("The output is too long, sending as attachment:", MessageAttachment(output, "output.txt"));
		} else {
			msg.send(output, {code: "py"});
		}
	}
}
