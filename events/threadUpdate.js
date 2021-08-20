module.exports = (UnivBot, old, thread) => {
	if(thread.archived && UnivBot.db[thread.guild.id].activeThreads?.includes(thread.id)) {
		thread.setArchived(false);
	}
}
