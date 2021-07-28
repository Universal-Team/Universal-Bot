const fs = require("fs");
function updateDB(UnivBot) {
	fs.writeFileSync("database.json", JSON.stringify(UnivBot.db, null, "\t"));
}

module.exports = {
	name: ["setprefix", "prefix", "prefix-cfg"],
	usage: "<prefix>",
	desc: "Changes the prefix for commands on the server",
	permissions: [ "ADMINISTRATOR" ],
	exec(UnivBot, msg) {
		if(!msg.args.value)
			return msg.reply("Can't use an empty prefix!");
		var db = UnivBot.db[msg.guild.id];
		db.prefix = msg.args.value;
		updateDB(UnivBot);
		return msg.reply("Sucessfully changed the prefix for the server!");
	}
}
