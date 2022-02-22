const compile = require("../../utils/compile");
const {Formatters} = require("discord.js");

module.exports = {
	name: "C",
	args: {
		hide: {
			letter: "h",
		},
		del: {
			letter: "d"
		},
		template: {
			letter: "t"
		},
		value: {
			title: "code",
			required: true
		}
	},
	desc: "Executes C code. Use -hide for hide the output, -del for delete the invocation message and -template for automatically add stdio.h, main and booleans.",
	DM: true,
	permissions: [ "DEV" ],
	async exec(UnivBot, msg) {
		if(!msg.args.value)
			return msg.reply("**Oops!** You didn't provided enough arguments");

		if(msg.args.template)
			msg.args.value = `
#include <stdio.h>
#define bool char
#define true 1
#define false 0

int main(int argc, char *argv[]) {
${msg.args.value}
return 0;
}`;

		if(msg.args.del && msg.guild)
			msg.delete();

		let output;
		let object = compile(msg.args.value, "c");

		if(msg.args.hide)
			return;

		if(typeof object !== "object")
			return msg.reply(Formatters.codeBlock("js", object));

		output = object.stdout;
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
			msg.reply(Formatters.codeBlock("c", output));
		}
	}
}
