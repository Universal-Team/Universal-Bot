const {CommandInteraction} = require("discord.js");
const L = require("list");

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
		for(let i = 0; i < count; i++) {
			let str = L.nth(Math.floor(Math.random() * UnivBot.data.unicodeNames.length), UnivBot.data.unicodeNames)[1].split(/\b/).filter(r => r.match(/\b/));
			out.push(str[Math.floor(Math.random() * str.length)].toLowerCase());
		}

		msg.reply(out.join(" ").substr(0, 2000));
	}
}
