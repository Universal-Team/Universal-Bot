function parseBytes(bytes) {
	if(typeof(bytes) != "number")
		bytes = parseInt(bytes);

	if(bytes == 1)
		return `${bytes} Byte`;
	else if(bytes < (1 << 10))
		return `${bytes} Bytes`;
	else if(bytes < (1 << 20))
		return `${Math.round(bytes / (1 << 10))} KiB`;
	else if(bytes < (1 << 30))
		return `${Math.round(bytes / (1 << 20))} MiB`;
	else
		return `${Math.round(bytes / (1 << 30))} GiB`;
}

module.exports = {
	name: ["DB", "UniversalDB"],
	usage: "[-__a__ll|-__r__andom|-__s__earch] <app|description>",
	desc: "Search for an application on Universal DB",
	DM: true,
	permissions: [],
	exec(UnivBot, msg) {
		let query = msg.args.value;
		
		require("node-fetch")("https://db.universal-team.net/data/full.json", {method: "Get"}).then(r => r.json()).then(json => {
			if(msg.args.random || msg.args.r)
				query = json[Math.floor(Math.random() * json.length)].title;

			if(!query)
				return msg.reply("**Error:** Please enter a search term");

			let regex = new RegExp(query.regexEscape().replace(/\\?./g, "$&.*").replace(/\\-|_| /g, "[-_ ]"), "gi");

			let out = [];
			// Search titles
			json.some(app => {
				if(app.title?.match(regex)) {
					out.push(app);
					return !(msg.args.search || msg.args.s);
				}
			});

			if(out.length == 0 || msg.args.search || msg.args.s) {
				// Search descriptions
				json.some(app => {
					if(app.description?.toLowerCase().includes(query.toLowerCase())) {
						if(!out.includes(app))
							out.push(app);
						return !(msg.args.search || msg.args.s);
					}
				});
			}

			if(out.length == 0 || msg.args.search || msg.args.s) {
				// Search authors
				json.some(app => {
					if(app.author?.toLowerCase().includes(query.toLowerCase())) {
						if(!out.includes(app))
							out.push(app);
						return !(msg.args.search || msg.args.s);
					}
				});
			}

			if(msg.args.search || msg.args.s) {
				let embed = {
					"title": "Results",
					"fields": []
				};

				if(out.length == 0)
					embed.description = "No results found"
				else out.sort((a, b) => {
					if(a.title < b.title)
						return -1;
					else if(a.title > b.title)
						return 1;
					else return 0;
				}).forEach(r => {
					// Add underlining to title
					if(r.title.match(regex)) {
						for(let i = 0, c = 0; i < r.title.length && c < query.length; i++) {
							if(r.title[i].match(new RegExp(query[c].regexEscape().replace(/[-_ ]/, "[-_ ]"), "gi"))) {
								c++;
								let j = i + 1;
								while(j < r.title.length && c < query.length && r.title[j].match(new RegExp(query[c].regexEscape().replace(/[-_ ]/, "[-_ ]"), "gi"))) j++, c++;
								r.title = `${r.title.substring(0, i)}__${r.title.substring(i, j)}__${r.title.substring(j)}`;
								i = j + 3;
							}
						}
					}

					embed.fields.push({
						name: `${r.title} by ${r.author.caseReplaceAll(query, `__${query}__`)}`,
						value: r.description ? r.description.caseReplaceAll(query, `__${query}__`) : "---",
					});
				});

				return msg.reply({embeds: [embed]});
			}

			out.forEach(res => {
				for(let i = 1; i < res.systems.length; i++)
					res.description += `\n[Also on ${res.systems[i]}](https://db.universal-team.net/${res.systems[i].toLowerCase()}/${Array.from(res.title.toLowerCase().replace(/ /g, "-")).filter(r => "abcdefghijklmnopqrstuvwxyz0123456789-_.".includes(r)).join("")})`;

				if(res.version) {
					res.description += `\n**Version**: ${res.version}`;
					if(res.version_title)
						res.description += `, ${res.version_title}`;
				}

				if(res.license)
					res.description += `\n**License**: ${res.license_name}`;

				let embed = {embeds: [{
					title: res.title,
					url: `https://db.universal-team.net/${res.systems[0].toLowerCase()}/${Array.from(res.title.toLowerCase().replace(/ /g, "-")).filter(r => "abcdefghijklmnopqrstuvwxyz0123456789-_.".includes(r)).join("")}`,
					thumbnail: {
						url: res.image || res.icon
					},
					description: res.description,
					fields: [],
					image: {},
					footer: {
						icon_url: res.avatar || res.icon || res.image,
						text: res.author ? `By: ${res.author}` : ""
					},
					color: res.color ? parseInt(res.color.substr(1), 16) : 0x072f4f,
					timestamp: res.updated
				}]};
				for(let item in res.downloads) {
					embed.embeds[0].fields.push({
						inline: true,
						name: item,
						value: `[Download](${res.downloads[item].url})${res.downloads[item].size ? ` (${parseBytes(res.downloads[item].size)})` : ""}`
					});
				}

				for(let item in res.qr) {
					// The "?version=xxx" does literally nothing except ensure that the URL
					// is different to prevent Discord using an outdated one from cache
					embed.embeds[0].image.url = `${res.qr[item]}?version=${res.version}`;
				}

				msg.reply(embed);
			});

			if(out.length == 0) {
				msg.reply("No results found!");
			}
		});
	}
}
