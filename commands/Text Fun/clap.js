module.exports = {
	name: 'clap',
	usage: '<message>',
	desc: 'Replaces the spaces with :clap:',
	DM: true,
	permissions: [],
	exec(UnivBot, msg) {
		if (msg.args.includes(' '))
			return msg.send(msg.args.replace(/ /g, ':clap:'));
		return msg.send('One clap for you :clap:');
	}
}
