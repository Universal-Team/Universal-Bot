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
			return msg.reply(`You lack the following permissions to run this command: ${lacksStr}`);

		interaction.prefix = "/";
		interaction.cmd = interaction.commandName;
		interaction.content = "";
		interaction.args = {};
		interaction.options.data.forEach(r => interaction.args[r.name] = r.value);

		command.exec(UnivBot, interaction);
	} else if(interaction.isButton()) { // Button
		interaction.reply(`hi ${interaction.user.username}!`);
	}
}
