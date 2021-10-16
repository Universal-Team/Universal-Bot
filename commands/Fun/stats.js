module.exports = {
	name: ["stats", "statistics"],
	usage: "[-__d__isable] [-__e__nable]",
	desc: "Shows command usage stats for this server",
	DM: true,
	permissions: [],
	async exec(UnivBot, msg) {
		const db = UnivBot.db[msg.guild.id];

		if(msg.args.enable || msg.args.e) {
			if(await msg.guild.members.fetch(msg.author).then(r => r.permissions.has("ADMINISTRATOR"))) {
				if(!db.statsDisabled) {
					return msg.reply("stats are already enabled...");
				} else {
					db.statsDisabled = false;
					return msg.reply("Enabled stats :thumbsup:");
				}
			} else {
				return msg.reply("You must have ADMINISTRATOR permission to enable stats!")
			}
		} else if(msg.args.disable || msg.args.d) {
			if(await msg.guild.members.fetch(msg.author).then(r => r.permissions.has("ADMINISTRATOR"))) {
				if(db.statsDisabled) {
					return msg.reply("stats are already disabled...");
				} else {
					db.statsDisabled = true;
					delete db.cmdStats;
					delete db.userStats;
					return msg.reply("Disabled stats :thumbsup:");
				}
			} else {
				return msg.reply("You must have ADMINISTRATOR permission to disable stats!")
			}
		}

		if(db.statsDisabled) {
			return msg.reply("Stats are disabled in this guild :pensive:");
		}

		console.log(db.cmdStats);
		console.log(db.userStats);

		let cmdStats = Object.entries(db.cmdStats).sort((a, b) => b[1] - a[1]);
		let userStats = Object.entries(db.userStats).sort((a, b) => b[1] - a[1]);

		const metals = ["🥇", "🥈", "🥉", "4️⃣", "5️⃣"];

		let cmdStatsMsg = "";
		for(let i = 0; i < 5 && i < cmdStats.length; i++)
			cmdStatsMsg += `${metals[i]} ${msg.prefix}${cmdStats[i][0]} (${cmdStats[i][1]} times)\n`;

		let userStatsMsg = "";
		for(let i = 0; i < 5 && i < userStats.length; i++)
		userStatsMsg += `${metals[i]} <@${userStats[i][0]}> (${userStats[i][1]} times)\n`;

		let totalCommands = 0;
		for(cmdStat of cmdStats)
			totalCommands += cmdStat[1];

		msg.reply({embeds: [{
			title: "Command Stats",
			description: `Total commands in ${msg.guild.name}: ${totalCommands}`,
			thumbnail: {
				url: msg.guild.iconURL()
			},
			fields: [
				{
					name: "Top Commands",
					value: cmdStatsMsg,
					inline: true
				},
				{
					name: "Top Users",
					value: userStatsMsg,
					inline: true
				}
			],
			footer: {
				text: "Tracking command usage since: 2021-10-16"
			}
		}]});
	}
}
