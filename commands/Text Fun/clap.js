const {CommandInteraction} = require("discord.js");

module.exports = {
	name: "clap",
	args: {
		last: {
			letter: "l"
		},
		value: {
			title: "message"
		}
	},
	desc: "Replaces the spaces with :clap:",
	DM: true,
	permissions: [],
	exec(UnivBot, msg) {
		if(msg.args.last || msg.args.l)
			msg.args.value = msg.channel.messages.cache.map(r => r)[msg.channel.messages.cache.size - (msg instanceof CommandInteraction ? 1 : 2)].content;

			if(!msg.args.value.includes(" "))
				return msg.reply("One clap for you :clap:");

		msg.reply(msg.args.value.replace(/ /g, ":clap:"));
	}
}
