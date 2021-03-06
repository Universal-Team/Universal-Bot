const searchFlags = require("../../utils/searchFlags");
const MessageAttachment = require("../../utils/MessageAttachment");
const compile = require("../../utils/compile");

module.exports = {
	name: ["ASM", "Assembly", "ARM"],
	usage: "[-__h__ide|-__d__el] <code>",
	desc: "Executes ARM* assembly code. Use -hide for hide the output and -del for delete the invocation message.\n* (only ARM if running on an ARM server)",
	DM: true,
	permissions: [ "DEV" ],
	async exec(UnivBot, msg) {	
		if(!msg.args.value)
			return msg.send("**Oops!** You didn't provided enough arguments");
	
		if((msg.args.del || msg.args.d) && msg.guild)
			msg.delete();

		let output;
		let object = compile(msg.args.value, "asm");
	
		if(msg.args.hide || msg.args.h)
			return;
	
		if(typeof object !== "object")
			return msg.send(object, {code: "js"});

		output = object.stdout;
		if(output.length == 0)
			output = "Successfully executed script without errors. Exit with code 0";
	
		if(output.length >= 1024) {
			msg.send("The output is too long, sending as attachment:", MessageAttachment(output, "output.txt"));
		} else {
			msg.send(output, {code: "c"});
		}
	}
}
