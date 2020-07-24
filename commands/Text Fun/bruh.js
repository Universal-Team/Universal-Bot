module.exports = {
	name: 'bruh',
	usage: '<message>',
	desc: 'Replaces all the spaces with a nice bruh',
	DM: true,
	permissions: [],
	exec(UnivBot, msg) {
		if (!msg.args.length)
			return msg.send('no bruh for bruh you');

		msg.send(bruhify(msg.args));
	}
}

function bruhify(text) {
	return 'BRUH ' + text.replace(/[ ]/gm, " bruh ") + ' BRUH';
}
