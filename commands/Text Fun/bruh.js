module.exports = {
	name: 'bruh',
	usage: '[--last|-l] [message]',
	desc: 'Replaces all the spaces with a nice bruh',
	DM: true,
	permissions: [],
	exec(UnivBot, msg) {
		if(!msg.args.length)
			return msg.send('no bruh for bruh you');
		else if(msg.args == '-l' || msg.args == '--last')
			msg.args = msg.channel.messages.cache.array()[msg.channel.messages.cache.size - 2].content;

		msg.send(bruhify(msg.args));
	}
}

function bruhify(text) {
	return 'BRUH ' + text.replace(/[ ]/gm, " bruh ") + ' BRUH';
}
