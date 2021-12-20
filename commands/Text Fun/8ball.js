const {CommandInteraction} = require("discord.js");
const {face} = require("../Text Fun/uwu.js");

module.exports = {
	name: ["8-ball", "8ball", "magicball"],
	args: {
		value: {
			title: "question",
			required: true
		}
	},
	desc: "The :8ball: answers to a question",
	DM: true,
	permissions: [],
	exec(UnivBot, msg) {
		if(!msg.args.value)
			return msg.reply(":8ball: **||** Nice non-existent question");

		let answers = [
			"YEE",
			"NOO",
			"Yes",
			"No",
			"Yeah!",
			"Why do you want to know?",
			"Maybe",
			"I won't tell you ;P",
			"Maybe yes, maybe no",
			"Totally yes!",
			"Totally not!",
			"Wha-Of course not!",
			"Wha-Of course yes!",
			`N-no... ${face()}`,
			`Y-yes... ${face()}`,
			"Nah",
			"Yeah, whatever",
			"NOPE NOPE NOPE!",
			"YES! OF COURSE YES!",
			"Thats... not true",
			"Thats... true",
			"Nope <:ultraXD:611684795075919942>",
			"Sure <:EvieThumbsUp:703118869673541663>",
			"Ah, hmm... I guess",
			"Ehh, no"
		];
		let answer = answers[Math.floor(Math.random() * answers.length)];

		if(msg instanceof CommandInteraction)
			msg.reply(`> ${msg.args.value}\n:8ball: **||** ${answer}`);
		else
			msg.reply(`:8ball: **||** ${answer}`);
	}
}
