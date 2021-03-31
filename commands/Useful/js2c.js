function MessageAttachment(buffer, filename) {
		this.files = [{}];
		this.files[0].attachment = buffer;
		this.files[0].name = filename;
}

const ts2c = require("ts2c");
module.exports = {
	name: ['js2c', 'ts2c'],
	usage: '<code>',
	desc: 'Uses andrei\'s ts2c module for transpile TS/JS to C',
	DM: true,
	permissions: [],
	exec(UnivBot, msg) {
		let attachment;
		if(!msg.args.value)
			return msg.send('**Oops!** Can\'t transpile the void :P');
		let cCode = '**Your code has an error**\n```js\nError: Code contains stuff not supported by ts2c yet```';
		try {
			var newCode = ts2c.transpile(msg.args.value);
			attachment = new MessageAttachment(Buffer.from(newCode), 'TranspiledCode.c');
			cCode = '```c\n'+newCode+'```';
			if(cCode.length <= 1024)
				cCode = '**Here is your code transpiled to C**\n'+cCode
		} catch(e) {
			cCode = '**Oops!** Apparently your code has an error or you\'re using code unsupported by ts2c.js';
		}
		if(output.length >= 1024) {
			msg.send("The output is too long, sending as attachment:", MessageAttachment(output, "output.txt"));
		} else {
			msg.send(output, {code: "js"});
		}
	}
}
