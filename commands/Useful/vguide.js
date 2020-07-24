module.exports = {
	name: ['vguide', 'video guide'],
	usage: '<system>',
	desc: 'Sends the recommended video guide for the specified system',
	DM: true,
	permissions: [],
	exec(UnivBot, msg) {
		if(!msg.args)
			return msg.send(`Hmm, a video guide on how to do nothing... They might actually not mess that one up, I\'d still look for a text guide though.
I do know some good ones for:
- **TWiLight Menu++**
- **DSi**
- **Wii**
- **Wii U**
- **Switch**
- **Virtual Boy**`);

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
				break;
			case 'wiiu':
			case 'wii u':
				guide = 'https://youtu.be/VCqHzQwDWCM';
				break;
			case 'switch':
				guide = 'https://youtu.be/2Jugv3dSmDM';
				break;
			case 'virtual boy':
			case 'virtualboy':
			case 'vb':
				guide = 'https://www.youtube.com/watch?v​=avE3-KomeWI&v=dQw4w9WgXcQ&feature=youtu.be';
				break;
		}

		if(guide)
			msg.send('', {'embed': {
				'title': 'Video Guide',
				'description': '[Hey look, I actually found a good one!](' + guide + ')'
			}});
		else
			msg.send('', {'embed': {
				'title': 'Video Guide',
				'description': 'Darn, there don\'t seem to be any good ones, just look for a good text guide ;P'
			}});
	}
}
