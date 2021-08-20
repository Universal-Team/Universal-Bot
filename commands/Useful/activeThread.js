module.exports = {
	name: "activeThread",
	usage: "<comma-separated-thread-mentions>",
	desc: "Makes threads never archive",
	permissions: [],
	async exec(UnivBot, msg) {
		const db = UnivBot.db[msg.guild.id];
		if(!db.activeThreads)
			db.activeThreads = [];

		let threads = msg.args.value.split(",");
		if(threads[0] == "")
			return msg.reply(`__**The following threads are being kept active:**__\n<#${db.activeThreads.join(">\n<#")}>`);

		let added = [], removed = [];

		console.log(threads);
		for(let thread of threads) {
			console.log(thread);
			let id = thread.match(/[0-9]+/)?.[0];
			console.log(id);
			if(db.activeThreads.includes(id)) {
				db.activeThreads = db.activeThreads.filter(r => r != id);
				removed.push(id);
			} else {
				db.activeThreads.push(id);
				added.push(id);

				msg.guild.channels.fetch(id).then(r => r.setArchived(false));
			}
		}

		console.log(added, removed);

		let out = "";
		if(added.length > 0)
			out += `__**The following threads will be kept active:**__\n<#${added.join(">\n<#")}>\n\n`;
		if(removed.length > 0)
			out += `__**The following threads will no longer be kept active:**__\n<#${removed.join(">\n<#")}>\n\n`;

		msg.reply(out);
	}
}

