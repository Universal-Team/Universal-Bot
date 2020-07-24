module.exports = {
	name: 'clap',
	usage: '[--last|-l] [message]',
	desc: 'Replaces the spaces with :clap:',
	DM: true,
	permissions: [],
	exec(UnivBot, msg) {
		if(msg.args == '-l' || msg.args == '--last')
			msg.args = msg.channel.messages.cache.array()[msg.channel.messages.cache.size - 2].content;
		else if(!msg.args.includes(' '))
			return msg.send('One clap for you :clap:');

		msg.send(msg.args.replace(/ /g, ':clap:'));
	}
}
