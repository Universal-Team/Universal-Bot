module.exports = {
	name: "bruh",
	usage: "[-__l__ast] [message]",
	desc: "Replaces all the spaces with a nice bruh",
	DM: true,
	permissions: [],
	exec(UnivBot, msg) {
		if(msg.args.last || msg.args.l)
			msg.args.value = msg.channel.messages.cache.array()[msg.channel.messages.cache.size - 2].content;

		if(!msg.args.value)
			return msg.reply("no bruh for bruh you");

		msg.reply(bruhify(msg.args.value));
	}
}

function bruhify(text) {
	return `BRUH ${text.replace(/(\s)/g, "$1bruh ")} BRUH`;
}
