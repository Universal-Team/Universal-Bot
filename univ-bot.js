#!/usr/bin/env node

// ===========================================================
// Setup variables
// ===========================================================
const fs = require("fs");
const { Client, Intents } = require("discord.js");
const L = require("list");
require("./utils/Prototypes");
require("dotenv").config();

// ===========================================================
// Client
// ===========================================================
const UnivBot = {
	client: new Client({
		intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES],
		allowedMentions: { parse: [], repliedUser: false }
	}),
	data: {}
};
if(fs.existsSync("database.json")) {
	UnivBot.db = require("./database.json");
} else {
	UnivBot.db = {
		"default": {
			"prefix": "?",
			"messages": {
				"welcome": {
					"channel": "sys",
					"string": "Welcome **${user.ping}** to **${guild.name}**!, hope you enjoy your stay! The amount of members now is **${guild.amount}**",
					"enabled": true
				},
				"goodbye": {
					"channel": "sys",
					"string": "Goodbye **${user.tag}**... The amount of members now is **${guild.amount}**",
					"enabled": true
				}
			}
		},
		"developers": [
			"327757456673472523",
			"404682150370082817",
			"398661839182888960",
			"545821283372498944",
			"260277536464961537",
			"293573287697580034",
			"178261738364338177",
			"625056514666659880",
			"644449298087411732",
			"305817665082097665"
		]
	}
}
UnivBot.client.login(process.env.TOKEN);

UnivBot.data.unicodeNames = L.from(Object.entries(require("./data/unicode-names.json")));

// ===========================================================
// Handle the events
// ===========================================================
fs.readdir("./events/", (err, files) => {
	if(err) return console.error(err);
	files.forEach(file => {
		const event = require(`./events/${file}`);
		let eventName = file.split(".")[0];
		UnivBot.client.on(eventName, event.bind(null, UnivBot));
	});
});
