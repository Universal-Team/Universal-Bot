const {CommandInteraction} = require("discord.js");

module.exports = {
	name: "angry",
	args: {
		last: {
			letter: "l"
		},
		value: {
			title: "message"
		}
	},
	desc: "Makes the message look angry",
	DM: true,
	permissions: [],
	exec(UnivBot, msg) {
		if(msg.args.last)
			msg.args.value = msg.channel.messages.cache.map(r => r)[msg.channel.messages.cache.size - (msg instanceof CommandInteraction ? 1 : 2)].content;

		if(!msg.args.value)
			return msg.reply("The void is not angry");

		msg.reply(`***${msg.args.value.toUpperCase().split("").join(" ")}***`);
	}
}
