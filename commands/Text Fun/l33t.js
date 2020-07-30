module.exports = {
	name: ['leet', 'l33t', '1337', 'h4x0r'],
	usage: '[--last|-l] [message]',
	desc: 'l33t pr0gr4m1ng sp33ch',
	DM: true,
	permissions: [],
	exec(UnivBot, msg) {
		if(msg.args == '-l' || msg.args == '--last')
			msg.args = msg.channel.messages.cache.array()[msg.channel.messages.cache.size - 2].content;

		if(!msg.args.length)
			return msg.send('git gut scrub');

		msg.send(l33t(msg.args));
	}
}

function l33t(text){
  return text
    .replace(/hacker/gi, 'h4x0r')
    .replace(/sorry/gi, 'sry')
    .replace(/the/gi, 't3h')
    .replace(/and/gi, 'nd')
    .replace(/[Aa]/g, '4')
    .replace(/[Ee]/g, '3')
    .replace(/[Oo]/g, '0')
    .replace(/[Ii]/g, '1')
    .replace(/[FU]/g, 'V')
    .replace(/[fu]/g, 'v')
}
