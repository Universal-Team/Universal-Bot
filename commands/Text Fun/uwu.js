const {CommandInteraction} = require("discord.js");

const eyes = ["O", "o", "U", "u", ">", "^", "-", "X", "T", "q"];
const mouths = ["w", "u", "o", "\\_", "-", "x", "///"];
const extras = [["", ""], ["", ""], ["", ""], ["", "-☆"], ["=", "="], ["d", "b♪"]];

function face() {
	let eye = eyes[Math.floor(Math.random() * eyes.length)];
	let mouth;
	do {
		mouth = mouths[Math.floor(Math.random() * mouths.length)];
	} while(mouth.toLowerCase() == eye.toLowerCase());
	let extra = extras[Math.floor(Math.random() * extras.length)];
	
	return extra[0] + eye + mouth + eye + extra[1];
}

module.exports = {
	name: ["uwu", "uwuify", "owo", "owoify"],
	args: {
		last: {
			letter: "l"
		},
		value: {
			title: "message"
		}
	},
	desc: "UwU-ify a message",
	DM: true,
	permissions: [],
	face: face,
	exec(UnivBot, msg) {
		if(msg.args.last || msg.args.l)
			msg.args.value = msg.channel.messages.cache.map(r => r)[msg.channel.messages.cache.size - (msg instanceof CommandInteraction ? 1 : 2)].content;

		if(!msg.args.value)
			return msg.reply(`ur no fun ${face()}`);

		for(let member of msg.guild.members.cache) {
			if(member[1].nickname)
				msg.args.value = msg.args.value.caseReplaceAll(member[1].nickname, `${member[1].nickname}-chan`);
			msg.args.value = msg.args.value.caseReplaceAll(member[1].user.username, `${member[1].user.username}-chan`);
		}

		msg.reply(uwuify(msg.args.value));
	}
}

function uwuify(text) {
	return text
		.replace(/\bi['’]m\b/gi, "im")
		.replace(/\bi['’]ve/gi, "ive")
		.replace(/\bi\b/gi, "me")
		.replace(/\bmy\b/gi, "me")
		.replace(/\band\b/, "an")
		.replace(/need/gi, "nweed")
		.replace(/oh no/gi, "ono")
		.replace(/s's/gi, "s")
		.replace(/['’]/g, "")
		.replace(/speak/gi, "spweak")
		.replace(/stand/gi, "stwand")
		.replace(/(thanks|thank you)/gi, "tankies")
		.replace(/\bthe\b/gi, "da")
		.replace(/\bis\b/gi, "iz")
		.replace(/\bcow\b/gi, "mooo")
		.replace(/time/gi, "tim")
		.replace(/worse/gi, "wose")
		.replace(/your/gi, "ur")
		.replace(/you/gi, "u")
		.replace(/\bone/gi, "wun")
		.replace(/\bonce/gi, "wuns")
		.replace(/\buse/gi, "yus")
		.replace(/((?<!q)ue|ew)/gi, "yu")
		.replace(/((?<!q)uil)/gi, "il")
		.replace(/(?<!\b)[aueo]r\b/gi, "a")
		.replace(/wo/gi, "u")
		.replace(/air\b/gi, "ea")
		.replace(/na/gi, "nya")
		.replace(/ove/gi, "uv")
		.replace(/\bth(?!i?[rn])/gi, "d")
		.replace(/th/gi, "s")
		.replace(/v/gi, "b")
		.replace(/ck/gi, "k")
		.replace(/\bkn/gi, "n")
		.replace(/n([auo])/gi, "ny$1")
		.replace(/c([ie])/gi, "s$1")
		.replace(/tion/gi, "shon")
		.replace(/(\br|n)ough/gi, "$1uf")
		.replace(/rough/gi, "ru")
		.replace(/cough/gi, "cauf")
		.replace(/ought/gi, "aut")
		.replace(/ough/gi, "o")
		.replace(/ed\b/gi, "d")
		.replace(/i(.)e\b/gi, "ai$1")
		.replace(/(?<!e)ese\b/gi, "ees")
		.replace(/(?<=\w\w\w)e\b/gi, "")
		.replace(/wh\b/gi, "w")
		.replace(/ch\b/gi, "t")
		.replace(/ch\b/gi, "t")
		.replace(/ng\b/gi, "n")
		.replace(/[rl](?!\b)/gi, "w")
		.replace(/(.)\1(?!\1)/gi, "$1")
		.replace(/(?!([uox])\1\1)(?:\b([OUXTq])[wuox]\2\b|[OUXTq>^\-][_\-/][OUXTq<^\-]|[>^\-][wuox][<^\-]|[;:]-*[)(pd]|[xb]-*[)(]|\b[xb]-*[pd]\b)/gi, () => face())
		.replace(/\?/g, "?".repeat(Math.ceil(Math.random() * 3)))
		.replace(/\b((bwa|ha|hah|heh|hehe|wol|wmao|wmfao) ?)+\b/g, "hehe xD")
		.trim() + " " + face();
}
