const {CommandInteraction} = require("discord.js");

module.exports = {
	name: ["gimmeWord", "randomWord"],
	args: {
		count: {
			letter: "c",
			value: true,
			hint: "1-100"
		}
	},
	desc: "Gives a random word",
	DM: true,
	permissions: [],
	async exec(UnivBot, msg) {
		let count = parseInt(msg.args.count || msg.args.c);
		if(isNaN(count))
			count = 1;
		else if(count < 1)
			return msg.reply("Why ask if you don't even want a word?");
		else if(count > 100)
			return msg.reply("No thanks, that's too much work");

		let out = [];

		let reply = await msg.reply("working on it...");

		const names = require("../../data/unicode-names.json");
		for(let i = 0; i < count; i++) {
			let str = names[Object.keys(names)[Math.floor(Math.random() * Object.keys(names).length)]].split(/\b/).filter(r => r.match(/\b/));
			out.push(str[Math.floor(Math.random() * str.length)].toLowerCase());
			if(i == 50)
				await reply.edit("why's this json so big...");
		}

		reply.edit(out.join(" ").substr(0, 2000));
	}
}
