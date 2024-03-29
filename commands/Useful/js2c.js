const ts2c = require("ts2c");
const {Formatters} = require("discord.js");

module.exports = {
	name: ["js2c", "ts2c"],
	args: {
		value: {
			title: "code",
			required: true
		}
	},
	desc: "Uses andrei's ts2c module for transpile TS/JS to C",
	DM: true,
	permissions: [],
	exec(UnivBot, msg) {
		if(!msg.args.value)
			return msg.reply("**Oops!** Can't transpile the void :P");
		let output = "**Your code has an error**\n" + Formatters.codeBlock("js", "Error: Code contains stuff not supported by ts2c yet");
		try {
			output = ts2c.transpile(msg.args.value);
		} catch(e) {
			cCode = "**Oops!** Apparently your code has an error or you're using code unsupported by ts2c.js";
		}
		if(output.length >= 1024) {
			msg.reply({
				content: "The output is too long, sending as attachment:",
				files: [{
					attachment: Buffer.from(output),
					name: "output.c"
				}]
			});
		} else {
			msg.reply(Formatters.codeBlock("c", output));
		}
	}
}
