const searchFlags = require('../../utils/searchFlags');
const MessageAttachment = require('../../utils/MessageAttachment');
const compile = require('../../utils/compile');

module.exports = {
	name: ['ASM', 'Assembly'],
	usage: '<Code>',
	desc: 'Executes ASM code. Use --hide for hide the output and --del for delete the invocation message.',
	DM: true,
	permissions: [ 'DEV' ],
	async exec(UnivBot, msg) {
		let obj = searchFlags(msg.args, ['--del', '--hide']);
	
		if (!obj.string.length)
			return msg.send('**Oops!** You didn\'t provided enough arguments');
	
		if (obj.flags.includes('--del') && msg.guild)
			msg.delete();

		let output;
		let object = compile(obj.string, 'asm');
	
		if (obj.flags.includes('--hide'))
			return;
	
		if (typeof object !== 'object')
			return msg.send(object, {code: 'js'});

		output = object.stdout;
		if (output.length == 0)
			output = 'Successfully executed script without errors. Exit with code 0';
	
		let options = new MessageAttachment(object.binary, 'binary');
		options.push(output, 'output.txt');
		options.code = 'c';
	
		if (output.length >= 1024) {
			await msg.send('The output has been trimmed to the first 1024 characters.');
			msg.send(output.substr(0, 1024), options);
		} else {
			msg.send(output, options);
		}
	}
}
