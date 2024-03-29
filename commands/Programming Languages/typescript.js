const ts2js = require("../../utils/ts2js");
const {Formatters} = require("discord.js");

module.exports = {
	name: ["TypeScript", "TS"],
	args: {
		hide: {
			letter: "h",
		},
		string: {
			letter: "s",
		},
		del: {
			letter: "d"
		},
		value: {
			title: "code",
			required: true
		}
	},
	desc: "Executes TS code. Use -hide for hide the output, -string for not inspect the output and -del for delete the invocation message",
	DM: true,
	permissions: [ "DEV" ],
	async exec(UnivBot, msg) {
		let stringify = require("util").inspect;

		if(!msg.args.value)
			return msg.reply("**Oops!** You didn't provided enough arguments");

		if(msg.args.string)
			stringify = variable => variable.toString();

		let message = await msg.reply("Running typescript can be slow, please be patient...");
		let output = ts2js(msg.args.value);
		message.delete({timeout: 1, reason: "Done running ts2js"});

		if(output.stderr || output.stdout) {
			let err = output.stderr;
			if(err.length < output.stdout.length)
					err = output.stdout;

			if(!err.length)
				err = "typescript.ts(0,0): error: The given code has errors.";

			if(!msg.args.hide)
				return msg.reply(Formatters.codeBlock("ts", err));
			return;
		}

		try {
			output = await eval(output.compiled);
			if(typeof output !== "function")
				output = stringify(output);
			if(typeof output !== "string")
				output = output.toString();
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
