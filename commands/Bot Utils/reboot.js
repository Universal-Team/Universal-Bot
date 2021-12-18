var terminal = require("child_process").execSync;
const fs = require("fs");

module.exports = {
	name: ["reboot","restart","refresh"],
	args: {},
	desc: "Reboots the bot",
	DM: true,
	permissions: [ "DEV" ],
	exec(UnivBot, msg) {
		msg.reply("Rebooting...").then(message => {
			if(message)
				UnivBot.db.reboot = { msg: message.id, channel: message.channel.id, guild: message.guild?.id, start: new Date().getTime() };
			else
				UnivBot.db.reboot = { msg: null, channel: msg.channel.id, guild: msg.guild?.id, start: new Date().getTime() };
			fs.writeFileSync("database.json", JSON.stringify(UnivBot.db, null, "\t"));
			terminal("pm2 restart univ-bot");
		});
	}
}
