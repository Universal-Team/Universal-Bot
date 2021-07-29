const Jimp = require("jimp");

module.exports = {
	name: ["jpg", "jpeg", "jpgify", "jpegify"],
	usage: "<link>",
	desc: "Converts a bmp, gif, png, or tiff to a jpg",
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
			img.getBufferAsync(Jimp.MIME_JPEG).then(r => msg.reply({files: [{
				attachment: r,
				name: "image.jpg"
			}]}));
		}).catch(e => msg.reply(`Invalid URL! (${e})`));
	}
}
