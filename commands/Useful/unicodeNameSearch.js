const L = require("list");

module.exports = {
	name: ["unicodeNameSearch", "uniSearch"],
	args: {
		value: {
			title: "description",
			required: true
		}
	},
	desc: "Finds a Unicode character based on its description",
	DM: true,
	permissions: [],
	exec(UnivBot, msg) {
		if(!msg.args.value)
			return msg.reply("`\0`: NULL");

		const search = msg.args.value.toLowerCase();

		const matches = L.filter(r => r[1].toLowerCase().includes(search), UnivBot.data.unicodeNames)
				.toJSON()
				.sort((a, b) => parseInt(a[0], 16) - parseInt(b[0], 16));
		
		if(matches.length > 0) {
			let str = "";
			for(let i = 0; i < matches.length && i < 10; i++) {
				let item = matches[i];
				str += `\`${String.fromCodePoint(parseInt(item[0], 16))}\`: ${item[1]} (U+${item[0]})\n`;
			}
			if(matches.length > 10)
				str += `and ${matches.length - 10} more...`;
			msg.reply(str);
		} else {
			msg.reply("Invalid input!");
		}
	}
}
