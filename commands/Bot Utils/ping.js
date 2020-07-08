module.exports = {
	name: 'ping',
	usage: '',
	desc: 'Checks the speed of the Bot',
	DM: true,
	permissions: [],
	exec(UnivBot, msg) {
		return msg.send('Pong! :ping_pong: ' + Math.round(UnivBot.client.ping) + 'ms!');
	}
}
