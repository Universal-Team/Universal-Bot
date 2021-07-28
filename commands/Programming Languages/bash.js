var terminal = require("child_process").execSync;

module.exports = {
	name: "Bash",
	usage: "[-__h__ide|-__d__el] <code>",
	desc: "Executes Bash code. Use -hide for hide the output and -del for delete the invocation message",
	DM: true,
	permissions: [ "DEV" ],
	async exec(UnivBot, msg) {
		if(!msg.args.value)
			return msg.send("**Oops!** You didn't provided enough arguments");

		let output;
		try {
		output = terminal(msg.args.value, {shell: "/bin/bash"});
		} catch(e) {
			if(!msg.args.hide)
				return msg.send("```js\n" + e.toString() + "```");
			return;
		}

		if((msg.args.del || msg.args.d) && msg.guild) {
			msg.delete();
		}
		if(msg.args.hide || msg.args.h) {
			return;
		}

		if(output.length >= 1024) {
			msg.send({
				content: "The output is too long, sending as attachment:",
				files: [{
					attachment: Buffer.from(output),
					name: "output.txt"
				}]
			});
		} else {
			msg.send("```bash\n" + output + "```");
		}
	}
}
