const {CommandInteraction} = require("discord.js");

module.exports = {
	name: ["mooh", "muuh", "moo"],
	args: {
		last: {
			letter: "l"
		},
		value: {
			title: "message"
		}
	},
	desc: "Mooh-ify a message",
	DM: true,
	permissions: [],
	exec(UnivBot, msg) {
		if(msg.args.last)
			msg.args.value = msg.channel.messages.cache.map(r => r)[msg.channel.messages.cache.size - (msg instanceof CommandInteraction ? 1 : 2)].content;

		if(!msg.args.value)
			return msg.reply("Moooooooooooooh");

		msg.reply(msg.args.value.replace(/\b\w*?[aiueoy]/gi, msg.cmd));
	}
}
