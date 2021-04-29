module.exports = {
	name: "ping",
	usage: "",
	desc: "Checks the speed of the bot",
	DM: true,
	permissions: [],
	exec(UnivBot, msg) {
		return msg.send(`Pong! :ping_pong: ${Math.round(UnivBot.client.ws.ping)}ms!`);
	}
}
