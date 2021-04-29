module.exports = {
	name: ["dice", "die"],
	usage: "[-__s__ides] [-__c__ount]",
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
			msg.send(str);
		} else {
			str = str.substr(0, 2000);
			msg.send(str.substr(0, str.lastIndexOf(",")));
		}
	}
}
