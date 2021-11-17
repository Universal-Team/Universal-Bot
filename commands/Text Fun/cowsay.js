const terminal = require("child_process").execSync;
const {CommandInteraction, Formatters} = require("discord.js");

module.exports = {
	name: ["cowsay", "cowthink"],
	args: {
		last: {
			letter: "l"
		},
		value: {
			title: "args"
		}
	},
	desc: "Runs cowsay",
	DM: true,
	permissions: [],
	exec(UnivBot, msg) {
		if(msg.args.last)
			msg.args.value = msg.channel.messages.cache.map(r => r)[msg.channel.messages.cache.size - (msg instanceof CommandInteraction ? 1 : 2)].content;

		if(!msg.args.value)
			return msg.reply(Formatters.codeBlock(terminal(`${msg.cmd.toLowerCase()} You\\'ve gotta give me something to say...`, {shell: "/bin/bash"}).toString()));

		msg.reply(Formatters.codeBlock(terminal(`${msg.cmd.toLowerCase()} ${msg.args.value.replace(/[!"#$&'()*,;<>?[\\\]^`{|}]/g, "\\$&").replace(/\s/g, " ")}`, {shell: "/bin/bash"}).toString()));
	}
}
