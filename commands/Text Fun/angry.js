module.exports = {
	name: 'angry',
	usage: '[--last|-l] [message]',
	desc: 'Makes the message look angry',
	DM: true,
	permissions: [],
	exec(UnivBot, msg) {
		if(msg.args == '-l' || msg.args == '--last')
			msg.args = msg.channel.messages.cache.array()[msg.channel.messages.cache.size - 2].content;

		if(!msg.args.length)
			return msg.send('The void is not angry');

		msg.send('***' + msg.args.toUpperCase().split('').join(' ') + '***');
	}
}
