module.exports = {
	name: ["textToUnicode", "ttu", "unicode"],
	args: {
		value: {
			title: "text",
			required: true
		}
	},
	desc: "Converts text to their unicode character codes",
	DM: true,
	permissions: [],
	exec(UnivBot, msg) {
		if(msg.args.value) {
			let message = "";
			Array.from(msg.args.value).forEach(r => {
				message += `U+${r.codePointAt(0).toString(16).padStart(4, "0")} `;
			});
			return msg.reply(message);
		}
		return msg.reply("I can't convert nothing...");
	}
}
