const Jimp = require("jimp");

module.exports = {
	name: ["invert", "negate"],
	args: {
		self: {
			letter: "s"
		},
		value: {
			title: "link"
		}
	},
	desc: "Inverts an image",
	DM: true,
	permissions: [],
	exec(UnivBot, msg) {
		let link = msg.args.value;
		if(msg.args.s || msg.args.self)
			link = `https://cdn.discordapp.com/avatars/${msg.author.id}/${msg.author.avatar}.png?size=1024`;
		else if(msg.attachments.first())
			link = msg.attachments.first().attachment;

		if(!link)
			return msg.reply("Enter a link!");

		if(link[0] == "<" && link[link.length - 1] == ">")
			link = link.substr(1, link.length - 2);

		Jimp.read({url: link}).then(img => {
			img.invert();
			img.getBufferAsync(Jimp.MIME_PNG).then(r => msg.reply({files: [{
				attachment: r,
				name: "image.png"
			}]}));
		}).catch(e => msg.reply(`Invalid URL! (${e})`));
	}
}
