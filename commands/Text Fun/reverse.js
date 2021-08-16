module.exports = {
	name: [ "reverse", "backwards" ],
	usage: "[-__l__ast] [message]",
	desc: "Reverses the message",
	DM: true,
	permissions: [],
	exec(UnivBot, msg) {
		if(msg.args.last || msg.args.l)
			msg.args.value = msg.channel.messages.cache.map(r => r)[msg.channel.messages.cache.size - 2].content;

		if(!msg.args.value)
			return msg.reply("I can't reverse the void");

		msg.reply(msg.args.value.split("").reverse().join(""));
	}
}
