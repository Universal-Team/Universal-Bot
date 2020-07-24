const projects = [
	{ name: 'BetterDex', color: 0x000080, emoji: '<:BetterDex:630493895859503139>' },
	{ name: 'iDex', color: 0x000080, emoji: '<:iDex:597625862069682176>' },
	{ name: 'LeafEdit', color: 0x04B324, emoji: '<:leafEdit:630495340281462853>' },
	{ name: 'pkmn-chest', color: 0xBF0300, emoji: '<:pkmnchest:613597377625980939>' },
	{ name: 'Project-Athena', color: 0xAEDCDA, emoji: '<:projectathena:635958083172171786>' },
	{ name: 'Relaunch', color: 0x606060, emoji: '<:relaunch:620365238243688467>' },
	{ name: 'Universal-Updater', color: 0x002F50, emoji: '<:universalupdater:641744724549697576>' },
	{ name: '3DEins', color: 0xDCA000, emoji: '<:3deins:726443365184307280>' }
];

projects.embed = function() {
	let description = ['Please rerun the command followed by one of the following project names:\n'];
	this.forEach(object => description.push(`${object.emoji} **${object.name}**`));

	return {
		embed: {
			color: 0x00c882,
			title: 'Invalid project name!',
			description: description.join('\n')
		}
	};
}

// Constructor
function Project(string, data) {
	string = string
			 .replace(/\s/g, '')
			 .replace(/\-/g, '')
			 .toLowerCase();

	if(!string.length) {
		this.invalid = true;
		return this;
	}

	let match;
	let matches = data.filter(object => {
		if(match) {
			this.invalid = true;
			return this;
		}

		let name = object.name.toLowerCase()
				   .replace(/\-/g, '')
				   .replace(/\s/g, '');

		if(name.startsWith(string))
		match = object;

		return name.includes(string);
	});

	if(!match)
		match = matches[0];
	if(!match) {
		this.invalid = true;
		return this;
	}

	this.invalid = false;
	this.name = match.name;
	this.color = match.color;
	this.emoji = match.emoji;

	return this;
}

// Prototypes
Project.prototype.toString = function() {
	if(this.invalid)
		return '**null**';

	return `**${this.name}**`;
}

Project.prototype.github = function() {
	let target = this.name;
	if(!target)
		target = 'null';

	let object = {};
	let io = `https://universal-team.github.io/${target.toLowerCase()}`;
	let url = `https://github.com/Universal-Team/${target}`;
	let raw = `https://raw.githubusercontent.com/Universal-Team/extras/master/builds/${target}`;
	object.cia = {
		file: raw + `/${target}.cia`,
		QR: raw + `/${target}.png`
	};
	object.nightly = {
		file: `https://github.com/Universal-Team/extras/tree/master/builds/${target}`
	};
	object.release = {
		file: url + '/releases/latest'
	};
	object.wiki = url + '/wiki';
	object.site = io;

	return object;
}

module.exports = {
	name: 'release',
	usage: '<project>',
	desc: 'Sends the link to a release of a Universal Team app',
	DM: true,
	permissions: [],
	exec(UnivBot, msg) {
		const app = new Project(msg.args, projects);
		if(app.invalid)
			return msg.send(projects.embed());

		const github = app.github();
		msg.send({
			embed: {
				color: app.color,
				description: `${app.emoji} You can get the latest release of ${app} [here](${github.release.file})`,
			}
		});
	}
}
