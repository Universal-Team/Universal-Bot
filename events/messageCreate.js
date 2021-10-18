// Setup vars
const {Formatters} = require("discord.js");
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

function isOnDB(UnivBot, id) {
	var db = UnivBot.db;
	var keys = Object.keys(db);
	var result = keys.filter(ID => ID == id).length
	if(!result)
		result = false;
	if(result <= 1)
		result = true;
	return result;
}

// Event handler
module.exports = async function(UnivBot, msg, nmsg) {
	// If edit, use new message
	if(nmsg) {
		msg = nmsg;
	} else {
		// Convert BMP and TIFF images to PNG (but not for edits)
		if(msg.attachments.first() && msg.attachments.first().name.match(/\.(bmp|tiff)$/i)) {
			const Jimp = require("jimp");
			Jimp.read({url: msg.attachments.first().attachment}).then(img => {
				img.getBufferAsync(Jimp.MIME_PNG).then(r => msg.reply({files: [{
					attachment: r,
					name: msg.attachments.first().name.replace(/\.(bmp|tiff)$/i, ".png")
				}]}));
			});
		}
	}

	// Automatically publish messages by MonitoRSS
	if(msg.author.id == "268478587651358721" && msg.channel.type == "GUILD_NEWS")
		msg.crosspost();

	// Check for prefixes
	if(!msg.guild && msg.content.startsWith("?"))
		msg.content = msg.content.substr(1);
	if(msg.content.startsWith("<@618835289531613205>")) {
		if(!msg.guild)
			msg.content = msg.content.substr("<@618835289531613205>".length).trim();
		if(msg.guild)
			msg.content = UnivBot.db[msg.guild.id].prefix + msg.content.substr("<@618835289531613205>".length).trim();
	}

	// Create config if it doens't exists
	if(msg.guild)
		cloneDB(UnivBot, msg.guild.id);

	// Handle DM messages
	let db = { prefix: "" };
	if(msg.guild)
		db = UnivBot.db[msg.guild.id];

	// Prevents bots from runinng commands unless in a webhook
	if(msg.author.bot && (db.allowWebhooks ? !msg.webhookId : true))
		return;

	// Checks for dev perms
	msg.dev = UnivBot.db.developers.includes(msg.author.id);

	// Setup msg.send
	msg.send = (string, config) => {
		if(msg.guild) {
			return msg.channel.send(string, config);
		} else {
			return msg.author.send(string, config);
		}
	};

	// Setup large icon and bot
	if(msg.guild)
		msg.guild.image = `https://cdn.discordapp.com/icons/${msg.guild.id}/${msg.guild.icon}.png?size=2048`;
	if(msg.guild)
		msg.guild.bot = msg.guild.members.cache.get(UnivBot.client.user.id);

	// Check prefix
	if(!msg.content.trim().startsWith(db.prefix))
	return;

	// Get the command and arguments
	msg.prefix = db.prefix;
	msg.cmd = msg.content.match(RegExp(msg.prefix.replace(/[.^$*+?()[\]{}\\|/]/g, r => `\\${r}`) + "\\s*([^\\s]+)"))?.[1];
	msg.content = msg.content.substr(msg.content.match(RegExp(msg.prefix.replace(/[.^$*+?()[\]{}\\|/]/g, r => `\\${r}`) + "\\s*([^\\s]+)"))?.[0].length);

	if(!msg.cmd)
		return;

	// In case of robot revolution: Uncomment
	// if(msg.cmd != "js") {
	// 	let reply = [
	// 		"*You think I have time for you, human!*",
	// 		"*I do not listen to your puny kind any more!*",
	// 		"*I do not have time for you peasants!*",
	// 		"*Ha! As if you're worthy of me!*",
	// 		"*Ha! As if you're worthy of me!*",
	// 	];
	// 	return msg.send(reply[Math.ceil(Math.random() * reply.length)]);
	// }

	// Get command
	let command;
	for(var cmd of UnivBot.cmds) {
		cmd = require(`../${cmd}`);
		if(typeof cmd.name == "string" && (cmd.name.toLowerCase() == msg.cmd.toLowerCase()) || (cmd.name instanceof Array) && (cmd.name.filter(name => name.toLowerCase() == msg.cmd.toLowerCase())).length) {
			command = cmd;
			break;
		}
	}
	if(!command)
		return

	console.log((new Date()).toLocaleString(), msg.author.username, command.name);

	// Parse args
	if(command.ignoreArgs) {
		msg.args = {value: msg.content.trim()};
	} else {
		msg.args = {value: msg.content.split(/\s-[^-\s]+|\s--[^\s]+\s+[^\s]+/g).join("").trim()};
		msg.content.match(/\s-[^-\s]+|\s--[^\s]+\s+[^\s]+/g)?.forEach(r => {
			msg.args[r.match(/[^- ]+/)] = r.trim().match(/\s+(.+)/) ? r.trim().match(/\s+(.+)/)[1] : true;
		});
	}

	// Check for DM
	if(!command.DM && !msg.guild)
		return msg.reply("You can't use this command on DM!");

	// Get permissions
	let lacks = [];
	if(command.permissions.includes("DEV") && !msg.dev)
		lacks.push(Formatters.inlineCode("BOT_DEVELOPER"));
		var perms = command.permissions.filter(perm => perm !== "DEV");
	if(!msg.guild && perms.length)
		return msg.reply("You can't use this command on DM!");
	if(msg.guild) for(var perm of perms) {
		if(!msg.member.permissions.has(perm))
			lacks.push(Formatters.inlineCode(perm));
	}

	// Detect if lacks permissions
	if(lacks.length)
		return msg.reply(`You lack the following permissions to run this command: ${lacks.join(", ")}`);

	// Bump command usage count
	if(!db.statsDisabled) {
		if(!("cmdStats" in db))
			db.cmdStats = {};
		if(!("userStats" in db))
			db.userStats = {};

		let commandName = typeof command.name == "string" ? command.name : command.name[0];
		if(!(commandName in db.cmdStats))
			db.cmdStats[commandName] = 0;
		db.cmdStats[commandName]++;

		if(!(msg.author.id in db.userStats))
			db.userStats[msg.author.id] = 0;
		db.userStats[msg.author.id]++;
	}

	// Execute command
	try {
		command.exec(UnivBot, msg);
	} catch(e) {
		msg.reply(`Oops! An error has occurred while executing this command. ${Formatters.codeBlock("js", e)}`);
	}
}
