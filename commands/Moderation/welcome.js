const fs = require('fs');
function updateDB(UnivBot) {
	fs.writeFileSync('database.json', JSON.stringify(UnivBot.db, null, '\t'));
}
function makeJSON(obj) {
	obj = JSON.parse(JSON.stringify(obj));
	const object = {
		Message: obj.string,
		ChannelID: (obj.channel == 'sys' ? 'System Channel': obj.channel),
		MessageEnabled: obj.enabled
	};
	return '\n__**Welcome Message Config:**__```json\n'+JSON.stringify(object, null, 4)+'\n```';
}

module.exports = {
	name: ['welcome', 'welcome-message', 'welcome-cfg'],
	usage: '<-__d__isable|-__e__nable|--__c__hannel|-__m__essage message>',
	desc: 'Configures the welcome messages',
	permissions: [ 'ADMINISTRATOR' ],
	exec(UnivBot, msg) {
		// Setup vars
		var db = UnivBot.db[msg.guild.id];
		var err1 = '**Error:** Can\'t use an empty message for the welcome messages';
		var err2 = '**Error:** Cant find that channel'
		var err3 = `__**Invalid option! Follow one of those examples:**__

This disables the welcome messages
\`${msg.prefix}welcome -disable\`

This enables the welcome messages
\`${msg.prefix}welcome -enable\`

This selects a channel for the messages.
You can type "default" for use the system channel
\`${msg.prefix}welcome --channel #channel-name\`

This is the welcome message itself. You can
include those 'variables' in the text:
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

		// Check for enable and disable
		if(msg.args.enable || msg.args.e) {
			db.messages.welcome.enabled = true;
			updateDB(UnivBot);
			return msg.send('Enabled welcome messages'+makeJSON(db.messages.welcome));
		} else if(msg.args.disable || msg.args.d) {
			db.messages.welcome.enabled = false;
			updateDB(UnivBot);
			return msg.send('Disabled welcome messages'+makeJSON(db.messages.welcome));
		}
		if(typeof(msg.args.c) == 'string')
			msg.args.channel = msg.args.c;
		if(typeof(msg.args.channel) == 'string') {
			if(msg.args.channel.toLowerCase() == 'default') {
				db.messages.welcome.channel = 'sys';
				updateDB(UnivBot);
				return msg.send('Sucessfully changed the welcome channel to the system channel'+makeJSON(db.messages.welcome));
			}
			var ID = msg.args.channel.substring(2, msg.args.channel.length - 1);
			var channel = msg.guild.channels.cache.get(ID);
			if(!channel)
				return msg.send(err2);
			db.messages.welcome.channel = ID;
			updateDB(UnivBot);
			return msg.send('Sucessfully changed the welcome channel to **<#'+ID+'>**'+makeJSON(db.messages.welcome));
		}
		if(msg.args.message || msg.args.m) {
			if(!msg.args.value)
				return msg.send(err1);
			db.messages.welcome.string = msg.args.value;
			updateDB(UnivBot);
			return msg.send('Sucessfully changed the welcome message'+makeJSON(db.messages.welcome));
		}

		// Send list of options
		return msg.send(err3);
	}
}
