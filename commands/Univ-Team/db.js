module.exports = {
	name: ['DB', 'UniversalDB'],
	usage: '[-__a__ll|-__r__andom|-__s__earch] <app|description>',
	desc: 'Search for an application on Universal DB',
	DM: true,
	permissions: [],
	exec(UnivBot, msg) {
		let query = msg.args.value;
		
		require('node-fetch')("https://db.universal-team.net/data/full.json", {"method": "Get"}).then(r => r.json()).then(json => {
			if(msg.args.random || msg.args.r)
				query = json[Math.floor(Math.random() * json.length)].title;

			if(!query)
				return msg.send('**Error:** Please enter a search term');

			let out = [];
			// Search titles
			json.some(app => {
				if(app.title && app.title.toLowerCase().includes(query.toLowerCase())) {
					out.push(app);
					return !(msg.args.all || msg.args.a || msg.args.search || msg.args.s);
				}
			});

			if(out.length == 0 || msg.args.all || msg.args.a || msg.args.search || msg.args.s) {
				// Search descriptions
				json.some(app => {
					if(app.description && app.description.toLowerCase().includes(query.toLowerCase())) {
						if(!out.includes(app))
							out.push(app);
						return !(msg.args.all || msg.args.a);
					}
				});
			}

			if(msg.args.search || msg.args.s) {
				let embed = {"embed": {
					"title": 'Results',
					"fields": []
				}};

				if(out.length == 0)
					embed.embed.description = "No results found"
				else out.sort((a, b) => {
					if(a.title < b.title)
						return -1;
					else if(a.title > b.title)
						return 1;
					else return 0;
				}).forEach(r => {
					embed.embed.fields.push({
						"name": r.title.replace(new RegExp(query, "gi"), "__" + query + "__"),
						"value": r.description ? r.description.replace(new RegExp(query, "gi"), "__" + query + "__") : "---",
					});
				});

				return msg.send("", embed);
			}

			out.forEach(res => {
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
			});

			if(out.length == 0) {
				msg.send("No results found!");
			}
		});
	}
}
