module.exports = async function(UnivBot, interaction) {
	console.log(interaction);

	if(interaction.isCommand()) { // Slash Command
		interaction.reply(".o/");
	} else if(interaction.isButton()) { // Button
		interaction.reply("hi!");
	}
}
