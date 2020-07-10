module.exports = {
	name: [ 'vguide', 'video guide' ],
	usage: '<guide>',
	desc: 'Sends the recommended video guide for the specified system',
	DM: true,
	permissions: [],
	exec(UnivBot, msg) {
		if(!msg.args)
			return msg.send('Hmm, a video guide on how to do nothing... They might actually not mess that one up, I\'d still look for a text guide though');

		guide = '';
		switch(msg.args.toLowerCase()) {
			case 'twilight':
			case 'twilight menu':
			case 'twilight menu++':
				guide = 'https://youtu.be/wi4YlFLbYgg';
				break;
			case 'dsi':
				guide = 'https://youtu.be/E3SQYUVBpgw';
				break;
			case 'wii':
				guide = 'https://youtu.be/kQSPZMJYCJ8';
		}

		if(guide)
			msg.send('Hey look, I actually found a good one! ' + guide);
		else
			msg.send('Darn, there don\'t seem to be any good ones, just look for a good text guide ;P');
	}
}
