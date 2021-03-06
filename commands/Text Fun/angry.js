module.exports = {
	name: "angry",
	usage: "[-__l__ast] [message]",
	desc: "Makes the message look angry",
	DM: true,
	permissions: [],
	exec(UnivBot, msg) {
		if(msg.args.last || msg.args.l)
			msg.args.value = msg.channel.messages.cache.array()[msg.channel.messages.cache.size - 2].content;

		if(!msg.args.value)
			return msg.send("The void is not angry");

		msg.send(`***${msg.args.value.toUpperCase().split("").join(" ")}***`);
	}
}
