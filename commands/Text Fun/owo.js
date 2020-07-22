module.exports = {
	name: ['owo', 'owoify'],
	usage: '<Text>',
	desc: 'Makes a message look like OWO',
	DM: true,
	permissions: [],
	exec(UnivBot, msg) {
		if (!msg.args.length)
			return msg.send('No owo fow you');

		msg.send('**' + msg.author.tag + '**: ' + OwOify(msg.args));
	}
}

function OwOify(text) {
	return 'OwO ' + text
		.replace('need', 'nweed')
		.replace('speak', 'spweak')
		.replace('stand', 'stwand')
		.replace('time', 'tim')
		.replace('worse', 'wose')
		.replace(/[rl]/gm, "w")
		.replace(/[RL]/gm, "W")
		.replace(/ove/g, 'uv')
		.replace(/\b(ha|hah|heh|hehe)+\b/g, 'hehe xD')
		.trim() + ' OwO';
}
