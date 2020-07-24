module.exports = {
	name: [ 'reverse', 'backwards' ],
	usage: '<message>',
	desc: 'Reverses the message',
	DM: true,
	permissions: [],
	exec(UnivBot, msg) {
		if (msg.args.length)
			return msg.send(msg.args.split('').reverse().join(''));
		return msg.send('I can\'t reverse the void');
	}
}
