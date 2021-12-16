const fetch = require("node-fetch");
const {CommandInteraction} = require("discord.js");

module.exports = {
	name: ["RegisterSlashCommands", "/reload"],
	args: {},
	desc: "Registers all the slash commands",
	DM: true,
	permissions: [ "DEV" ],
	exec(UnivBot, msg) {
		msg.reply("reloading :thumbsup:");

		for(let command of UnivBot.cmds) {
			let cmd = require("../../" + command);
			let options = undefined;
			if(cmd.args) {
				options = []
				for(let item in cmd.args) {
					let arg = cmd.args[item];
					let o = {
						name: (arg.title ?? item).replace(/[ \/]/g, "-"),
						description: arg.hint ?? arg.title ?? item,
						type: (arg.value || item == "value") ? "STRING" : "BOOLEAN",
						required: arg.required == true,
					}
					if(arg.required)
						options.unshift(o);
					else
						options.push(o);
				}
			}

			UnivBot.client.application?.commands.create({
				name: (typeof cmd.name == "string" ? cmd.name : cmd.name[0]).toLowerCase(),
				description: cmd.desc.substr(0, 100),
				options: options
			}).then(r => console.log("registed command", r.name));
		}
	}
}
