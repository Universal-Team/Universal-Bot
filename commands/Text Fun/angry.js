module.exports = {
	name: 'angry',
	usage: '<Message>',
	desc: 'Makes the message look angry',
	DM: true,
	permissions: [],
	exec(UnivBot, msg) {
		if (msg.args.length)
			return msg.send('**'+msg.author.tag+'**: '+msg.args.toUpperCase().split('').join(' '));
		return msg.send('The void is not angry');
	}
}
