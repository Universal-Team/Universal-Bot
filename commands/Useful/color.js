const charsets = {
	hex: [ "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f" ],
	dec: [ "0", "1", "2", "3", "4", "5", "6", "7", "8", "9" ],
};

const {color, names} = require("../../utils/color");

module.exports = {
	name: [ "color", "color-code", "colour", "colour-code" ],
	args: {
		random: {
			letter: "r",
		},
		value: {
			title: "color"
		}
	},
	desc: "Displays information about a color in #RGB, #RRGGBB, RRR GGG BBB, BGR15, or by name",
	DM: true,
	permissions: [],
	exec(UnivBot, msg) {
		let string = msg.args.value.toLowerCase().replace(/\s+/g, " ").replace(/#/g, "").replace(/0x/g, "");
		let rgb = [0, 0, 0];

		if(!msg.args.value)
			string = "36393f"; // Discord dark theme BG

		if(msg.args.random) {
			rgb = [Math.floor(Math.random() * 256), Math.floor(Math.random() * 256), Math.floor(Math.random() * 256)];
		} else {
			if(string.length == 3 && string.madeOf(charsets.hex)) { // Three digit hex
				for(let i in rgb)
					rgb[i] = parseInt(string[i] + string[i], 16);
			} else if(string.length == 6 && string.madeOf(charsets.hex)) { // Six digit hex
				for(let i in rgb)
					rgb[i] = parseInt(string.substr(i * 2, 2), 16);
			} else if(string.length == 4 && string.madeOf(charsets.hex)) { // BGR15
				let val = parseInt(string, 16);
				rgb[0] = Math.round(( val         & 0x1F) * 255 / 31);
				rgb[1] = Math.round(((val >> 0x5) & 0x1F) * 255 / 31);
				rgb[2] = Math.round(((val >> 0xA) & 0x1F) * 255 / 31);
			} else if(string.split(/[\s,]/).filter(r => r.length > 0 && r.madeOf(charsets.dec)).length == 3) { // Three dec numbers
				for(let i in rgb) {
					rgb[i] = parseInt(string.split(/[\s,]/).filter(r => r.length > 0)[i]);
				}
			} else if(string && names.some(r => r.name.toLowerCase().includes(string.toLowerCase()))) {
				let color = names.sort((a, b) => (a.name.length > b.name.length) ? 1 : -1).filter(r => r.name.toLowerCase().includes(string.toLowerCase()))[0].decimal;
				rgb = [color >> 0x10, (color >> 0x8) & 0xFF, color & 0xFF];
			} else {
				return msg.reply("**Error:** Invalid color!");
			}
		}

		if(!rgb.every(r => r >= 0 && r < 256))
			return msg.reply("**Error:** Invalid color!");

		let rgbColor = `\`\`${rgb.join(" ")}\`\``;

		let bgr15 = ((Math.round(rgb[2] * 31 / 255) & 0x1F) << 10 | (Math.round(rgb[1] * 31 / 255) & 0x1F) << 5 | (Math.round(rgb[0] * 31 / 255) & 0x1F));
		bgr15 = `\`\`0x${bgr15.toString(16).padStart(4, "0").toUpperCase()}\`\` \`\`0x${(bgr15 | 1 << 15).toString(16).toUpperCase()}\`\``;

		hex = "";
		rgb.forEach(r => hex += r.toString(16).padStart(2, "0").toUpperCase())
		hexColor = `\`\`#${hex}\`\``;

		let colorWord = msg.cmd.toLowerCase().includes("color") ? "Color" : "Colour";

		let name = color(parseInt(hex, 16));
		return msg.reply({
			content: (msg.args.value || msg.args.random) ? undefined : "What is the color of nothing... wait I think I've got it",
			embeds: [{
				title: `${colorWord}: ${name.name}`,
				fields: [
					{
						"name": `Hex ${colorWord}`,
						"value": hexColor,
						"inline": true
					},
					{
						"name": `RGB ${colorWord}`,
						"value": rgbColor,
						"inline": true
					},
					{
						"name": `BGR15 ${colorWord}`,
						"value": bgr15,
						"inline": true
					}
				],
				color: parseInt(hex, 16)
			}]
		});
	}
}
