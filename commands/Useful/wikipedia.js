const fetch = require("node-fetch");
const {CommandInteraction} = require("discord.js");

module.exports = {
	name: "Wikipedia",
	usage: "[-__l__ast] [--l__a__nguage] <query>",
	desc: "Searches Wikipedia and sends the page if found",
	DM: true,
	permissions: [],
	exec(UnivBot, msg) {
		if(msg.args.last || msg.args.l)
			msg.args.value = msg.channel.messages.cache.map(r => r)[msg.channel.messages.cache.size - (msg instanceof CommandInteraction ? 1 : 2)].content;

		if(!msg.args.value)
			return msg.reply("https://en.wikipedia.org/wiki/Nothing");

		fetch(`https://${msg.args.language ?? msg.args.a ?? "en"}.wikipedia.org/w/api.php?action=opensearch&limit=1&namespace=0&format=json&search=${encodeURIComponent(msg.args.value)}`).then(r => r.json()).then(json => {
			console.log(json);
			if(json[3][0])
				msg.reply(json[3][0]);
			else
				msg.reply("No results found...");
		}).catch(e => msg.reply(`Error! Probably an invalid language\n${e}`));
	}
}
