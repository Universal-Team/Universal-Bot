const Discord = require('discord.js');
const fs = require('fs');
function isCategory(UnivBot, name) {
	name = name.toLowerCase().trim();
	let ctg;
	if(name.length > 0) {
		for(var category of UnivBot.categories) {
			if(category.toLowerCase().substr(0, name.length) == name) {
				ctg = category;
				break;
			}
		}
	}
	return ctg;
}
function isCommand(UnivBot, name) {
	name = name.toLowerCase().trim();
	let command;
	if(name.length > 0) {
		for(let cmd of UnivBot.cmds) {
			cmd = require("../../" + cmd);
			if((cmd.name instanceof Array)) {
				for(let cmdName of cmd.name) {
					if(cmdName.toLowerCase().substr(0, name.length) == name) {
						command = cmd;
						break;
					}
				}
			} else {
				if(cmd.name.toLowerCase().substr(0, name.length) == name) {
					command = cmd;
					break;
				}
			}
		}
	}
	return command;
}

module.exports = {
	name: [ 'help', 'cmds', 'commands' ],
	usage: '[category]',
	desc: 'Gives info about a the categories, a category, or a command',
	DM: true,
	permissions: [],
	exec(UnivBot, msg) {
		// Detect if a category was given
		let title = 'List of categories';
		let type = 'dir';
		if(isCategory(UnivBot, msg.args.value)) {
			title = 'List of commands';
			type = 'file';
		} else if(isCommand(UnivBot, msg.args.value)) {
			title = 'Command info';
			type = 'cmd';
		}

		// Create embed
		let color = 8557055;
		let image = UnivBot.client.user.avatarURL;
		if(msg.guild)
			image = msg.guild.image;
		if(msg.guild)
			color = msg.guild.bot.displayHexColor;
		let embed = new Discord.MessageEmbed()
			.setColor(color)
			.setDescription('Here you can get info on commands. To see the categories, use ``'+msg.prefix+'help``, to see commands in a category, do ``'+msg.prefix+'help <Category Name>``, or to see info on a command, do ``'+msg.prefix+'help <Command Name>``.')
			.setThumbnail(image)
			.setTitle(title);

		function formatCommand(title, desc) {
			return `**${msg.prefix}${title}** - ${desc}`
		}

		// Add commands/categories to embed
		if(type == 'dir') {
			embed.setFooter('• Amount of categories: '+UnivBot.categories.length, UnivBot.client.user.avatarURL);
			for(var category of UnivBot.categories) {
				var desc = 'No description yet'
				var path = 'commands/'+category+'/desc.txt';
				if(fs.existsSync(path))
					desc = fs.readFileSync(path);
				category += ' ['+fs.readdirSync('commands/'+category).filter(cmd => cmd.endsWith('.js')).length+']';
				embed.addField(category, desc);
			}

			let usefulCommands = [];
			switch(msg.channel.id) {
				case '589882205556310076':
					usefulCommands.push(formatCommand("wiki Universal Updater", "Sends a link to Universal Updater's wiki"))
					usefulCommands.push(formatCommand('cia Universal Updater', 'Sends a QR code for the latest version of Universal Updater'))
					usefulCommands.push(formatCommand('site Universal Updater', "Sends a link to Universal Updater's page on the Universal Team website"))
					usefulCommands.push(formatCommand('nightly Universal Updater', 'Sends a link to a build for the latest nightly version of Universal Updater'))
					usefulCommands.push(formatCommand('release Universal Updater', 'Sends a link to a build for the latest release version of Universal Updater'))
					break;
				case '588780299199184937':
					usefulCommands.push(formatCommand("wiki pkmn-chest", "Sends a link to pkmn-chest's wiki"))
					usefulCommands.push(formatCommand('cia pkmn-chest', 'Sends a QR code for the latest version of pkmn-chest'))
					usefulCommands.push(formatCommand('site pkmn-chest', "Sends a link to pkmn-chest's page on the Universal Team website"))
					usefulCommands.push(formatCommand('nightly pkmn-chest', 'Sends a link to a build for the latest nightly version of pkmn-chest'))
					usefulCommands.push(formatCommand('release pkmn-chest', 'Sends a link to a build for the latest release version of pkmn-chest'))
					break;
				case '610817877276360734':
				case '693691078498451486':
					usefulCommands.push(formatCommand("wiki LeafEdit", "Sends a link to LeafEdit's wiki"))
					usefulCommands.push(formatCommand('cia LeafEdit', 'Sends a QR code for the latest version of LeafEdit'))
					usefulCommands.push(formatCommand('site LeafEdit', "Sends a link to LeafEdit's page on the Universal Team website"))
					usefulCommands.push(formatCommand('nightly LeafEdit', 'Sends a link to a build for the latest nightly version of LeafEdit'))
					usefulCommands.push(formatCommand('release LeafEdit', 'Sends a link to a build for the latest release version of LeafEdit'))
					break;
				case '590552111289466890':
					//usefulCommands.push(formatCommand("wiki relaunch", "Sends a link to relaunch's wiki"))
					//usefulCommands.push(formatCommand('cia relaunch', 'Sends a QR code for the latest version of relaunch'))
					usefulCommands.push(formatCommand('site relaunch', "Sends a link to relaunch's page on the Universal Team website"))
					usefulCommands.push(formatCommand('nightly relaunch', 'Sends a link to a build for the latest nightly version of relaunch'))
					usefulCommands.push(formatCommand('release relaunch', 'Sends a link to a build for the latest release version of relaunch'))
			}

			if(usefulCommands.length)
				embed.addField('Useful Commands', usefulCommands.join('\n'))
		}
		if(type == 'file') {
			var category = isCategory(UnivBot, msg.args.value);
			var commands = fs.readdirSync('commands/'+category).filter(cmd => cmd.endsWith('.js'));
			embed.setFooter('• Amount of commands in '+category+': '+commands.length, UnivBot.client.user.avatarURL);
			for(var command of commands) {
				var desc = require('../../commands/'+category+'/'+command).desc;
				var name = require('../../commands/'+category+'/'+command).name;
				if((name instanceof Array)) {
					var nameStr = name[0];
					nameStr += ' '+require('../../commands/'+category+'/'+command).usage;
					nameStr = msg.prefix+nameStr;
					desc += '\n(Other names: **'+name.slice(1).join('**, **')+'**)'
					embed.addField(nameStr, desc);
				} else {
					name += ' '+require('../../commands/'+category+'/'+command).usage;
					name = msg.prefix+name;
					embed.addField(name, desc);
				}
			}
		}
		if(type == 'cmd') {
			let cmd = isCommand(UnivBot, msg.args.value);
			if((cmd.name instanceof Array)) {
				var nameStr = msg.prefix+cmd.name[0]+' '+cmd.usage;
				cmd.desc += '\n(Other names: **'+cmd.name.slice(1).join('**, **')+'**)'
				embed.addField(nameStr, cmd.desc);
			} else {
				name = msg.prefix+cmd.name+' '+cmd.usage;
				embed.addField(name, cmd.desc);
			}
		}

		msg.send({
			embed: embed
		});
	}
}
