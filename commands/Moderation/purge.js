module.exports = {
	name: "purge",
	usage: "<number-of-messages-to-delete>",
	desc: "Deletes a certain amount of messages",
	permissions: [ "MANAGE_MESSAGES" ],
	async exec(UnivBot, msg) {
		// Check the number
		const number = parseInt(msg.args.value);
		if(number.toString().includes("-") || number.toString().includes(".") || number.toString() == "0" || !number.toString().length || number.toString() == "NaN" || number.toString().includes("e") || number.toString() == "Infinity")
			return msg.reply("The provided number is not valid.");
		if(number > 100)
			return msg.reply("Only 100 messages can be deleted at a time.");

		// Delete messages
		await msg.delete();
		try {
			await msg.channel.bulkDelete(number, true);
		} catch(e) {
			msg.reply("There was an error when attempting to bulk delete the messages.");
		}
	}
}
