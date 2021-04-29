const fs = require("fs");
function updateDB(UnivBot) {
	fs.writeFileSync("database.json", JSON.stringify(UnivBot.db, null, "\t"));
}
function makeJSON(obj) {
	obj = JSON.parse(JSON.stringify(obj));
	var object = {};
	object.Message = obj.string;
	object.ChannelID = obj.channel;
	if(object.ChannelID == "sys")
		object.ChannelID = "System Channel";
	object.MessagesEnabled = obj.enabled;
	return `\n__**Goodbye Message Config: **__\`\`\`json\n${JSON.stringify(object, null, 4)}\n\`\`\``;
}

module.exports = {
	name: ["goodbye", "goodbye-message", "goodbye-cfg"],
	usage: "<-__d__isable|-__e__nable|--__c__hannel|-__m__essage message>",
	desc: "Configures the goodbye messages",
	permissions: [ "ADMINISTRATOR" ],
	exec(UnivBot, msg) {
		// Setup vars
		var db = UnivBot.db[msg.guild.id];
		var err1 = "**Error:** Can't use an empty message for the goodbye messages";
		var err2 = "**Error:** Cant find that channel"
		var err3 = `__**Invalid option! Follow one of these examples:**__

This disables the goodbye messages
\`${msg.prefix}goodbye -disable\`

This enables the goodbye messages
\`${msg.prefix}goodbye -enable\`

This selects a channel for the messages.
You can type "default" for use the system channel
\`${msg.prefix}goodbye --channel #channel-name\`

This is the goodbye message itself. You can
include those 'variables' in the text:
\`\`\`js
List of variables

\${user.id} ID of the user that left
\${user.ping} Ping to the user that left
\${user.tag} Tag of the user that left
\${user.name} Username of the user that left
\${guild.name} Name of the server
\${guild.id} ID of the server
\${guild.amount} Amount of users in the server\`\`\`
\`${msg.prefix}goodbye --message <Text for goodbye message>\``

		// Check for enable and disable
		if(msg.args.enable || msg.args.e) {
			db.messages.goodbye.enabled = true;
			updateDB(UnivBot);
			return msg.send(`Enabled goodbye messages ${makeJSON(db.messages.goodbye)}`);
		}
		if(msg.args.disable || msg.args.d) {
			db.messages.goodbye.enabled = false;
			updateDB(UnivBot);
			return msg.send(`Disabled goodbye messages ${makeJSON(db.messages.goodbye)}`);
		}

		// Check for channel
		if(typeof(msg.args.c) == "string")
			msg.args.channel = msg.args.c;
		if(typeof(msg.args.channel) == "string") {
			if(msg.args.channel.toLowerCase() == "default") {
				db.messages.goodbye.channel = "sys";
				updateDB(UnivBot);
				return msg.send(`Sucessfully changed the goodbye channel to the system channel ${makeJSON(db.messages.goodbye)}`);
			}
			var ID = msg.args.channel.substring(2, msg.args.channel.length - 1);
			var channel = msg.guild.channels.cache.get(ID);
			if(!channel)
				return msg.send(err2);
			db.messages.goodbye.channel = ID;
			updateDB(UnivBot);
			return msg.send(`Sucessfully changed the goodbye channel to **<#${ID}>** ${makeJSON(db.messages.goodbye)}`);
		}

		// Check for message
		if(msg.args.message || msg.args.m) {
			if(!msg.args.value)
				return msg.send(err1);
			db.messages.goodbye.string = msg.args.value;
			updateDB(UnivBot);
			return msg.send(`Sucessfully changed the goodbye message ${makeJSON(db.messages.goodbye)}`);
		}

		// Send list of options
		return msg.send(err3);
	}
}
