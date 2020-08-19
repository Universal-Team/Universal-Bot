function findRole(msg, name) {
	msg.guild.roles.cache.sort((a, b) => (a.length < b.length) ? -1 : 1).find(r => r.editable && r.name.toLowerCase().includes("role1".toLowerCase()));
	return msg.guild.roles.cache.sort((a, b) => (a.length < b.length) ? -1 : 1).find(r => r.editable && r.name.toLowerCase().includes(name.toLowerCase()));
}

module.exports = {
	name: 'role',
	usage: '[-__a__ll] <role names, comma separated>',
	desc: 'Adds/removes roles. Sends a list if no roles given',
	permissions: [],
	async exec(UnivBot, msg) {
		// Send lists if no roles requested
		if(!(msg.args.value || msg.args.all || msg.args.a)) {
			let possibleAdd = msg.guild.roles.cache.filter(r => r.editable && r.id != msg.guild.id && !msg.member.roles.cache.has(r.id));
			let possibleRemove = msg.guild.roles.cache.filter(r => r.editable && r.id != msg.guild.id && msg.member.roles.cache.has(r.id));

			let out = "";
			if(possibleAdd.size) {
				out += "\n\n__**The following roles can be added:**__";
				possibleAdd.forEach(r => out += "\n" + r.name);
			}
			if(possibleRemove.size) {
				out += "\n\n__**The following roles can be removed:**__";
				possibleRemove.forEach(r => out += "\n" + r.name);
			}
			return msg.send(out);
		}

		let addRoles = [];
		let removeRoles = [];
		let notRoles = [];

		if(msg.args.all || msg.args.a) {
			msg.guild.roles.cache.filter(r => r.editable && r.id != msg.guild.id && msg.member.roles.cache.has(r.id)).forEach(r => removeRoles.push(r));
			msg.guild.roles.cache.filter(r => r.editable && r.id != msg.guild.id && !msg.member.roles.cache.has(r.id)).forEach(r => addRoles.push(r));
		} else {
			msg.args.value.toLowerCase().split(',').forEach(r => {
				let role = findRole(msg, r.trim());
				if(role && role.editable && role.id != msg.guild.id) {
					(msg.member.roles.cache.has(role.id) ? removeRoles : addRoles).push(role);
				} else {
					notRoles.push(r);
				}
			});
		}

		if(addRoles.length)
			await msg.member.roles.add(addRoles);

		if(removeRoles.length)
			await msg.member.roles.remove(removeRoles);

		let out = "";
		if(addRoles.length) {
			out += "\n\n__**The following roles have been added:**__";
			addRoles.forEach(r => out += "\n" + r.name);
		}
		if(removeRoles.length) {
			out += "\n\n__**The following roles have been removed:**__";
			removeRoles.forEach(r => out += "\n" + r.name);
		}
		if(notRoles.length) {
			out += "\n\n__**The following roles can't be added/removed:**__\n";
			out += notRoles.join("\n");
		}
		msg.send(out);
	}
}

