module.exports = {
	name: ["jif", "gif-but-wrong"],
	args: {},
	desc: "Converts anything to a jif",
	DM: true,
	permissions: [],
	exec(UnivBot, msg) {
		msg.reply("http://service.jmslinks.com/WebService/ProdAdminImage.ashx?id=230");
	}
}
