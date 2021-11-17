module.exports = {
	name: ["coinFlip", "coin"],
	args: {
		count: {
			letter: "c"
		}
	},
	desc: "Flips a coin",
	DM: true,
	permissions: [],
	exec(UnivBot, msg) {
		out = [];
		let count = Math.min(msg.args.count ?? msg.args.c ?? 1, 1000);
		for(let i = 0; i < count; i++) {
			out.push(Math.floor(Math.random() * 2) ? "Heads" : "Tails");
		}

		let str = out.join(", ");
		if(str.length <= 2000) {
			msg.reply(str);
		} else {
			str = str.substr(0, 2000);
			msg.reply(str.substr(0, str.lastIndexOf(",")));
		}
	}
}
