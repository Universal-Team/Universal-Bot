module.exports = {
	name: ["tryItAndSee", "tias"],
	usage: "",
	desc: "Lets you know that you should try it and see",
	DM: true,
	permissions: [],
	exec(UnivBot, msg) {
		msg.send("https://tryitands.ee");
	}
}
