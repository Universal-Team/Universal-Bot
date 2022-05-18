const Jimp = require("jimp");

module.exports = {
	name: ["pointer", "*"],
	args: {
		message: {
			title: "pointer",
			required: true
		}
	},
	desc: "Explains what a pointer is",
	DM: true,
	permissions: [],
	async exec(UnivBot, msg) {
		if(msg.args.value == "")
			msg.args.value = "void";

		msg.args.value = msg.args.value.replace(/[\\`]/g, ""); // Remove \ and `, to allow avoiding markdown

		const level = msg.args.value.match(/\*[*\s]*/)?.[0].trim().length || 0; // Pointer level (* count)
		const type = msg.args.value.match(/^[^*\s]+/)?.[0] || "void"; // Pointer type

		if(level > 100)
			return msg.reply("That's... quite the pointer :cold_sweat:");
		else if(type.length > 20)
			return msg.reply("That's... quite a long type :cold_sweat:");

		let img = await Jimp.read("data/pointer.jpg");
		let font = await Jimp.loadFont("data/Consolas.fnt");
		
		// Calculate width of output
		let outWidth = 10, imgWidth = img.bitmap.width;
		for(let i = 0; i < level; i++) {
			outWidth += imgWidth;
			imgWidth *= 0.7;
		}
		outWidth += Math.max(Jimp.measureText(font, type), imgWidth);

		let out = await new Jimp(outWidth, img.bitmap.height, 0x1e1e1cff);

		// Draw pointers
		let xpos = outWidth - img.bitmap.width;
		for(let i = 0; i < level; i++) {
			let ypos = (out.bitmap.height - img.bitmap.height) * 0.2;
			out.composite(img, xpos, ypos);

			let str = type + "".padEnd((level - i), "*");
			out.print(font, xpos + (img.bitmap.width - Jimp.measureText(font, str)) / 2, ypos - (i % 2 == 0 ? 35 : 55) + img.bitmap.height * 0.1, str);

			img.scale(0.7);
			xpos -= img.bitmap.width;
		}

		// Draw type
		let ypos = (out.bitmap.height - img.bitmap.height) * 0.2;
		xpos = img.bitmap.width < Jimp.measureText(font, type) ? 4 : xpos + (img.bitmap.width - Jimp.measureText(font, type)) / 2;
		out.print(font, xpos, ypos - 10 + img.bitmap.height * 0.3, type);

		let buffer = await out.getBufferAsync(Jimp.MIME_PNG);
		msg.reply({files: [{
			attachment: buffer,
			name: "pointer.png"
		}]});
	}
}
