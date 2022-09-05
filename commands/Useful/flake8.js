const terminal = require("child_process").execSync;
const {Formatters} = require("discord.js");

module.exports = {
	name: "Flake8",
	args: {
		ignore: {
			letter: "i",
			value: true
		},
		value: {
			title: "code",
			required: true
		}
	},
	desc: "Runs flake8 on Python code",
	DM: true,
	permissions: [],
	async exec(UnivBot, msg) {
		if(!msg.args.value)
			return msg.reply("**Oops!** You didn't provided enough arguments");

		let ignore = msg.args.ignore?.replace(/[^\d\w]/g, "") ?? "";

		let output;
		try {
			output = terminal(`echo "${msg.args.value.replace(/"/g, "\\\"").replace(/`/g, "\\`")}" | flake8 --ignore='${ignore}' - || true`, {shell: "/bin/bash"}).toString();
		} catch(e) {
			return msg.reply(Formatters.codeBlock("js", e.toString()));
		}

		if(output.length == 0)
			output = "No issues found";

		if(output.length >= 1024) {
			msg.reply({
				content: "The output is too long, sending as attachment:",
				files: [{
					attachment: Buffer.from(output),
					name: "output.txt"
				}]
			});
		} else {
			msg.reply(Formatters.codeBlock("py", output));
		}
	}
}
