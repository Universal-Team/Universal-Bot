const Jimp = require("jimp");
const MessageAttachment = require('../../utils/MessageAttachment');

module.exports = {
	name: ["invert", "negate"],
	usage: "[-__s__elf] [image link]",
	desc: "Inverts an image",
	DM: true,
	permissions: [],
	exec(UnivBot, msg) {
		let link = msg.args.value;
		if(msg.args.s || msg.args.self)
			link = "https://cdn.discordapp.com/avatars/" + msg.author.id + "/" + msg.author.avatar + ".png";
		else if(msg.attachments.first())
			link = msg.attachments.first().attachment;

		if(!link)
			return msg.send("Enter a link!");

		if(link[0] == "<" && link[link.length - 1] == ">")
			link = link.substr(1, link.length - 2);

		Jimp.read({url: link}).then(img => {
			img.invert();
			img.getBufferAsync(Jimp.MIME_PNG).then(r => msg.send("", MessageAttachment(r, "image.png")));
		}).catch(e => msg.send("Invalid URL! (" + e + ")"));
	}
}
