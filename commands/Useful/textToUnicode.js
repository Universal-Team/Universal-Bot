module.exports = {
	name: ['textToUnicode', 'ttu', 'unicode'],
	usage: '<text>',
	desc: 'Converts text to their unicode character codes',
	DM: true,
	permissions: [],
	exec(UnivBot, msg) {
		if(msg.args.value) {
			let message = '';
			Array.from(msg.args.value).forEach(r => {
				message += 'U+' + r.codePointAt(0).toString(16).padStart(4, '0') + ' ';
			});
			return msg.send(message);
		}
		return msg.send('I can\'t convert nothing...');
	}
}
