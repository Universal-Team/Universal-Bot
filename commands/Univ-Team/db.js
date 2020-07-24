module.exports = {
	name: ['DB', 'UniversalDB'],
	usage: '<app|description> [--all]',
	desc: 'Search for an application on Universal DB',
	DM: true,
	permissions: [],
	exec(UnivBot, msg) {
		if (msg.args.length == 0)
			return msg.send('**Error:** Please enter a search term');
		

		let query = msg.args.trim().toLowerCase().split(" ");
		let all = query.includes("--all");
		query = query.filter(r => !r.startsWith("--")).join(" ");
		
		require('node-fetch')("https://db.universal-team.net/data/full.json", {"method": "Get"}).then(r => r.json()).then(json => {
			let out = [];
			// Search titles
			json.some(app => {
				if(app.title && app.title.toLowerCase().includes(query)) {
					out.push(app);
					return !all;
				}
			});

			if(out.length == 0 || all) {
				// Search descriptions
				json.some(app => {
					if(app.description && app.description.toLowerCase().includes(query)) {
						if(!out.includes(app))
							out.push(app);
						return !all;
					}
				});
			}

			for(let res of out) {
				for(let i = 1; i < res.systems.length; i++)
					 res.description += "\n[Also on " + res.systems[i] + "](https://db.universal-team.net/" + res.systems[i].toLowerCase() + "/" + Array.from(res.title.toLowerCase().replace(/ /g, "-")).filter(r => "abcdefghijklmnopqrstuvwxyz0123456789-_.".includes(r)).join("") + ")";

				let embed = {"embed": {
					"title": res.title,
					"url": "https://db.universal-team.net/" + res.systems[0].toLowerCase() + "/" + Array.from(res.title.toLowerCase().replace(/ /g, "-")).filter(r => "abcdefghijklmnopqrstuvwxyz0123456789-_.".includes(r)).join(""),
					"thumbnail": {
						"url": res.image || res.icon
					},
					"description": res.description,
					"fields": [],
					"image": {},
					"footer": {
						"icon_url": res.icon || res.image,
						"text": res.author ? "By: " + res.author: ""
					}
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
			}

			if(out.length == 0) {
				msg.send("No results found!");
			}
		});
	}
}
