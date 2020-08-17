const charsets = {
	hex: [ '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f' ],
	dec: [ '0', '1', '2', '3', '4', '5', '6', '7', '8', '9' ],
};

const {color, names} = require('../../utils/color');

module.exports = {
	name: [ 'color', 'color-code' ],
	usage: '[-__r__andom] [color]',
	desc: 'Displays information about a color in #RGB, #RRGGBB, RRR GGG BBB, BGR15, or by name',
	DM: true,
	permissions: [],
	exec(UnivBot, msg) {
		let string = msg.args.value.toLowerCase().replace(/\s+/g, ' ').replace(/#/g, '').replace(/0x/g, '');
		let rgb = [0, 0, 0];

		if(msg.args.random || msg.args.r) {
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
			} else if(string.split(" ").filter(r => r.madeOf(charsets.dec)).length == 3) { // Three dec numbers
				for(let i in rgb)
					rgb[i] = parseInt(string.split(" ")[i]);
			} else if(string && names.some(r => r.name.toLowerCase().includes(string.toLowerCase()))) {
				let color = names.sort((a, b) => (a.name.length > b.name.length) ? 1 : -1).filter(r => r.name.toLowerCase().includes(string.toLowerCase()))[0].decimal;
				rgb = [color >> 0x10, (color >> 0x8) & 0xFF, color & 0xFF];
			} else {
				return msg.send("**Error:** Invalid color!")
			}
		}

		let rgbColor = '``' + rgb.join(' ') + '``';

		let bgr15 = (((rgb[2] * 31 / 255) & 0x1F) << 10 | ((rgb[1] * 31 / 255) & 0x1F) << 5 | ((rgb[0] * 31 / 255) & 0x1F));
		bgr15 = '``0x' + bgr15.toString(16).padStart(4, '0') + '``\n``0x' + (bgr15 | 1 << 15).toString(16) + '``';

		hex = "";
		rgb.forEach(r => hex += r.toString(16).padStart(2, "0"))
		hexColor = '``#' + hex + '``';

		let name = color(parseInt(hex, 16));
		return msg.send({
			embed: {
				title: `Color: ${name.name}`,
				description: `**Hex color** 
${hexColor}

**RGB color**
${rgbColor}

**BGR15 color**
${bgr15}`,
				color: parseInt(hex, 16)
			}
		});
	}
}
