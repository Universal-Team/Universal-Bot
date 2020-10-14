const valid = [0, 2, 4, 7, 8, 9, 10, 11, 12];

module.exports = {
	name: [ 'fancyFont', 'fancyText'],
	usage: '[-__l__ast] [--__i__ndex ' + valid.join(", ") + '] [message]',
	desc: 'Uses mathematical letters to make text look like a different font',
	DM: true,
	permissions: [],
	exec(UnivBot, msg) {
		if(msg.args.last || msg.args.l)
			msg.args.value = msg.channel.messages.cache.array()[msg.channel.messages.cache.size - 2].content;

		if(!msg.args.value)
			return msg.send('How am I supposed to make nothing look fancy?'.fancyFont(valid[Math.floor(Math.random() * valid.length)]));
			
		let index = parseInt(msg.args.i ?? msg.args.index ?? valid[Math.floor(Math.random() * valid.length)]);

		if(!valid.includes(index))
			return msg.send(('Index must be ' + valid.join(", ") + '!').fancyFont(valid[Math.floor(Math.random() * valid.length)]));

		msg.send(msg.args.value.fancyFont(index));
	}
}
