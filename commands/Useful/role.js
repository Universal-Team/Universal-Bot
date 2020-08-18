function findRole(msg, name) {
	if(name) {
		return msg.guild.roles.cache.sort((a, b) => (a.length < b.length) ? -1 : 1).find(r => r.editable && r.name.toLowerCase().includes(name.toLowerCase()));
	}
}

function hasRole(member, id) {
	if(member.roles.cache.get(id)) {
		return true;
	} else {
		return false;
	}
}

module.exports = {
	name: 'role',
	usage: '[-__a__ll] <role names, comma separated>',
	desc: 'Adds/removes roles. Sends a list if no roles given',
	permissions: [],
	async exec(UnivBot, msg) {
		//Setup vars
		let str1 = '\n\n__**The following roles were added:**__';
		let str1len = str1.length;
		let str2 = '\n\n__**The following roles were removed:**__';
		let str2len = str2.length;
		let str3 = '\n\n__**The following roles can\'t be added/removed:**__';
		let str3len = str3.length;

		// Split the roles
		var roles = msg.args.value.toLowerCase().split(',');

		// Detect empty roles
		if(roles.includes('')) {
			let possibleAdd = [];
			let possibleRemove = [];

			for(let i = 1; i < msg.guild.roles.cache.size; i++) {
				if(msg.guild.roles.cache.find(r => r.position == i).editable) {
					if(hasRole(msg.member, msg.guild.roles.cache.find(r => r.position == i).id)) {
						possibleRemove.push(msg.guild.roles.cache.find(r => r.position == i).name);
					} else {
						possibleAdd.push(msg.guild.roles.cache.find(r => r.position == i).name);
					}
				}
			}

			let possibleRoles = [];
			if(possibleAdd.length > 0) {
				possibleAdd.sort();
				possibleRoles.push('__**The following roles can be added:**__');
				possibleRoles = possibleRoles.concat(possibleAdd);
			}
			if(possibleRemove.length > 0) {
				if(possibleRoles.length > 0) possibleRoles.push(''); // For a newline

				possibleRemove.sort();
				possibleRoles.push('__**The following roles can be removed:**__');
				possibleRoles = possibleRoles.concat(possibleRemove);
			}
			msg.send(possibleRoles.join('\n'));
			return;

		}

		let addRoles = [];
		let removeRoles = [];

		if(msg.args.all || msg.args.a) {
			for(let i = 1; i < msg.guild.roles.cache.size; i++) {
				if(msg.guild.roles.cache.find(r => r.position == i).editable) {
					let role = msg.guild.roles.cache.find(r => r.position == i);
					if(!hasRole(msg.member, role.id)) {
						addRoles.push(role.id);
						str1 += '\n'+role.name;
					} else {
						removeRoles.push(role.id);
						str2 += '\n'+role.name;
					}
				}
			}
		} else for(var roleName of roles) {
			// Prevent @everyone from being found
			var role = findRole(msg, roleName.trim());
			if(role && (role.id == msg.guild.id)) //the id of the @everyone role is the same id of the guild/server
				role = undefined; //if this executes then it means the role was @everyone and it deletes it

			// Add/remove role
			if(role) {
				if(!hasRole(msg.member, role.id)) {
					addRoles.push(role.id);
					str1 += '\n'+role.name;
				} else {
					removeRoles.push(role.id);
					str2 += '\n'+role.name;
				}
			} else
				str3 += '\n'+roleName.trim(); // here role.name can't be used because if this else runs is because the role wans't found
		}
		
		if(addRoles.length)
			await msg.member.roles.add(addRoles);

		if(removeRoles.length)
			await msg.member.roles.remove(removeRoles);

		let str4 = ''
		if(str1.length !== str1len)
			str4 += str1;
		if(str2.length !== str2len)
			str4 += str2;
		if(str3.length !== str3len)
			str4 += str3;
		msg.send(str4);
	}
}

