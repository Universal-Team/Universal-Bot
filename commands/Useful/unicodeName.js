module.exports = {
	name: ["unicodeName", "charName", "uniName"],
	usage: "<character>",
	desc: "Gets the unicode name of a character or code point",
	DM: true,
	permissions: [],
	exec(UnivBot, msg) {
		let name;
		let match = msg.args.match(/(U\+|0x)([0-9A-F]+)/i)
		if(match) {
			console.log("match", match[2].toUpperCase().padStart(4, "0"));
			name = require("../../data/unicode-names.json")[match[2].toUpperCase().padStart(4, "0")]
			console.log(name)
		} else if(msg.args) {
			console.log("char", msg.args.charCodeAt(0).toString(16).toUpperCase().padStart(4, "0"))
			name = require("../../data/unicode-names.json")[msg.args.charCodeAt(0).toString(16).toUpperCase().padStart(4, "0")];
		}
		
		if(name) {
			msg.send(name);
		} else {
			msg.send("Invalid input!");
		}
	}
}
