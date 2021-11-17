const { spawnSync }     = require("child_process");
const fs                = require("fs");
const fetch             = require("node-fetch");

module.exports = {
	name: [ "qrDecode", "barcodeDecode", "deQR", "zbarimg" ],
	args: {
		value: {
			title: "link",
			required: true
		}
	},
	desc: "Decodes the linked or attached QR/barcode",
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

		fetch(link, {method: "Get"}).then(r => {
			if(r.status >= 200 && r.status <= 299) {
				return r.buffer();
			} else {
				throw Error(response.statusText);
			}
		}).then(r => {
			fs.writeFileSync("qr.png", r)
			let out = spawnSync("zbarimg", ["qr.png"], { encoding: "utf-8" });
			if(fs.existsSync("qr.png")) {
				fs.unlinkSync("qr.png");
			}
			return msg.reply(out.stdout);
		}).catch(e => {
			return msg.reply("Invalid URL!");
		});

	}
}
