const fs = require("fs");
const Discord = require("discord.js");
function noRepeat(array) {
		let arr = [];
		for(var item of array) {
			if(!arr.includes(item))
				arr.push(item);
		}
		return arr;
}

module.exports = async (UnivBot) => {
	// Tell the console
	console.log(`${UnivBot.client.user.tag} is ready`);

	// Setup activities
	var status = `${UnivBot.client.guilds.cache.size} Servers | ?help`;
	if(UnivBot.client.guilds.cache.size == 1)
		status = `${UnivBot.client.guilds.cache.size} Server | ?help`;
	UnivBot.client.user.setActivity("Booted!");
	setTimeout(() =>
		UnivBot.client.user.setActivity(status, {
			type: "WATCHING"
		})
	, 3000);

	// Make collection of commands
	UnivBot.cmds = [];
	UnivBot.categories = fs.readdirSync("commands/");
	for(var category of UnivBot.categories) {
		var commands = fs.readdirSync(`commands/${category}`).filter(cmd => cmd.endsWith(".js"));
		for(var command of commands) {
			UnivBot.cmds.push(`commands/${category}/${command}`);
		}
	}

	// Detect reboot
	if(UnivBot.db.reboot) {
		var reb = UnivBot.db.reboot;
		if(!reb.guild) {
			console.log(reb.author)
			var user = UnivBot.client.users.get(reb.author);
			var channel = await user.createDM();
			var time = Math.abs((new Date().getTime() - reb.start) / 1000);
			var msg = channel.fetchMessage(reb.msg)
			msg.then(msg => {
				msg.edit(`Done rebooting! It took ${time} seconds`);
				delete UnivBot.db.reboot;
				fs.writeFileSync("database.json", JSON.stringify(UnivBot.db, null, "\t"));
			}).catch(() => {
				user.send(`Done rebooting! It took ${time} seconds`);
				delete UnivBot.db.reboot;
				fs.writeFileSync("database.json", JSON.stringify(UnivBot.db, null, "\t"));
			});
		} else {
			var guild = UnivBot.client.guilds.cache.get(reb.guild);
			var channel = guild.channels.cache.get(reb.channel);
			var time = Math.abs((new Date().getTime() - reb.start) / 1000);
			var msg = channel.messages.fetch(reb.msg)
			msg.then(msg => {
				msg.edit(`Done rebooting! It took ${time} seconds`);
				delete UnivBot.db.reboot;
				fs.writeFileSync("database.json", JSON.stringify(UnivBot.db, null, "\t"));
			}).catch(() => {
				channel.send(`Done rebooting! It took ${time} seconds`);
				delete UnivBot.db.reboot;
				fs.writeFileSync("database.json", JSON.stringify(UnivBot.db, null, "\t"));
			});
		}
	}
}
