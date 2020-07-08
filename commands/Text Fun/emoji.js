module.exports = {
	name: 'emoji',
	usage: '[-a] <id>',
	desc: 'Sends any Discord emoji with it\'s ID',
	DM: true,
	permissions: [],
	exec(UnivBot, msg) {
		var args = msg.args.split(' ');
		var id = args[0];
		var animated = false;
		for(var arg of args) {
			if(arg.trim() == '-a') animated = true;
			else id = arg;
		}

		if(animated) return msg.send('<a\:emoji:'+id+'>');
		else return msg.send('<\:emoji:'+id+'>');
	}
}
