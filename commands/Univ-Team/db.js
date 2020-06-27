module.exports = {
	name: ['DB', 'UniversalDB'],
	usage: '<app|description>',
	desc: 'Search for an application on Universal DB',
	DM: true,
	permissions: [],
	exec(UnivBot, msg) {
		if (msg.args.length == 0)
			return msg.send('**Error:** Please enter a search term');

		let query = msg.args.trim().toLowerCase();

		
		require('node-fetch')("https://db.universal-team.net/data/full.json", {"method": "Get"}).then(r => r.json()).then(json => {
			let res;
			// Search titles
			json.some(app => {
				if(app.title && app.title.toLowerCase().includes(query)) {
					res = app;
					return true;
				}
			});

			if(!res) {
				// Search descriptions
				json.some(app => {
					if(app.description && app.description.toLowerCase().includes(query)) {
						res = app;
						return true;
					}
				});
			}

			if(res) {
				let embed = {"embed": {
					"title": res.title,
					"url": "https://db.universal-team.net/" + res.system.toLowerCase() + "/" + Array.from(res.title.toLowerCase().replace(/ /g, "-")).filter(r => "abcdefghijklmnopqrstuvwxyz0123456789-_.".includes(r)).join(""),
					"thumbnail": {
						"url": res.image || res.icon
					},
					"description": res.description,
					"fields": [],
					"image": {}
				}};
				for(let item in res.downloads) {
					embed.embed.fields.push({
						"inline": true,
						"name": item,
						"value": "[Download " + item + "](" + res.downloads[item] + ")"
					});
				}

				for(let item in res.qr) {
					embed.embed.image.url = res.qr[item];
				}

				msg.send(embed);
			} else {
				msg.send("No results found!");
			}
		});
	}
}
