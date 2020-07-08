const ts2js = require('../../utils/ts2js');
const searchFlags = require('../../utils/searchFlags');
const MessageAttachment = require('../../utils/MessageAttachment');

module.exports = {
	name: ['TypeScript', 'TS'],
	usage: '<Code>',
	desc: 'Executes TS code. Use --hide for hide the output, --string for not inspect the output and --del for delete the invocation message',
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

		let message = await msg.send('Running typescript can be slow, please be patient...');
		let output = ts2js(obj.string);
		message.delete({timeout: 1, reason: "Done running ts2js"});

		if (output.stderr || output.stdout) {
			let err = output.stderr;
			if (err.length < output.stdout.length)
					err = output.stdout;

			if (!err.length)
					err = 'typescript.ts(0,0): error: The given code has errors.';

			if (!hide)
				return msg.send(err, {code: 'ts'});
			return;
		}

		try {
			output = await eval(output.compiled);
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
