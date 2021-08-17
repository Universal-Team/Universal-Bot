const {CommandInteraction} = require("discord.js");

module.exports = {
	name: ["gimmeWord", "randomWord"],
	usage: "[--__c__ount]",
	desc: "Gives a random word",
	DM: true,
	permissions: [],
	exec(UnivBot, msg) {

		let count = parseInt(msg.args.count || msg.args.c);
		if(isNaN(count) || count < 1)
			count = 1;
		if(count > 100)
			return msg.reply("No thanks, that's too much work");

		let out = [];

		const names = require("../../data/unicode-names.json");
		for(let i = 0; i < count; i++) {
			let str = names[Object.keys(names)[Math.floor(Math.random() * Object.keys(names).length)]].split(/\b/).filter(r => r.match(/\b/));
			out.push(str[Math.floor(Math.random() * str.length)].toLowerCase());
		}

		msg.reply(out.join(" ").substr(0, 2000));
	}
}
