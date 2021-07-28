const Discord = require("discord.js");

module.exports = {
	name: ["about", "invite"],
	usage: "",
	desc: "Shows info about the bot",
	DM: true,
	permissions: [],
	exec(UnivBot, msg) {
		var modules = require("../../package.json").dependencies;
		modules = Object.keys(modules);
		var link = "https://discordapp.com/oauth2/authorize?client_id=618835289531613205&scope=bot&permissions=8";
		let embed = new Discord.MessageEmbed()
			.setColor(8557055)
			.setDescription(`**${UnivBot.client.user.username}** is a simple bot made for Universal-Team.\n\nNote: If you add Universal-Bot to your server it will allow all of your server's emoji to be accessed by the emoji commands including seeing the server name in ?emojiInfo.`)
			.setThumbnail(UnivBot.client.user.avatarURL)
			.setImage(UnivBot.client.user.avatarURL)
			.setURL(link)
			.setTitle(`${UnivBot.client.user.username}'s Information`);
		embed.addField(":pencil2: Language used", "__**JavaScript**__ (Node.js)", true);
		embed.addField(":busts_in_silhouette: Coders", "__**Javier107**__, __**Pk11**__ and __**StackZ**__", true);
		embed.addField(":bell: Add bot to server", `[Click here to invite](${link})`, true);
		embed.addField(":clipboard: Database used", "**J**ava**S**cript**O**bject**N**otation", true);
		embed.addField(":satellite: Host used", "[Raspberry Pi](https://www.raspberrypi.org)", true);
		embed.addField(":bulb: Amount of cmds", `__**${UnivBot.cmds.length}**__ Commands`, true);
		embed.addField(":notebook_with_decorative_cover: Used modules", `**${modules.join("**, **")}**`, true)
		embed.setFooter("• Coded using discord.js", UnivBot.client.user.avatarURL);
		return msg.reply({embeds: [embed]});
	}
}
