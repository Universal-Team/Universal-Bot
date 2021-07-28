module.exports = {
	name: "clap",
	usage: "[-__l__ast] [message]",
	desc: "Replaces the spaces with :clap:",
	DM: true,
	permissions: [],
	exec(UnivBot, msg) {
		if(msg.args.last || msg.args.l)
			msg.args.value = msg.channel.messages.cache.array()[msg.channel.messages.cache.size - 2].content;

			if(!msg.args.value.includes(" "))
				return msg.reply("One clap for you :clap:");

		msg.reply(msg.args.value.replace(/ /g, ":clap:"));
	}
}
