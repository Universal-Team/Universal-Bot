module.exports = {
	name: ["dice", "die"],
	args: {
		sides: {
			letter: "s",
			value: true
		},
		count: {
			letter: "c",
			value: true
		}
	},
	desc: "Rolls dice",
	DM: true,
	permissions: [],
	exec(UnivBot, msg) {
		out = [];
		let sides = msg.args.sides ?? msg.args.s ?? 6;
		let count = Math.min(msg.args.count ?? msg.args.c ?? 1, 1000);
		for(let i = 0; i < count; i++) {
			out.push(Math.ceil(Math.random() * sides));
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
