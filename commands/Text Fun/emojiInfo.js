module.exports = {
	name: ['emojiInfo', '絵文字Info'],
	usage: '<emoji name>',
	desc: 'Sends info about an emoji in a guild Universal-Bot is in',
	DM: true,
	permissions: [],
	exec(UnivBot, msg) {
		if(!msg.args)
			return msg.send("Nothing isn't an emoji...");

		if(msg.args.match(/<:.*:.*>/))
			msg.args = msg.args.substr(msg.args.indexOf(':') + 1, msg.args.lastIndexOf(':') - msg.args.indexOf(':') - 1);

		let emoji;
		UnivBot.client.guilds.cache.some(guild => {
			return guild.emojis.cache.some(e => {
				if(e.name.toLowerCase() == msg.args.toLowerCase()) {
					emoji = e;
					return true;
				} else if(e.name.toLowerCase().includes(msg.args.toLowerCase())) {
					if(!emoji)
						emoji = e;
				}
			});
		});

		if(emoji) {
			msg.send('', {embed: {
				title: '\\:' + emoji.name + '\\: info',
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
	}
}
