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
		let embed = new Discord.EmbedBuilder()
			.setColor(8557055)
			.setDescription(`**${UnivBot.client.user.username}** is a simple bot made for Universal-Team's Discord server.\n\nNote: If you add Universal-Bot to your server it will allow all of your server's emoji to be accessed by the emoji commands including seeing the server name in ?emojiInfo.`)
			.setThumbnail(UnivBot.client.user.displayAvatarURL())
			.setImage(UnivBot.client.user.displayAvatarURL())
			.setURL(link)
			.setTitle(`${UnivBot.client.user.username}'s Information`);
		embed.addFields(
			{name: ":pencil2: Language used", value: "**JavaScript** (Node.js)", inline: true},
			{name: ":busts_in_silhouette: Coders", value: "**Javier107**, **Pk11** and **StackZ**", inline: true},
			{name: ":bell: Add bot to server", value: `[Click here to invite](${link})`, inline: true},
			{name: ":clipboard: Database used", value: "**J**ava**S**cript **O**bject **N**otation", inline: true},
			{name: ":satellite: Host used", value: "AMD Ryzen 9 5900X", inline: true},
			{name: ":bulb: Command count", value: `**${UnivBot.cmds.length}** Commands`, inline:true},
			{name: ":hash: Version", value: `[${version.substr(0, 7)}](https://github.com/Universal-Team/Universal-Bot/commit/${version})`, inline: true},
			{name: ":notebook_with_decorative_cover: Modules used", value: `**${modules.join("**, **")}**`, inline: true}
		);
		embed.setFooter({text: "• Coded using discord.js", iconURL: UnivBot.client.user.displayAvatarURL()});
		return msg.reply({embeds: [embed]});
	}
}
