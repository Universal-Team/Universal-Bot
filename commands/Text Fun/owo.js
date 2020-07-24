const eyes = ['O', 'o', 'U', 'u', '>', '^', '-', 'X', 'T', 'q'];
const mouths = ['w', 'u', 'o', '\\_', '-', 'x', '///'];
const extras = [['', ''], ['', ''], ['', ''], ['', '-☆'], ['=', '='], ['d', 'b♪']];

function face() {
	let eye = eyes[Math.floor(Math.random() * eyes.length)];
	let mouth;
	do {
		mouth = mouths[Math.floor(Math.random() * mouths.length)];
	} while(mouth.toLowerCase() == eye.toLowerCase());
	let extra = extras[Math.floor(Math.random() * extras.length)];
	
	return extra[0] + eye + mouth + eye + extra[1];
}

module.exports = {
	name: ['owo', 'owoify', 'uwu', 'uwuify'],
	usage: '[--last|-l] [message]',
	desc: 'OwO-ify a message',
	DM: true,
	permissions: [],
	exec(UnivBot, msg) {
		if(msg.args == '-l' || msg.args == '--last')
			msg.args = msg.channel.messages.cache.array()[msg.channel.messages.cache.size - 2].content;

		if(!msg.args.length)
			return msg.send('ur no fun ' + face());

		msg.send(OwOify(msg.args));
	}
}

function OwOify(text) {
	return text
		.replace(/\bi['’]m\b/gi, 'im')
		.replace(/\bi['’]ve/gi, 'ive')
		.replace(/\bi\b/gi, 'me')
		.replace(/\bmy\b/gi, 'me')
		.replace(/need/gi, 'nweed')
		.replace(/oh no/gi, 'ono')
		.replace(/s's/gi, 's')
		.replace(/speak/gi, 'spweak')
		.replace(/stand/gi, 'stwand')
		.replace(/(thanks|thank you)/gi, 'thankies')
		.replace(/time/gi, 'tim')
		.replace(/that/gi, 'dat')
		.replace(/(than|then)/gi, 'den')
		.replace(/\bthe\b/gi, 'da')
		.replace(/this/gi, 'dis')
		.replace(/worse/gi, 'wose')
		.replace(/your/gi, 'ur')
		.replace(/you/gi, 'u')
		.replace(/[rl]/g, 'w')
		.replace(/[RL]/g, 'W')
		.replace(/na/gi, 'nya')
		.replace(/ove/gi, 'uv')
		.replace(/['’]/g, '')
		.replace(/(\b[OUXTq][wuox][OUXTq]\b|[OUXTq>^\-][_\-/][OUXTq<^\-]|[>^\-][wuox][<^\-]|[;:x][)(pd]|[;:x]-[)(pd])/gi, () => face())
		.replace(/\?/g, '?'.repeat(Math.ceil(Math.random() * 3)))
		.replace(/\b(ha|hah|heh|hehe)+\b/g, 'hehe xD')
		.trim() + ' ' + face();
}
