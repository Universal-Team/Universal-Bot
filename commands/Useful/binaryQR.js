const { spawnSync } = require("child_process");
const fetch         = require("node-fetch");
const fs            = require("fs");

module.exports = {
	name: ["binaryQR", "binQR"],
	usage: "<link-to-file>",
	desc: "Generates a QR code from the linked or attached file",
	DM: true,
	permissions: [],
	async exec(UnivBot, msg) {
		let link = msg.args.value;
		if(msg.attachments.first())
			link = msg.attachments.first().attachment;

		if(!link)
			return msg.reply("Enter a link!");

		if(link[0] == "<" && link[link.length - 1] == ">")
			link = link.substr(1, link.length - 2);

		fetch(link, {method: "HEAD"}).then(r => {
			if(r.headers.get("content-length") <= 2953) {
				fetch(link).then(async r => {
					fs.writeFileSync("file.bin", await r.buffer());

					spawnSync("qrencode", ["-8", "-r", "file.bin", "-o", "qr.png"], { encoding: "utf-8" });

					if(fs.existsSync("qr.png")) {
						msg.reply({files: [{
							attachment: fs.readFileSync("qr.png"),
							name: "qr.png"
						}]});
						fs.unlinkSync("qr.png");
					}

					fs.unlinkSync("file.bin");
				});
			} else {
				msg.reply(`File is too large! (Max size: 2,953 bytes)`);
			}
		}).catch(e => msg.reply(`Invalid URL! (${e})`));
	}
}
