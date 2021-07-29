const Jimp = require("jimp");

module.exports = {
	name: ["gif", "gifify"],
	usage: "<link>",
	desc: "Converts a bmp, jpg, png, or tiff to a gif",
	DM: true,
	permissions: [],
	exec(UnivBot, msg) {
		let link = msg.args.value;
		if(msg.attachments.first())
			link = msg.attachments.first().attachment;

		if(!link)
			return msg.reply("Enter a link!");

		if(link[0] == "<" && link[link.length - 1] == ">")
			link = link.substr(1, link.length - 2);

		Jimp.read({url: link}).then(img => {
			img.getBufferAsync(Jimp.MIME_GIF).then(r => msg.reply({files: [{
				attachment: r,
				name: "image.gif"
			}]}));
		}).catch(e => msg.reply(`Invalid URL! (${e})`));
	}
}
