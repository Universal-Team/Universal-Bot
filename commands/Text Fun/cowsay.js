const terminal = require("child_process").execSync;
const {CommandInteraction, Formatters} = require("discord.js");

module.exports = {
	name: "cowsay",
	usage: "<args>",
	desc: "Runs cowsay",
	DM: true,
	permissions: [],
	ignoreArgs: true,
	exec(UnivBot, msg) {
		console.log(msg.args);

		if(msg.args.last || msg.args.l)
			msg.args.value = msg.channel.messages.cache.map(r => r)[msg.channel.messages.cache.size - (msg instanceof CommandInteraction ? 1 : 2)].content;

		if(!msg.args.value)
			return msg.reply(Formatters.codeBlock(terminal("cowsay You\\'ve gotta give me something to say...", {shell: "/bin/bash"}).toString()));

		msg.reply(Formatters.codeBlock(terminal(`cowsay ${msg.args.value.replace(/[!"#$&'()*,;<>?[\\\]^`{|}]/g, "\\$&")}`, {shell: "/bin/bash"}).toString()));
	}
}
