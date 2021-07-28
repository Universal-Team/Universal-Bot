Date.prototype.stdTimezoneOffset = function () {
	var jan = new Date(this.getFullYear(), 0, 1);
	var jul = new Date(this.getFullYear(), 6, 1);
	return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
}

module.exports = {
	name: ["isItDST", "isItDST?"],
	usage: "",
	desc: "Lets you know if its Daylight Savings Time. Currently only works for the time zone where the bot is hosted (US Central time)",
	DM: true,
	permissions: [],
	exec(UnivBot, msg) {
		let dst = new Date().stdTimezoneOffset() > new Date().getTimezoneOffset();

		msg.reply(dst ? "Yeah\n(*in us central time at least*)" : "Nope\n(*in us central time at least*)");
	}
}
