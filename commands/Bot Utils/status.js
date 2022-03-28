const L = require("list");

const punctuation = [",", ".", ":", ";", "...", "!", "?"];

module.exports = {
	name: "status",
	args: {
		random: {
			letter: "r"
		},
		value: {
			title: "status"
		}
	},
	desc: "Sets Universal-Bot's status",
	DM: true,
	permissions: [ "DEV" ],
	exec(UnivBot, msg) {
		if(msg.args.random) {
			let out = [];
			let count = Math.floor(Math.random() * 9) + 1;
			for(let i = 0; i < count; i++) {
				let str = L.nth(Math.floor(Math.random() * UnivBot.data.unicodeNames.length), UnivBot.data.unicodeNames)[1].split(/\b/).filter(r => r.match(/\b/));
				str = str[Math.floor(Math.random() * str.length)].toLowerCase();

				if(Math.random() < 0.2) // 1 in 5 chance
					str += punctuation[Math.floor(Math.random() * punctuation.length)];

				out.push(str);
			}

			let str = out.join(" ");
			while(str.length > 128) {
				out.pop();
				str = out.join(" ");
			}

			UnivBot.client.user.setActivity(str);
			msg.reply(`Status set to \`${str}\` :thumbsup:`);
		} else if(msg.args.value) {
			UnivBot.client.user.setActivity(msg.args.value.substr(0, 128));
			msg.reply(`Status set to \`${msg.args.value.substr(0, 128)}\` :thumbsup:`);
		} else {
			msg.reply("But doing *nothing* sounds so *boring*...");
		}
	}
}
