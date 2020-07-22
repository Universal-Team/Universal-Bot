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
	var random_number = Math.round(Math.random());
	var owo_text = '';
	if (random_number == 1){
		owo_text += 'OwO';
		} else {
			owo_text += 'UwU'
		}
	return owo_text + ' ' + text
		.replace('need', 'nweed')
		.replace('oh no', 'ono')
		.replace('speak', 'spweak')
		.replace('stand', 'stwand')
		.replace('time', 'tim')
		.replace('worse', 'wose')
		.replace(/[rl]/gm, "w")
		.replace(/[RL]/gm, "W")
		.replace(/ove/g, 'uv')
		.replace(/\b(ha|hah|heh|hehe)+\b/g, 'hehe xD')
		.trim() + ' ' + owo_text;
}
