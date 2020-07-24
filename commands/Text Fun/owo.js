const faces = ['OwO', 'UwU', '>w<', '^w^', '-w-', 'XwX', 'TwT'];

module.exports = {
	name: ['owo', 'owoify', 'uwu', 'uwuify'],
	usage: '[--last|-l] [message]',
	desc: 'OwO-ify a message',
	DM: true,
	permissions: [],
	exec(UnivBot, msg) {
		if(!msg.args.length)
			return msg.send('No ' + faces[Math.floor(Math.random() * faces.length)] + ' fow you');
		else if(msg.args == '-l' || msg.args == '--last')
			msg.args = msg.channel.messages.cache.array()[msg.channel.messages.cache.size - 2].content;

		msg.send(OwOify(msg.args));
	}
}

function OwOify(text) {
	return text
		.replace(/need/g, 'nweed')
		.replace(/oh no/g, 'ono')
		.replace(/speak/g, 'spweak')
		.replace(/stand/g, 'stwand')
		.replace(/time/, 'tim')
		.replace(/worse/, 'wose')
		.replace(/[rl]/gm, "w")
		.replace(/[RL]/gm, "W")
		.replace(/ove/g, 'uv')
		.replace(/na/g, 'nya')
		.replace(/that/g, 'thawt')
		.replace(/this/g, 'thiws')

		.replace(/\b(ha|hah|heh|hehe)+\b/g, 'hehe xD')
		.trim() + ' ' + faces[Math.floor(Math.random() * faces.length)];
}
