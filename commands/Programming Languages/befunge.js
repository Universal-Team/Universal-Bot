const Befunge = require("befunge");
const {Formatters} = require("discord.js");
const {Readable, Writable} = require("stream");

// https://medium.com/@dupski/nodejs-creating-a-readable-stream-from-a-string-e0568597387f
class ReadableString extends Readable {
	constructor(str) {
		super();
		this.sent = false;
	}

	_read() {
		if(!this.sent && this.str != null) {
			this.push(Buffer.from(this.str));
			this.sent = true
		} else {
			this.push(null)
		}
	}
}

class WritableString extends Writable {
	constructor() {
		super();
		this.str = "";
	}

	_write(chunk, encoding, done) {
		this.str += chunk.toString();
		done();
	}
}

module.exports = {
	name: "Befunge",
	args: {
		input: {
			letter: "i",
			value: true
		},
		value: {
			title: "code",
			required: true
		}
	},
	desc: "Runs a Befunge program",
	DM: true,
	permissions: [],
	async exec(UnivBot, msg) {
		if(!msg.args.value)
			return msg.reply(Formatters.codeBlock("js", 'v>:#, _@\n ^"Oh no! "_v\n v:"no" *48 _v\n v0:"input"  <\n>>         ^'));

		let output = "", stepCount = 0, timeout = false;

		let inStream = new ReadableString(msg.args.input);
		let outStream = new WritableString();

		const befunge = new Befunge(inStream, outStream, {rsNoDestroy: true, wsNoDestroy: true, step: next => (stepCount++ < 1000) ? next() : timeout = true});

		befunge.load(msg.args.value);
		befunge.run();
		output = outStream.str;

		if(output == "")
			output = timeout ? "Program timed out." : "Program finished successfully.";

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
