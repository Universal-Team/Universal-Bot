const Brainfuck = require("brainfuck-node");
const {Formatters} = require("discord.js");

module.exports = {
	name: ["BrainFuck", "bf"],
	args: {
		input: {
			letter: "i",
			value: true
		},
		debug: {
			letter: "d"
		},
		value: {
			title: "code",
			required: true
		}
	},
	desc: "Runs a brain fuck program",
	DM: true,
	permissions: [],
	async exec(UnivBot, msg) {
		if(!msg.args.value)
			return msg.reply(Formatters.codeBlock("bf", "++++++++++[>+++++++++++<-]>.+."));

		const brainfuck = new Brainfuck();

		let res;
		try {
			res = brainfuck.execute(msg.args.value, msg.args.input);
		} catch(e) {
			return msg.reply(`Error! ${e}`);
		}

		if(res.output == "")
			res.output = "Program finished successfully.";

		let files = [];

		if(msg.args.debug) {
			files.push({
				attachment: Buffer.from(JSON.stringify(res.memory)),
				name: "memory.json"
			});
		}

		if(res.output.length >= 1024) {
			files.push({
				attachment: Buffer.from(res.output),
				name: "output.txt"
			});

			msg.reply({
				content: "The output is too long, sending as attachment:",
				files: files
			});
		} else {
			msg.reply({
				content: Formatters.codeBlock("js", res.output),
				files: files
			});
		}
	}
}
