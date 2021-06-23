module.exports = {
	name: ["jif", "gif-but-wrong"],
	usage: "",
	desc: "Converts anything to a jif",
	DM: true,
	permissions: [],
	exec(UnivBot, msg) {
		msg.send("http://service.jmslinks.com/WebService/ProdAdminImage.ashx?id=230");
	}
}
