module.exports = {
	name: ["emoji", "絵文字"],
	usage: "[-__r__andom] <names>",
	desc: "Sends any Discord emoji from a guild Universal-Bot is in",
	DM: true,
	permissions: [],
	exec(UnivBot, msg) {
		if(!(msg.args.value || msg.args.random || msg.args.r))
			return msg.reply("Nothing isn't an emoji...");

		let out = "";
		if(msg.args.random || msg.args.r) {
			let guild = UnivBot.client.guilds.cache.map(r => r);
			guild = guild[Math.floor(Math.random() * guild.length)];

			let emoji = guild.emojis.cache.map(r => r);
			emoji = emoji[Math.floor(Math.random() * emoji.length)];

			out = `<${emoji.animated ? "a" : ""}:${emoji.name}:${emoji.id}> `;
		}

		out += msg.args.value.replace(/[^\s]+/g, r => {
			let emoji = undefined;
			let name = r.split(":")[0].toLowerCase(), guildName = r.split(":")[1]?.toLowerCase();
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

			if(emoji)
				return `<${emoji.animated ? "a" : ""}:${emoji.name}:${emoji.id}> `;
			else
				return r;
		});

		if(out.length > 2000) {
			out = out.substr(0, 2000);
			out = out.substr(0, out.lastIndexOf("<") - 1);
		}

		msg.reply(out);
	}
}
