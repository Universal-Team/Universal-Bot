let questions = [
	"How do I get a notification role?",
	"What is Relaunch?",
	"Should I use pkmn-chest on 3DS?",
];

let answers = [
	"To get a notification role for one of our projects, use ?role in <#587664918560505896>",
	"Relaunch is an Unlaunch lookalike that lets you boot other apps by holding hotkeys",
	"pkmn-chest works fine on 3DS, however you may prefer using FlagBrew's [PKSM](https://flagbrew.org/project/PKSM). It was designed for 3DS and thus makes better use of 3DS features. (It also supports gen 6/7 games)",
];

function findQuestion(name) {
	if(name.length > 0) {
		let possibleQuestions = [];
		for(let i=0;i<questions.length;i++) {
			possibleQuestions.push(questions[i].toLowerCase().search(name.toLowerCase()));
		}

		for(let i in possibleQuestions) {
		if(possibleQuestions[i] == -1) possibleQuestions[i] = Infinity;
		}

		return possibleQuestions.indexOf(Math.min.apply(Math, possibleQuestions)) + 1;
	}
}

module.exports = {
	name: "faq",
	usage: "<faq>",
	desc: "Sends the specified faq",
	DM: true,
	permissions: [],
	exec(UnivBot, msg) {
		let faqNo = Number(msg.args.value);
		if(isNaN(faqNo)) {
			faqNo = findQuestion(msg.args.value);
		}

		if(faqNo <= questions.length && faqNo > 0) {
			msg.send({
				embeds: [{
					color: 0x00c882,
					title: `FAQ ${faqNo}: ${questions[faqNo - 1]}`,
					description: answers[faqNo - 1],
				}]
			});
		} else {
			let qList = "";
			for(let i = 0; i < questions.length; i++) {
				qList += `**${(Number(i) + 1).toString()}.** ${questions[i]}\n`;
			}

			msg.send({
				embeds: [{
					color: 0x00c882,
					title: "FAQ list",
					description: qList,
				}]
			});
		}
	}
}
