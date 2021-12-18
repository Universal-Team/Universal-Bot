const {Formatters} = require("discord.js");

module.exports = async function(UnivBot, interaction) {
	if(interaction.isCommand()) { // Slash Command
		let command;
		for(var cmd of UnivBot.cmds) {
			cmd = require(`../${cmd}`);
			if((typeof cmd.name == "string" && cmd.name.toLowerCase() == interaction.commandName) || (cmd.name instanceof Array) && cmd.name.filter(name => name.toLowerCase() == interaction.commandName).length) {
				command = cmd;
				break;
			}
		}
		if(!command)
			return interaction.reply("Invalid command!");

		console.log((new Date()).toLocaleString(), interaction.user.username, command.name);

		// Checks for dev perms
		interaction.dev = UnivBot.db.developers.includes(interaction.user.id);

		let lacks = [];
		if(command.permissions.includes("DEV") && !interaction.dev)
			lacks.push("``BOT_DEVELOPER``");
			var perms = command.permissions.filter(perm => perm !== "DEV");
		if(!interaction.guild && perms.length)
			return interaction.reply("You can't use this command on DM!");
		if(interaction.guild) for(var perm of perms) {
			if(!interaction.member.permissions.has(perm))
				lacks.push(`\`\`${perm}\`\``);
		}
		var lacksStr = lacks.join(", ");

		// Detect if lacks permissions
		if(lacks.length)
			return interaction.reply(`You lack the following permissions to run this command: ${lacksStr}`);

		interaction.prefix = "/";
		interaction.cmd = interaction.commandName;
		interaction.content = "";
		interaction.args = {value: ""};
		interaction.options.data.forEach(r => interaction.args[cmd.args.value?.title == r.name ? "value" : r.name] = r.value);

		// Handle DM messages
		let db = { prefix: "" };
		if(interaction.guild)
			db = UnivBot.db[interaction.guild.id];

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

			if(!(interaction.member.id in db.userStats))
				db.userStats[interaction.member.id] = 0;
			db.userStats[interaction.member.id]++;
		}

		// Execute command
		try {
			command.exec(UnivBot, interaction);
		} catch(e) {
			interaction.reply(`Oops! An error has occurred while executing this command. ${Formatters.codeBlock("js", e)}`);
		}
	} else if(interaction.isButton()) { // Button
		interaction.reply(`hi ${interaction.user.username}!`);
	}
}
