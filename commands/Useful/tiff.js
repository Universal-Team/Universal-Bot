const Jimp = require("jimp");
const MessageAttachment = require('../../utils/MessageAttachment');

module.exports = {
	name: ["tiff", "tiffify"],
	usage: "<image link>",
	desc: "Converts a bmp, gif, jpg, or png to a tiff",
	DM: true,
	permissions: [],
	exec(UnivBot, msg) {
		let link = msg.args.value;
		if(msg.attachments.first())
			link = msg.attachments.first().attachment;

		if(!link)
			return msg.send("Enter a link!");

		if(link[0] == "<" && link[link.length - 1] == ">")
			link = link.substr(1, link.length - 2);

		Jimp.read({url: link}).then(img => {
			img.getBufferAsync(Jimp.MIME_TIFF).then(r => msg.send("", MessageAttachment(r, "image.tiff")));
		}).catch(e => msg.send("Invalid URL! (" + e + ")"));
	}
}
