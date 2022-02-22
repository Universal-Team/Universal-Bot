var terminal = require("child_process").execSync;
const {Formatters} = require("discord.js");

module.exports = {
	name: "sh",
	args: {
		hide: {
			letter: "h",
		},
		del: {
			letter: "d"
		},
		value: {
			title: "code",
			required: true
		}
	},
	desc: "Executes sh code. Use -hide for hide the output and -del for delete the invocation message",
	DM: true,
	permissions: [ "DEV" ],
	async exec(UnivBot, msg) {
		if(!msg.args.value)
			return msg.reply("**Oops!** You didn't provided enough arguments");

		let output;
		try {
			output = terminal(msg.args.value, {shell: "/bin/sh"}).toString();
		} catch(e) {
			if(!msg.args.hide)
				return msg.reply(Formatters.codeBlock("js", e.toString()));
			return;
		}

		if(msg.args.del && msg.guild) {
			msg.delete();
		}
		if(msg.args.hide) {
			return;
		}

		if(output.length == 0)
			output = "Successfully executed script without errors. Exit with code 0";

			if(output.length >= 1024) {
				msg.reply({
					content: "The output is too long, sending as attachment:",
					files: [{
						attachment: Buffer.from(output),
						name: "output.txt"
					}]
				});
			} else {
				msg.reply(Formatters.codeBlock("sh", output));
			}
	}
}
