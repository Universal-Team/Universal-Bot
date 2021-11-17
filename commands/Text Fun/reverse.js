const {CommandInteraction} = require("discord.js");

module.exports = {
	name: [ "reverse", "backwards" ],
	args: {
		last: {
			letter: "l"
		},
		value: {
			title: "message"
		}
	},
	desc: "Reverses the message",
	DM: true,
	permissions: [],
	exec(UnivBot, msg) {
		if(msg.args.last || msg.args.l)
			msg.args.value = msg.channel.messages.cache.map(r => r)[msg.channel.messages.cache.size - (msg instanceof CommandInteraction ? 1 : 2)].content;

		if(!msg.args.value)
			return msg.reply("I can't reverse the void");

		msg.reply(msg.args.value.split("").reverse().join(""));
	}
}
