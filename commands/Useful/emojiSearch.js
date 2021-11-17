module.exports = {
	name: ["emojiSearch", "絵文字Search"],
	args: {
		value: {
			title: "query",
			required: true
		}
	},
	desc: "Finds all emoji containing the entered term that Universal-Bot can access",
	DM: true,
	permissions: [],
	exec(UnivBot, msg) {
		if(!msg.args.value)
			return msg.reply("Nothing isn't an emoji...");

		let emoji = [];
		UnivBot.client.guilds.cache.some(guild => {
			return guild.emojis.cache.some(e => {
				if(e.name.toLowerCase().includes(msg.args.value.toLowerCase())) {
					emoji.push(e);
				}
			});
		});

		let str = "";
		emoji.sort((a, b) => {
			let nameA = a.name.toLowerCase();
			let nameB = b.name.toLowerCase();
			if(nameA < nameB)
				return -1;
			else if(nameA > nameB)
				return 1;
			else
				return 0;
		}).forEach(r => {
			out = `<${r.animated ? "a" : ""}:${r.name}:${r.id}> \\:${r.name}\\:\n`;
			if(str.length + out.length <= 2000)
				str += out
		});
		if(!str)
			return msg.reply("Aww, no emoji found...");

		return msg.reply({embeds: [{
			title: "Results",
			color: 0xffce3a,
			description: str
		}]});
	}
}
