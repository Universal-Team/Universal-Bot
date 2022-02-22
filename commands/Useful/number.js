module.exports = {
	name: [ "number", "hex", "decimal", "octal", "binary" ],
	args: {
		random: {
			letter: "r"
		},
		value: {
			title: "number"
		}
	},
	desc: "Shows a number in various bases",
	DM: true,
	permissions: [],
	exec(UnivBot, msg) {
		let base = 10;
		if(msg.args.value[0] === "0") {
			if(msg.args.value[1].toLowerCase() == "x") {
				base = 16;
				msg.args.value = msg.args.value.substr(2);
			} else if(msg.args.value[1].toLowerCase() == "b") {
				base = 2;
				msg.args.value = msg.args.value.substr(2);
			} else if(msg.args.value[1].toLowerCase() == "o") {
				base = 8;
				msg.args.value = msg.args.value.substr(2);
			} else {
				base = 8;
				msg.args.value = msg.args.value.substr(1);
			}
		}
		let number = parseInt(msg.args.value, base);

		if(msg.args.random)
			number = Math.floor(Math.random() * 0x10000);

		if(isNaN(number))
			return msg.reply("What am I supposed to do with something that isn't even a number...");

		return msg.reply({
			embeds: [{
				title: `Number: ${number.toLocaleString()}`,
				fields: [
					{
						"name": "Hexadecimal (Base 16)",
						"value": `0x${number.toString(16).toUpperCase()}`,
						"inline": true
					},
					{
						"name": "Decimal (Base 10)",
						"value": number.toString(10),
						"inline": true
					},
					{
						"name": "Octal (Base 8)",
						"value": number == 0 ? "0" : `0${number.toString(8)}`,
						"inline": true
					},
					{
						"name": "Binary (Base 2)",
						"value": `0b${number.toString(2)}`,
						"inline": true
					}
				]
			}]
		});
	}
}
