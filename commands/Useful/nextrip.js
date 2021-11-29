const fetch = require("node-fetch");
const {CommandInteraction} = require("discord.js");
const {parseString} = require("xml2js");

module.exports = {
	name: ["NexTrip", "mt"],
	args: {
		value: {
			title: "stop number",
			required: true
		}
	},
	desc: "Gets the upcoming bus times for a Metro Transit stop",
	DM: true,
	permissions: [],
	exec(UnivBot, msg) {
		if(!msg.args.value)
			return msg.reply("The bus does not stop in the void.");

		fetch(`https://svc.metrotransit.org/NexTrip/${msg.args.value}?format=json`).then(r => r.json()).then(j => {
			if(j.length == 0)
				return msg.reply(`There are no busses scheduled for stop ${msg.args.value}.`);

			let embed = {
				title: `Upcoming busses at stop ${msg.args.value}`,
				color: 0x0053A0,
				fields: []
			}

			for(let departure of j) {
				embed.fields.push({
					name: `Route ${departure.Route} (${departure.RouteDirection})`,
					value: `<t:${departure.DepartureTime.match(/\d+/)[0] / 1000}:R>`,
					inline: true
				});
			}

			msg.reply({embeds: [embed]});
		}).catch(() => msg.reply("Invalid stop number!"));
	}
}
