module.exports = {
	name: [ 'reverse', 'backwards' ],
	usage: '[--last|-l] [message]',
	desc: 'Reverses the message',
	DM: true,
	permissions: [],
	exec(UnivBot, msg) {
		if(msg.args == '-l' || msg.args == '--last')
			msg.args = msg.channel.messages.cache.array()[msg.channel.messages.cache.size - 2].content;

		if(!msg.args.length)
			return msg.send('I can\'t reverse the void');

		msg.send(msg.args.split('').reverse().join(''));
	}
}
