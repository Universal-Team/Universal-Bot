const fs = require('fs');
function updateDB(UnivBot) {
	fs.writeFileSync('database.json', JSON.stringify(UnivBot.db, null, '\t'));
}
function makeJSON(obj) {
	obj = JSON.parse(JSON.stringify(obj));
	const object = {
		Message: obj.string,
		ChannelID: (obj.channel == 'sys' ? 'System Channel' : obj.channel),
		MessageEnabled: obj.enabled
	};
	return '\n__**Welcome Message Config :**__```json\n'+JSON.stringify(object, null, 4)+'\n```';
}

module.exports = {
	name: ['welcome', 'welcome-message', 'welcome-cfg'],
	usage: '',
	desc: 'Configures the welcome messages',
	permissions: [ 'ADMINISTRATOR' ],
	exec(UnivBot, msg) {
		// Setup vars
		var db = UnivBot.db[msg.guild.id];
		var err1 = '**Error :** Can\'t use an empty message for the welcome messages';
		var err2 = '**Error :** Cant find that channel'
		var err3 = `__**Invalid option! Follow one of those examples :**__

This disables the welcome messages
\`${msg.prefix}welcome --disable\`

This enables the welcome messages
\`${msg.prefix}welcome --enable\`

This selects a channel for the messages.
You can type "default" for use the system channel
\`${msg.prefix}welcome --channel #channel-name\`

This is the welcome message itself. You can
include those 'variables' in the text :
\`\`\`js
\`List of variables

\${user.id} ID of the user that joined
\${user.ping} Ping to the user that joined
\${user.tag} Tag of the user that joined
\${user.name} Username of the user that joined
\${guild.name} Name of the server
\${guild.id} ID of the server
\${guild.amount} Amount of users in the server\`\`\`
\`${msg.prefix}welcome --message <Text for welcome message>\``

		// Get option and args
		var option = msg.args.split(' ')[0].toLowerCase();
		var arg = msg.args.split(' ').slice(1).join(' ').trim();

		// Check for enable and disable
		switch (option) {
			case '--enable':
				db.messages.welcome.enabled = true;
				updateDB(UnivBot);
				return msg.send('Enabled welcome messages'+makeJSON(db.messages.welcome));
				break;
			case '--disable':
				db.messages.welcome.enabled = false;
				updateDB(UnivBot);
				return msg.send('Disabled welcome messages'+makeJSON(db.messages.welcome));
				break;
			case '--channel':
				if (arg.toLowerCase() == 'default') {
					db.messages.welcome.channel = 'sys';
					updateDB(UnivBot);
					return msg.send('Sucessfully changed the welcome channel to the system channel'+makeJSON(db.messages.welcome));
				}
				var ID = arg.substr(0, arg.length-1).substr(2);
				var channel = msg.guild.channels.cache.get(ID);
				if (!channel)
					return msg.send(err2);
				db.messages.welcome.channel = ID;
				updateDB(UnivBot);
				return msg.send('Sucessfully changed the welcome channel to **<#'+ID+'>**'+makeJSON(db.messages.welcome));
				break;
			case '--message':
				if (!arg.length)
					return msg.send(err1);
				db.messages.welcome.string = arg;
				updateDB(UnivBot);
				return msg.send('Sucessfully changed the welcome message'+makeJSON(db.messages.welcome));
				break;
		}

		// Send list of options
		return msg.send(err3);
	}
}
