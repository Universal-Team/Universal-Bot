// Setup vars
const Discord = require("discord.js");
const fs = require("fs");
function cloneDB(UnivBot, id) {
	var db = UnivBot.db.default;
	db = JSON.stringify(db);
	db = JSON.parse(db);
	if(!UnivBot.db[id]) {
		UnivBot.db[id] = db;
		fs.writeFileSync("database.json", JSON.stringify(UnivBot.db, null, "\t"));
	}
}

// Function for replace
function rep(string, member) {
	// user.id = member.id
	// user.ping = `<@${member.id}>`
	// user.tag = `${member.user.username}#${member.user.discriminator}`
	// user.name = member.user.username

	// guild.name = member.guild.name
	// guild.id = member.guild.id
	// guild.amount = member.guild.members.size
	string = string.split("${user.id}").join(member.id);
	string = string.split("${user.ping}").join(`<@${member.id}>`);
	string = string.split("${user.tag}").join(`${member.user.username}#${member.user.discriminator}`);
	string = string.split("${user.name}").join(member.user.username);

	string = string.split("${guild.name}").join(member.guild.name);
	string = string.split("${guild.id}").join(member.guild.id);
	string = string.split("${guild.amount}").join(member.guild.memberCount);

	return string;
}

module.exports = (UnivBot, member) => {
	// Create config if it doens't exists
	cloneDB(UnivBot, member.guild.id);

	// Check config and send message
	var db = UnivBot.db[member.guild.id];
	if(((member.guild.systemChannel && db.messages.goodbye.channel == "sys") || member.guild.channels.cache.get(db.messages.goodbye.channel)) && db.messages.goodbye.enabled) {
		let channel = member.guild.systemChannel;
		if(db.messages.goodbye.channel !== "sys")
			channel = member.guild.channels.cache.get(db.messages.goodbye.channel);
		channel.send(rep(db.messages.goodbye.string, member))
	}
}
