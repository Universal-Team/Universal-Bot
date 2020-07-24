const searchFlags = require('../../utils/searchFlags');
const MessageAttachment = require('../../utils/MessageAttachment');

module.exports = {
	name: ['JavaScript', 'JS'],
	usage: '<code>',
	desc: 'Executes JS code. Use --hide for hide the output, --string for not inspect the output and --del for delete the invocation message',
	DM: true,
	permissions: [ 'DEV' ],
	async exec(UnivBot, msg) {
		let obj = searchFlags(msg.args.trim(), ['--hide', '--del', '--string'])

		let stringify = require('util').inspect;
		let hide = false;
		let del = false;

		if (obj.flags.includes('--hide'))
				hide = true;
		if (obj.flags.includes('--del'))
				del = true;
		if (obj.flags.includes('--string'))
				stringify = variable => variable.toString();

		if (!obj.string.length)
			return msg.send('**Oops!** You didn\'t provided enough arguments');

		let output;
		try {
			output = await eval(obj.string);
			if (typeof output !== 'function')
				output = stringify(output);
			if (typeof output !== 'string')
				output = output.toString();
		} catch(e) {
			if (!hide)
				return msg.send(e.toString(), {code: 'js'});
			return;
		}

		if (del && msg.guild) {
			msg.delete();
		}
		if (hide) {
			return;
		}

		let config = new MessageAttachment(output, 'output.txt');
		config.code = 'js';

		if (output.length >= 1024) {
			await msg.send('The output has been trimmed to the first 1024 characters.');
			msg.send(output.substr(0, 1024), config);
		} else {
			msg.send(output, config);
		}
	}
}
