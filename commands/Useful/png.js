const Jimp = require("jimp");
const MessageAttachment = require('../../utils/MessageAttachment');

module.exports = {
	name: ["png", "pngify"],
	usage: "<image link>",
	desc: "Converts a bmp, gif, jpg, or tiff to a png",
	DM: true,
	permissions: [],
	exec(UnivBot, msg) {
		let link = msg.args;
		if(msg.attachments.first())
			link = msg.attachments.first().attachment;

		if(!link)
			return msg.send("Enter a link!");

		if(link[0] == "<" && link[link.length - 1] == ">")
			link = link.substr(1, link.length - 2);

		Jimp.read({url: link}).then(img => {
			img.getBufferAsync(Jimp.MIME_PNG).then(r => msg.send("", MessageAttachment(r, "image.png")));
		}).catch(e => msg.send("Invalid URL! (" + e + ")"));
	}
}
