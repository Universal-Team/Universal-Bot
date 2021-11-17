const fetch = require("node-fetch");
const {CommandInteraction} = require("discord.js");

module.exports = {
	name: ["translate", "DeepL"],
	args: {
		source: {
			letter: "s",
			value: true
		},
		target: {
			letter: "t",
			value: true
		},
		last: {
			letter: "l"
		},
		value: {
			title: "string"
		}
	},
	desc: "Translates a string using DeepL translator",
	DM: true,
	permissions: [],
	exec(UnivBot, msg) {
		if(!process.env.DEEPL_TOKEN)
			return msg.reply("Please set `DEEPL_TOKEN` in your `.env`.");

		if(msg.args.last)
			msg.args.value = msg.channel.messages.cache.map(r => r)[msg.channel.messages.cache.size - (msg instanceof CommandInteraction ? 1 : 2)].content;

		if(!msg.args.value)
			return msg.reply("何もないを翻訳できません…");

		let source = "";
		if(msg.args.source) {
			if(["BG", "CS", "DA", "DE", "EL", "EN", "ES", "ET", "FI", "FR", "HU", "IT", "JA", "LT", "LV", "NL", "PL", "PT", "RO", "RU", "SK", "SL", "SV", "ZH"].includes((msg.args.source || msg.args.s).toUpperCase()))
				source = encodeURIComponent(msg.args.source).toUpperCase();
			else
				return msg.reply("Invalid source language!");
		}

		let target = "EN";
		if(msg.args.target) {
			if(["BG", "CS", "DA", "DE", "EL", "EN-GB", "EN-US", "EN", "ES", "ET", "FI", "FR", "HU", "IT", "JA", "LT", "LV", "NL", "PL", "PT-PT", "PT-BR", "PT", "RO", "RU", "SK", "SL", "SV", "ZH"].includes((msg.args.target || msg.args.t).toUpperCase()))
				target = encodeURIComponent(msg.args.target).toUpperCase();
			else
				return msg.reply("Invalid target language!");
		}

		fetch(`https://api-free.deepl.com/v2/translate?auth_key=${process.env.DEEPL_TOKEN}&target_lang=${target}&source_lang=${source}&text=${encodeURIComponent(msg.args.value)}`).then(r => r.json()).then(j => {
			msg.reply(j.translations[0].text);
		}).catch(e => msg.reply(`Translation failed! (${e})`));
	}
}
