module.exports = {
	name: ["unicodeName", "charName", "uniName"],
	usage: "<character>",
	desc: "Gets the unicode name of a character or code point",
	DM: true,
	permissions: [],
	exec(UnivBot, msg) {
		let names = {};
		let match = msg.args.value.match(/(U\+|0x)[0-9A-F]+/gi);
		if(match) {
			match.forEach(r => {
				names[String.fromCodePoint(parseInt(r.replace(/U\+/gi, "0x"), 16))] = require("../../data/unicode-names.json")[r.substr(2).toUpperCase().padStart(4, "0")];
			});
		}
		Array.from(msg.args.value.replace(/(U\+|0x)[0-9A-F]+/gi, "")).forEach(r => {
			names[r] = require("../../data/unicode-names.json")[r.codePointAt(0).toString(16).toUpperCase().padStart(4, "0")];
		});
		
		if(Object.keys(names).length) {
			let str = "";
			for(let key in names) {
				str += `\`${key}\`: ${names[key]}\n`;
			}
			msg.send(str);
		} else {
			msg.send("Invalid input!");
		}
	}
}
