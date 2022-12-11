module.exports = {
	name: "role",
	args: {
		add: {
			letter: "a"
		},
		remove: {
			letter: "r"
		},
		value: {
			title: "comma separated role names"
		}
	},
	desc: "Toggles roles, sends a list if no roles given. Use -__a__dd and -__r__emove to choose which roles are toggleable.",
	permissions: [],
	async exec(UnivBot, msg) {
		const db = UnivBot.db[msg.guild.id];
		if(!db.toggleableRoles)
			db.toggleableRoles = {};

		// Add role to toggleable list
		if(msg.args.add) {
			if(await msg.guild.members.fetch(msg.author).then(r => r.permissions.has("MANAGE_ROLES"))) {
				let out = "__**The following roles have been made toggleable:**__\n";
				msg.args.value.toLowerCase().split(",").forEach(r => {
					let role = msg.guild.roles.cache.sort((a, b) => (a.length < b.length) ? -1 : 1).find(role => role.editable && role.name.toLowerCase().includes(r.trim().toLowerCase()));
					if(role && !(role.id in db.toggleableRoles)) {
						db.toggleableRoles[role.id] = {
							"name": role.name
						};
						out += role.name + "\n";
					}
				});
				return msg.reply(out);
			} else {
				return msg.reply("You must have the MANAGE_ROLES permission to manage toggleable roles!");
			}
		}

		// Remove role to toggleable list
		if(msg.args.remove) {
			if(await msg.guild.members.fetch(msg.author).then(r => r.permissions.has("MANAGE_ROLES"))) {
				let out = "__**The following roles have been made untoggleable:**__\n";
				msg.args.value.toLowerCase().split(",").forEach(r => {
					let role = Object.entries(db.toggleableRoles).sort((a, b) => (a.length < b.length) ? -1 : 1).find(role => role[1].name.toLowerCase().includes(r.trim().toLowerCase()));
					if(role) {
						delete db.toggleableRoles[role[0]];
						out += role[1].name + "\n";
					}
				});
				return msg.reply(out);
			} else {
				return msg.reply("You must have the MANAGE_ROLES permission to manage toggleable roles!");
			}
		}

		// Send lists if no roles requested
		if(!msg.args.value) {
			let possibleAdd = Object.keys(db.toggleableRoles).filter(r => !msg.member.roles.cache.has(r));
			let possibleRemove = Object.keys(db.toggleableRoles).filter(r => msg.member.roles.cache.has(r));

			let out = "";
			if(possibleAdd.length) {
				out += "\n\n__**The following roles can be added:**__";
				possibleAdd.forEach(id => out += `\n${db.toggleableRoles[id].name}`);
			}
			if(possibleRemove.length) {
				out += "\n\n__**The following roles can be removed:**__";
				possibleRemove.forEach(id => out += `\n${db.toggleableRoles[id].name}`);
			}
			return msg.reply(out != "" ? out : "No roles can be toggled in this server.");
		}

		let addRoles = [];
		let removeRoles = [];
		let notRoles = [];

		msg.args.value.toLowerCase().split(",").forEach(r => {
			let role = Object.keys(db.toggleableRoles).find(role => db.toggleableRoles[role].name.toLowerCase().includes(r.trim().toLowerCase()));
			if(role) {
				(msg.member.roles.cache.has(role) ? removeRoles : addRoles).push(role);
			} else {
				notRoles.push(r);
			}
		});

		if(addRoles.length)
			await msg.member.roles.add(addRoles);

		if(removeRoles.length)
			await msg.member.roles.remove(removeRoles);

		let out = "";
		if(addRoles.length) {
			out += "\n\n__**The following roles have been added:**__";
			addRoles.forEach(r => out += `\n${db.toggleableRoles[r].name}`);
		}
		if(removeRoles.length) {
			out += "\n\n__**The following roles have been removed:**__";
			removeRoles.forEach(r => out += `\n${db.toggleableRoles[r].name}`);
		}
		if(notRoles.length) {
			out += "\n\n__**The following roles can't be added/removed:**__\n";
			out += notRoles.join("\n");
		}
		msg.reply(out);
	}
}

