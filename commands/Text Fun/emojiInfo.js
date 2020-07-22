module.exports = {
	name: ['emojiInfo', '絵文字Info'],
	usage: '[-a] <id>',
	desc: 'Sends info about an emoji in a guild Universal-Bot is in',
	DM: true,
	permissions: [],
	exec(UnivBot, msg) {
		let emoji;

		if(msg.args.match(/<:.*:.*>/))
			msg.args = msg.args.substr(msg.args.indexOf(':') + 1, msg.args.lastIndexOf(':') - msg.args.indexOf(':') - 1);

		let temp;
		UnivBot.client.guilds.cache.some(guild => {
			return guild.emojis.cache.some(e => {
				if(e.name.toLowerCase() == msg.args.toLowerCase()) {
					temp = e;
					return true;
				} else if(e.name.toLowerCase().includes(msg.args.toLowerCase())) {
					if(!temp)
						temp = e;
				}
			});
		});
		emoji = temp;

		if(emoji) {
			msg.send('', {embed: {
				title: ':' + emoji.name + ': info',
				fields: [
					{
						name: "Guild",
						value: emoji.guild.name
					},
					{
						name: "ID",
						value: emoji.id
					}
				],
				thumbnail: {
					url: 'https://cdn.discordapp.com/emojis/' + emoji.id + (emoji.animated ? '.gif' : '.png')
				},
				color: 0xffce3a
			}});
		} else {
			msg.send('Aww, no emoji found...');
		}
		// emoji.forEach(r => {
		// 	let out = '<' + (r.animated ? 'a' : '') + ':' + r.name + ':' + r.id + '> ';
		// 	if((str + out).length < 2000)
		// 		str += '<' + (r.animated ? 'a' : '') + ':' + r.name + ':' + r.id + '> ';
		// });
	}
}
