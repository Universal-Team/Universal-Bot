const L = require("list");

module.exports = {
	name: ["unicodeName", "charName", "uniName"],
	args: {
		value: {
			title: "character",
			required: true
		}
	},
	desc: "Gets the unicode name of a character or code point",
	DM: true,
	permissions: [],
	exec(UnivBot, msg) {
		let names = {};
		let match = msg.args.value.match(/(U\+|0x)[0-9A-F]+/gi);
		if(match) {
			match.forEach(r => {
				let codepoint = r.substr(2).toUpperCase().padStart(4, "0");
				names[String.fromCodePoint(parseInt(r.replace(/U\+/gi, "0x"), 16))] = L.find(r => r[0] == codepoint, UnivBot.data.unicodeNames)?.[1];
			});
		}
		Array.from(msg.args.value.replace(/(U\+|0x)[0-9A-F]+/gi, "")).forEach(r => {
			let codepoint = r.codePointAt(0).toString(16).toUpperCase().padStart(4, "0");
			names[r] = L.find(r => r[0] == codepoint, UnivBot.data.unicodeNames)?.[1];
		});
		
		if(Object.keys(names).length) {
			let str = "";
			for(let key in names) {
				str += `\`${key}\`: ${names[key]}\n`;
			}
			msg.reply(str);
		} else {
			msg.reply("Invalid input!");
		}
	}
}
