module.exports = {
	name: ['emoji', '絵文字'],
	usage: '<emoji names>',
	desc: 'Sends any Discord emoji from a guild Universal-Bot is in',
	DM: true,
	permissions: [],
	exec(UnivBot, msg) {
		if(!msg.args)
			return msg.send("Nothing isn't an emoji...");

		let emoji = [];
		msg.args.split(" ").forEach(r => {
			let temp;
			UnivBot.client.guilds.cache.some(guild => {
				return guild.emojis.cache.some(e => {
					if(e.name.toLowerCase() == r.toLowerCase()) {
						temp = e;
						return true;
					} else if(e.name.toLowerCase().includes(r.toLowerCase())) {
						if(!temp)
							temp = e;
					}
				});
			});
			if(temp)
				emoji.push(temp);
		});

		let str = '';
		emoji.forEach(r => {
			let out = '<' + (r.animated ? 'a' : '') + ':' + r.name + ':' + r.id + '> ';
			if(str.length + out.length <= 2000)
				str += out;
		});
		if(!str)
			str = 'Aww, no emoji found...';
		return msg.send(str);
	}
}
