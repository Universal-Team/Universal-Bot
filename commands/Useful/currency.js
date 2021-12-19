const fetch = require("node-fetch");
const {CommandInteraction} = require("discord.js");

module.exports = {
	name: ["currency", "$", "€", "£", "¥"],
	args: {
		source: {
			letter: "s",
			value: true,
			required: true
		},
		target: {
			letter: "t",
			value: true
		},
		last: {
			letter: "l"
		},
		value: {}
	},
	desc: "Converts from one currency to another",
	DM: true,
	permissions: [],
	async exec(UnivBot, msg) {
		if(!process.env.CURRENCY_TOKEN)
			return msg.reply("Please set `CURRENCY_TOKEN` in your `.env`.");

		if(msg.args.last)
			msg.args.value = msg.channel.messages.cache.map(r => r)[msg.channel.messages.cache.size - (msg instanceof CommandInteraction ? 1 : 2)].content;

		if(!msg.args.value)
			return msg.reply("I can't assign a price to nothing");

		if(!msg.args.source)
			return msg.reply("I can't convert from nothing");

		let value = parseFloat(msg.args.value.match(/[0-9.,]+/)?.[0].replace(/,/, ""));
		if(isNaN(value))
			value = 1;

		let currencies = await fetch(`https://free.currconv.com/api/v7/currencies?apiKey=${process.env.CURRENCY_TOKEN}`).then(r => r.json());
		let source = Object.values(currencies.results).find(r => msg.args.source.toUpperCase().includes(r.id))?.id;
		if(!source)
			return msg.reply("Invalid source currency!");

		let target;
		if(msg.args.target) {
			if((msg.args.target).toUpperCase() in currencies.results)
				target = (msg.args.target).toUpperCase();
			else
				return msg.reply("Invalid target currency!");
		} else {
			switch(msg.cmd) {
				case "€":
					target = "EUR";
					break;
				case "£":
					target = "GBP";
					break;
				case "¥":
					target = "JPY";
					break;
				default:
					target = "USD";
					break;
			}
		}

		let conversion = `${source}_${target}`;
		fetch(`https://free.currconv.com/api/v7/convert?compact=ultra&apiKey=${process.env.CURRENCY_TOKEN}&q=${conversion}`).then(r => r.json()).then(j => {
			msg.reply(`${(j[conversion] * value).toFixed(2)} ${target}`);
		}).catch(e => msg.reply(`Conversion failed! (${e})`));
	}
}
