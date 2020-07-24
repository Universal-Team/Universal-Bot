module.exports = {
	name: 'reload',
	usage: '<command>',
	desc: 'Reloads a command',
	DM: true,
	permissions: [ 'DEV' ],
	exec(UnivBot, msg) {
		if(!msg.args.length)
			return msg.send('**Oops!** You didn\'t provided enough arguments');

		let command;
		for(var path of UnivBot.cmds) {
			path = "../../" + path;
			let cmd = require(path);
			let name = cmd.name;

			if((name instanceof Array)) {
				let matches = false;
				for(var i = 0; i < name.length; i++)
					if(name[i].toLowerCase() == msg.args.toLowerCase()) {
						matches = true;
						break;
					}
				if(matches) {
					command = path;
					break;
				}
				name = name.join('/');
			}
			if(name.toLowerCase() == msg.args) {
				command = path;
				break;
			}
		}

		if(command) {
			delete require.cache[require.resolve(command)]
			msg.send('Successfully reloaded the '+msg.args+' command');
		} else {
			msg.send('Couldnt find that command!');
		}
	}
}
