module.exports = {
	name: 'purge',
	usage: '<number of messages to delete>',
	desc: 'Deletes a certain amount of messages',
	permissions: [ 'MANAGE_MESSAGES' ],
	async exec(UnivBot, msg) {
		// Check the number
		const number = parseInt(msg.args);
		if(number.toString().includes('-') || number.toString().includes('.') || number.toString() == '0' || !number.toString().length || number.toString() == 'NaN'  || number.toString().includes('e') || number.toString() == 'Infinity')
			return msg.send("The provided number is not valid.");
		if(number > 100)
			return msg.send("Only 100 messages can be deleted at a time.");

		// Delete messages
		await msg.delete();
		try {
			await msg.channel.bulkDelete(number, true);
		} catch(e) {
			msg.send("There was an error when attempting to bulk delete the messages.");
		}
	}
}
