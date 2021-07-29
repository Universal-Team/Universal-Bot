const ts2js = require("../../utils/ts2js");

module.exports = {
	name: ["TypeScript", "TS"],
	usage: "[-__h__ide] [-__s__tring] [-__d__el] <code>",
	desc: "Executes TS code. Use -hide for hide the output, -string for not inspect the output and -del for delete the invocation message",
	DM: true,
	permissions: [ "DEV" ],
	async exec(UnivBot, msg) {
		let stringify = require("util").inspect;

		if(!msg.args.value)
			return msg.reply("**Oops!** You didn't provided enough arguments");

		if(msg.args.string || msg.args.s)
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

			if(!(msg.args.hide || msg.args.h))
				return msg.reply("```ts\n" + err + "```");
			return;
		}

		try {
			output = await eval(output.compiled);
			if(typeof output !== "function")
				output = stringify(output);
			if(typeof output !== "string")
				output = output.toString();
		} catch(e) {
			if(!(msg.args.hide || msg.args.h))
				return msg.reply("```js\n" + e.toString() + "```");
			return;
		}

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
			msg.reply("```js\n" + output + "```");
		}
	}
}
