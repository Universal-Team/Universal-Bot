module.exports = {
	name: ['leet', 'l33t', '1337', 'h4x0r'],
	usage: '[-__l__ast] [message]',
	desc: 'l33t pr0gr4m1ng sp33ch',
	DM: true,
	permissions: [],
	exec(UnivBot, msg) {
		if(msg.args.last || msg.args.l)
			msg.args.value = msg.channel.messages.cache.array()[msg.channel.messages.cache.size - 2].content;

		if(!msg.args.value)
			return msg.send('git gut scrub');

		msg.send(l33t(msg.args.value));
	}
}

function l33t(text){
	return text
		.replace(/hacker/gi, 'h4x0r')
		.replace(/hack|hacks/gi, 'h4x')
		.replace(/Sorry|sorry/gi, 'sry')
		.replace(/and/gi, 'nd')
		.replace(/Dude|dude/gi, 'd00d')
		.replace(/Wait|wait/gi, 'w8')
		.replace(/Easy|easy/gi, 'ez pz')
		.replace(/[Aa]/g, '4')
		.replace(/[Ee]/g, '3')
		.replace(/[Oo]/g, '0')
		.replace(/[LlIi]/g, '1')
		.replace(/[Tt]/g, '7')
		.replace(/7h3/gi, 't3h')
		.replace(/[FU]/g, 'V')
		.replace(/[fu]/g, 'v')
}
