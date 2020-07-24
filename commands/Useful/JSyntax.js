module.exports = {
	name: [ 'JSyntax', 'CheckJSyntax' ],
	usage: '<JS Code>',
	desc: 'Checks the syntax of JS code',
	DM: true,
	permissions: [],
	exec(UnivBot, msg) {
		if (!msg.args.length)
			return msg.send('**Oops!** You didn\'t provided enough arguments');

		try {
			new Function(msg.args);
			msg.reply('Your code has no syntax errors');
		} catch(e) {
			var error = '``'+e.toString().split('Error')[0]+'`` error. The problem is: ``'+e.toString().split(' ').slice(1).join(' ')+'``';
			if (error.startsWith('````'))
				error = '``Error``'+error.substr(10);
			msg.reply('Your code has a '+error);
		}
	}
}
