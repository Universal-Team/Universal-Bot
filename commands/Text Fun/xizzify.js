const {CommandInteraction} = require("discord.js");

module.exports = {
	name: ["xizzify", "xizzified", "shuffle"],
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
			return msg.reply("Xizzle doesn't speak the void".split(" ").sort(() => Math.random() - 0.5).join(" "));

		msg.reply(msg.args.value.split(" ").sort(() => Math.random() - 0.5).join(" "));
	}
}
