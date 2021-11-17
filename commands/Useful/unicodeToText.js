module.exports = {
	name: ["unicodeToText", "utt", "text"],
	args: {
		value: {
			title: "character codes",
			required: true
		}
	},
	desc: "Converts unicode character codes to their characters",
	DM: true,
	permissions: [],
	exec(UnivBot, msg) {
		if(msg.args.value) {
			let message = "";
			msg.args.value.split(" ").forEach(r => {
				message += String.fromCodePoint(parseInt(r.replace(/U\+/gi, "0x")));
			});
			return msg.reply(message);
		}
		return msg.reply("I can't convert nothing...");
	}
}
