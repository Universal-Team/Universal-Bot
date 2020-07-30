module.exports = {
	name: ['unicodeToText', 'utt', 'text'],
	usage: '<character codes>',
	desc: 'Converts unicode character codes to their characters',
	DM: true,
	permissions: [],
	exec(UnivBot, msg) {
		if(msg.args.length) {
			let message = '';
			for(let char of msg.args.split(' ')) {
				message += String.fromCodePoint(parseInt(char.replace(/U\+/gi, "0x")));
			}
			return msg.send(message);
		}
		return msg.send('I can\'t convert nothing...');
	}
}
