const {CommandInteraction, Formatters} = require("discord.js");

module.exports = {
	name: ["rainbow", "rainbowify"],
	args: {
		last: {
			letter: "l"
		},
		value: {
			title: "message"
		}
	},
	desc: "Makes the message a rainbow",
	DM: true,
	permissions: [],
	exec(UnivBot, msg) {
		if(msg.args.last)
			msg.args.value = msg.channel.messages.cache.map(r => r)[msg.channel.messages.cache.size - (msg instanceof CommandInteraction ? 1 : 2)].content;

		if(!msg.args.value)
			return msg.reply("I can't rainbowify the void");

		let i = 0;
		msg.reply(Formatters.codeBlock("ansi", msg.args.value.replace(/[^\s]/g, match => `\x1B[0;${31 + (i++ % 6)}m${match}`)));
	}
}
