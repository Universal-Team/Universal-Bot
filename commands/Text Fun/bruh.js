const {CommandInteraction} = require("discord.js");

module.exports = {
	name: "bruh",
	args: {
		last: {
			letter: "l"
		},
		value: {
			title: "message"
		}
	},
	desc: "Replaces all the spaces with a nice bruh",
	DM: true,
	permissions: [],
	exec(UnivBot, msg) {
		if(msg.args.last || msg.args.l)
			msg.args.value = msg.channel.messages.cache.map(r => r)[msg.channel.messages.cache.size - (msg instanceof CommandInteraction ? 1 : 2)].content;

		if(!msg.args.value)
			return msg.reply("no bruh for bruh you");

		msg.reply(bruhify(msg.args.value));
	}
}

function bruhify(text) {
	return `BRUH ${text.replace(/(\s)/g, "$1bruh ")} BRUH`;
}
