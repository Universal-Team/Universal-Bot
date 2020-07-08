// Setup vars
const Discord = require('discord.js');
const fs = require('fs');

function cloneDB(UnivBot, id) {
	var db = UnivBot.db.default;
	db = JSON.stringify(db);
	db = JSON.parse(db);
	if (!UnivBot.db[id]) {
		UnivBot.db[id] = db;
		fs.writeFileSync('database.json', JSON.stringify(UnivBot.db, null, '\t'));
	}
}

function isOnDB(UnivBot, id) {
	var db = UnivBot.db;
	var keys = Object.keys(db);
	var result = keys.filter(ID => ID == id).length
	if (!result)
		result = false;
	if (result <= 1)
		result = true;
	return result;
}

function isDev(UnivBot, user) {
	let id = user.id;
	let db = UnivBot.db;
	if (db.developers.includes(id))
			return true;
	return false;
}

// Event handler
module.exports = async function(UnivBot, msg, nmsg) {
	// If edit, use new message
	if(nmsg)
		msg = nmsg;

	// Check for prefixes
	if (!msg.guild && msg.content.startsWith('?'))
		msg.content = msg.content.substr(1);
	if (msg.content.startsWith('<@618835289531613205>')) {
		if (!msg.guild)
			msg.content = msg.content.substr('<@618835289531613205>'.length).trim();
		if (msg.guild)
			msg.content = UnivBot.db[msg.guild.id].prefix+msg.content.substr('<@618835289531613205>'.length).trim();
	}

	// Create config if it doens't exists
	if (msg.guild)
		cloneDB(UnivBot, msg.guild.id);

	// Prevents bots from runinng commands
	if (msg.author.bot)
		return;

	// Checks for dev perms
	msg.dev = isDev(UnivBot, msg.author);

	// Setup msg.send and msg.reply
	msg.send = function(string, config) {
		var reg = new RegExp(process.env['TOKEN'], 'ig');
		if (typeof string == 'string')
			string = string.replace(reg, 'UnivBot.client.token').replace(/@everyone/g, '\@everyone');
		var message = this;
		if (message.guild) {
			return message.channel.send(string, config);
		} else {
			return message.author.send(string, config);
		}
	};
	msg.reply = function(string, config) {
		var message = this;
		var ping = '<@'+message.author.id+'>';
		return message.send(ping+', '+string, config);
	};

	// Setup large icon and bot
	if (msg.guild)
		msg.guild.image = `https://cdn.discordapp.com/icons/${msg.guild.id}/${msg.guild.icon}.png?size=2048`;
	if (msg.guild)
		msg.guild.bot = msg.guild.members.cache.get(UnivBot.client.user.id);

	// Handle DM messages
	let db = { prefix: '' };
	if (msg.guild)
		db = UnivBot.db[msg.guild.id];

	// Get the command and arguments
	msg.prefix = db.prefix;
	msg.cmd = msg.content.replace(/\n/g, ' ').split(' ')[0].substr(db.prefix.length).toLowerCase();
	msg.args = msg.content.trim().substr(msg.cmd.length+db.prefix.length).trim();

	// Check prefix
	if (!msg.content.trim().startsWith(db.prefix))
		return;

	// Get command
	let command;
	for (var cmd of UnivBot.cmds) {
		cmd = require("../" + cmd);
		if (typeof cmd.name == 'string' && (cmd.name.toLowerCase() == msg.cmd) || (cmd.name instanceof Array) && (cmd.name.filter(name => name.toLowerCase() == msg.cmd)).length) {
			command = cmd;
			break;
		}
	}
	if (!command)
		return

	// Check for DM
	if (!command.DM && !msg.guild)
		return msg.reply('You can\'t use this command on DM!');

	// Get permissions
	let lacks = [];
	if (command.permissions.includes('DEV') && !msg.dev)
		lacks.push('``BOT_DEVELOPER``');
	var perms = command.permissions.filter(perm => perm !== 'DEV');
	if (!msg.guild && perms.length)
		return msg.reply('You can\'t use this command on DM!');
	if (msg.guild) for (var perm of perms) {
		if (!msg.member.hasPermission(perm))
			lacks.push('``'+perm+'``');
	}
	var lacksStr = lacks.join(', ');

	// Detect if lacks permissions
	if (lacks.length)
		return msg.reply('You lack the following permissions to run this command :  '+lacksStr);

	// Execute command
	try {
		command.exec(UnivBot, msg);
	} catch(e) {
		await msg.send('Oops! An error has occurred while executing this command.');
		msg.send(e, {code:'js'});
	}
}
