module.exports = {
	name: ["emojiInfo", "絵文字Info"],
	usage: "<name>",
	desc: "Sends info about an emoji in a guild Universal-Bot is in",
	DM: true,
	permissions: [],
	exec(UnivBot, msg) {
		if(!msg.args.value)
			return msg.reply("Nothing isn't an emoji...");

		if(msg.args.value.match(/<:.*:.*>/))
			msg.args.value = msg.args.value.substr(msg.args.value.indexOf(":") + 1, msg.args.value.lastIndexOf(":") - msg.args.value.indexOf(":") - 1);

		let emoji = undefined;
		let name = msg.args.value.split(":")[0].toLowerCase(), guildName = msg.args.value.split(":")[1]?.toLowerCase();
		if(guildName) {
			let guild = UnivBot.client.guilds.cache.find(r => r.name.toLowerCase().includes(guildName));
			if(guild) {
				guild.emojis.cache.some(e => {
					if(e.name.toLowerCase() == name) {
						emoji = e;
						return true;
					} else if(e.name.toLowerCase().includes(name)) {
						if(!emoji)
							emoji = e;
					}
				});
			}
		} else {
			UnivBot.client.guilds.cache.some(guild => {
				return guild.emojis.cache.some(e => {
					if(e.name.toLowerCase() == name) {
						emoji = e;
						return true;
					} else if(e.name.toLowerCase().includes(name)) {
						if(!emoji)
							emoji = e;
					}
				});
			});
		}

		if(emoji) {
			msg.reply({embeds: [{
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
			msg.reply("Aww, no emoji found...");
		}
	}
}
