const Discord = require("discord.js");
const terminal = require("child_process").execSync;

module.exports = {
	name: ["about", "invite"],
	args: {},
	desc: "Shows info about the bot",
	DM: true,
	permissions: [],
	exec(UnivBot, msg) {
		version = terminal("git rev-parse HEAD").toString();

		var modules = require("../../package.json").dependencies;
		modules = Object.keys(modules);
		var link = "https://discordapp.com/oauth2/authorize?client_id=618835289531613205&scope=bot&permissions=0";
		let embed = new Discord.MessageEmbed()
			.setColor(8557055)
			.setDescription(`**${UnivBot.client.user.username}** is a simple bot made for Universal-Team's Discord server.\n\nNote: If you add Universal-Bot to your server it will allow all of your server's emoji to be accessed by the emoji commands including seeing the server name in ?emojiInfo.`)
			.setThumbnail(UnivBot.client.user.avatarURL)
			.setImage(UnivBot.client.user.avatarURL)
			.setURL(link)
			.setTitle(`${UnivBot.client.user.username}'s Information`);
		embed.addField(":pencil2: Language used", "**JavaScript** (Node.js)", true);
		embed.addField(":busts_in_silhouette: Coders", "**Javier107**, **Pk11** and **StackZ**", true);
		embed.addField(":bell: Add bot to server", `[Click here to invite](${link})`, true);
		embed.addField(":clipboard: Database used", "**J**ava**S**cript **O**bject **N**otation", true);
		embed.addField(":satellite: Host used", "[Raspberry Pi](https://www.raspberrypi.org)", true);
		embed.addField(":bulb: Command count", `**${UnivBot.cmds.length}** Commands`, true);
		embed.addField(":hash: Version", `[${version.substr(0, 7)}](https://github.com/Universal-Team/Universal-Bot/commit/${version})`, true);
		embed.addField(":notebook_with_decorative_cover: Modules used", `**${modules.join("**, **")}**`, true);
		embed.setFooter("• Coded using discord.js", UnivBot.client.user.avatarURL);;
		return msg.reply({embeds: [embed]});
	}
}
