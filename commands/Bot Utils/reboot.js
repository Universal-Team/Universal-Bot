var terminal = require('child_process').execSync;
const fs = require('fs');

module.exports = {
	name: ['reboot','restart','refresh'],
	usage: '',
	desc: 'Reboots the bot',
	DM: true,
	permissions: [ 'DEV' ],
	exec(UnivBot, msg) {
		var prom = msg.send('Rebooting...')
		prom.then(message => {
			if(msg.guild)
				UnivBot.db.reboot = { msg: message.id, channel: message.channel.id, guild: message.guild.id, start: new Date().getTime() };
			if(!msg.guild)
				UnivBot.db.reboot = { msg: message.id, author: msg.author.id, start: new Date().getTime() };
			fs.writeFileSync('database.json', JSON.stringify(UnivBot.db, null, '\t'));
			terminal('pm2 restart univ-bot');
		});
	}
}
