module.exports = {
	name: ["emojiInfo", "絵文字Info"],
	usage: "<emoji name>",
	desc: "Sends info about an emoji in a guild Universal-Bot is in",
	DM: true,
	permissions: [],
	exec(UnivBot, msg) {
		if(!msg.args.value)
			return msg.send("Nothing isn't an emoji...");

		if(msg.args.value.match(/<:.*:.*>/))
			msg.args.value = msg.args.value.substr(msg.args.value.indexOf(":") + 1, msg.args.value.lastIndexOf(":") - msg.args.value.indexOf(":") - 1);

		let emoji;
		UnivBot.client.guilds.cache.some(guild => {
			return guild.emojis.cache.some(e => {
				if(e.name.toLowerCase() == msg.args.value.toLowerCase()) {
					emoji = e;
					return true;
				} else if(e.name.toLowerCase().includes(msg.args.value.toLowerCase())) {
					if(!emoji)
						emoji = e;
				}
			});
		});

		if(emoji) {
			msg.send({embeds: [{
				title: `\\:${emoji.name}\\: info`,
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
					url: `https://cdn.discordapp.com/emojis/${emoji.id + (emoji.animated ? ".gif" : ".png")}`
				},
				color: 0xffce3a
			}]});
		} else {
			msg.send("Aww, no emoji found...");
		}
	}
}
