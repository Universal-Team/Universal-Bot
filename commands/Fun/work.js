module.exports = {
	name: ["work"],
	usage: "",
	desc: "Fixes all problems, removes all the bugs, run when anything doesn't work!",
	DM: true,
	permissions: [],
	async exec(UnivBot, msg) {
		let m = await msg.send("Okay!");
		setTimeout(() => m.edit("nvm, I don't feel like it"), 3000);
	}
}
