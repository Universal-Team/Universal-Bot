const {CommandInteraction} = require("discord.js");

module.exports = {
	name: ["work"],
	args: {},
	desc: "Fixes all problems, removes all the bugs, run when anything doesn't work!",
	DM: true,
	permissions: [],
	async exec(UnivBot, msg) {
		if(msg instanceof CommandInteraction) {
			msg.reply("No thanks, /commands are dumb");
		} else {
			let m = await msg.reply("Okay!");
			setTimeout(() => m.edit("nvm, I don't feel like it"), 3000);
		}
	}
}
