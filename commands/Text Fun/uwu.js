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
	usage: "[-__l__ast] [message]",
	desc: "UwU-ify a message",
	DM: true,
	permissions: [],
	exec(UnivBot, msg) {
		if(msg.args.last || msg.args.l)
			msg.args.value = msg.channel.messages.cache.map(r => r)[msg.channel.messages.cache.size - 2].content;

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
		.replace(/speak/gi, "spweak")
		.replace(/stand/gi, "stwand")
		.replace(/(thanks|thank you)/gi, "tankies")
		.replace(/\bthe\b/gi, "da")
		.replace(/time/gi, "tim")
		.replace(/worse/gi, "wose")
		.replace(/your/gi, "ur")
		.replace(/you/gi, "u")
		.replace(/\bone/gi, "wun")
		.replace(/\bonce/gi, "wuns")
		.replace(/\buse/gi, "yus")
		.replace(/((?<!q)ue|ew)/gi, "yu")
		.replace(/((?<!q)uil)/gi, "il")
		.replace(/[aueo]r\b/gi, "a")
		.replace(/wo/gi, "u")
		.replace(/air\b/gi, "ea")
		.replace(/na/gi, "nya")
		.replace(/ove/gi, "uv")
		.replace(/\bth/gi, "d")
		.replace(/th/gi, "s")
		.replace(/v/gi, "b")
		.replace(/ck/gi, "k")
		.replace(/n([auo])/gi, "ny$1")
		.replace(/c([ie])/gi, "s$1")
		.replace(/tion/gi, "shon")
		.replace(/ough/gi, "u")
		.replace(/i(.)e\b/gi, "ai$1")
		.replace(/(?<!e)ese\b/gi, "ees")
		.replace(/(?<=\w\w\w)e\b/gi, "")
		.replace(/wh\b/gi, "w")
		.replace(/ch\b/gi, "t")
		.replace(/ch\b/gi, "t")
		.replace(/ng\b/gi, "n")
		.replace(/[rl](?!\b)/gi, "w")
		.replace(/['’]/g, "")
		.replace(/(?!([uox])\1\1)(\b([OUXTq])[wuox]\4\b|[OUXTq>^\-][_\-/][OUXTq<^\-]|[>^\-][wuox][<^\-]|[;:]-*[)(pd]|[xb]-*[)(]|\b[xb]-*[pd]\b)/gi, () => face())
		.replace(/\?/g, "?".repeat(Math.ceil(Math.random() * 3)))
		.replace(/\b(ha|hah|heh|hehe)+\b/g, "hehe xD")
		.trim() + " " + face();
}
