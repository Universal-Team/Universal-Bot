const {VM} = require("vm2");
const {Formatters} = require("discord.js");

module.exports = {
	name: ["JavaScript", "JS"],
	args: {
		hide: {
			letter: "h",
		},
		string: {
			lettter: "s"
		},
		del: {
			letter: "d"
		},
		dev: {
			letter: "v"
		},
		value: {
			title: "code",
			required: true
		}
	},
	desc: "Executes JS code. Use -hide for hide the output, -string for not inspect the output and -del for delete the invocation message",
	DM: true,
	permissions: [],
	async exec(UnivBot, msg) {
		let stringify = require("util").inspect;

		if(!msg.args.value)
			return msg.reply("**Oops!** You didn't provided enough arguments");

		if(msg.args.string || msg.args.s)
			stringify = variable => variable.toString();

		let output;
		try {
			if(msg.args.dev || msg.args.v) {
				if(msg.dev) {
					output = await eval(msg.args.value);
				} else {
					return msg.reply("You need BOT_DEVELOPER permission to run this command!");
				}
			} else {
				const vm = new VM({timeout: 10000});
				output = vm.run(`eval(\`${msg.args.value.replace(/[`\$\\]/g, "\\$&")}\`)`);
			}
		} catch(e) {
			if(!(msg.args.hide || msg.args.h))
				return msg.reply(Formatters.codeBlock("js", e.toString()));
			return;
		}

		if(typeof output !== "function")
			output = stringify(output);
		if(typeof output !== "string")
			output = output.toString();

		if((msg.args.del || msg.args.d) && msg.guild) {
			msg.delete();
		}
		if(msg.args.hide || msg.args.h) {
			return;
		}

		if(output.length >= 1024) {
			msg.reply({
				content: "The output is too long, sending as attachment:",
				files: [{
					attachment: Buffer.from(output),
					name: "output.txt"
				}]
			});
		} else {
			msg.reply(Formatters.codeBlock("js", output));
		}
	}
}
