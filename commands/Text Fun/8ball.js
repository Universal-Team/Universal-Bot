module.exports = {
	name: ["8-ball", "8ball", "magicball"],
	usage: "<question>",
	desc: "The :8ball: answers to a question",
	DM: true,
	permissions: [],
	exec(UnivBot, msg) {
		if(!msg.args.value)
			return msg.reply(":8ball: **||** Nice non-existent question");

		var answers = [ "YEE", "NOO", "Yes", "No", "Yeah!", "Why do you want to know?", "Maybe", "I won't tell you :P", "Maybe yes, maybe no", "Totally yes!", "Totally not!", "Wha-Of course not!", "Wha-Of course yes!", "N-no...", "Y-yes...", "Nah", "Yeah, whatever", "NOPE NOPE NOPE!", "YES! OF COURSE YES!", "Thats... not true", "Thats... true" ];
		var answer = Object.values(answers)[parseInt(Math.random() * answers.length)];
		msg.reply(`:8ball: **||** ${answer}`);
	}
}
