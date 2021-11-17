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

			// Register slash command
			let cmd = require(`../commands/${category}/${command}`);
			let options = undefined;
			if(cmd.args) {
				options = []
				for(let item in cmd.args) {
					let arg = cmd.args[item];
					let o = {
						name: (arg.title ?? item).replace(/[ \/]/g, "-"),
						description: arg.hint ?? arg.title ?? item,
						type: (arg.value || item == "value") ? "STRING" : "BOOLEAN",
						required: arg.required == true,
					}
					if(arg.required)
						options.unshift(o);
					else
						options.push(o);
				}
			}

			UnivBot.client.application?.commands.create({
				name: (typeof cmd.name == "string" ? cmd.name : cmd.name[0]).toLowerCase(),
				description: cmd.desc.substr(0, 100),
				options: options
			}).then(r => console.log("registed command", r.name));
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
				UnivBot.db.reboot = undefined;
				fs.writeFileSync("database.json", JSON.stringify(UnivBot.db, null, "\t"));
			});
			msg.catch(() => {
				user.send(`Done rebooting! It took ${time} seconds`);
				UnivBot.db.reboot = undefined;
				fs.writeFileSync("database.json", JSON.stringify(UnivBot.db, null, "\t"));
			});
		} else {
			var guild = UnivBot.client.guilds.cache.get(reb.guild);
			var channel = guild.channels.cache.get(reb.channel);
			var time = Math.abs((new Date().getTime() - reb.start) / 1000);
			var msg = channel.messages.fetch(reb.msg)
			msg.then(msg => {
				msg.edit(`Done rebooting! It took ${time} seconds`);
				UnivBot.db.reboot = undefined;
				fs.writeFileSync("database.json", JSON.stringify(UnivBot.db, null, "\t"));
			});
			msg.catch(() => {
				channel.send(`Done rebooting! It took ${time} seconds`);
				UnivBot.db.reboot = undefined;
				fs.writeFileSync("database.json", JSON.stringify(UnivBot.db, null, "\t"));
			});
		}
	}
}
