module.exports = {
	name: ["coinFlip", "coin"],
	usage: "[-__c__ount]",
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
			msg.send(str);
		} else {
			str = str.substr(0, 2000);
			msg.send(str.substr(0, str.lastIndexOf(",")));
		}
	}
}
