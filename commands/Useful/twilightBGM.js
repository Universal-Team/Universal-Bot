const { spawnSync }     = require("child_process");
const fetch             = require("node-fetch");
const fs                = require("fs");
const MessageAttachment = require("../../utils/MessageAttachment");

module.exports = {
	name: ["TWiLightBGM", "TWiLightMusic", "twlbgm"],
	usage: "<audio link>",
	desc: "Converts audio to TWiLight Menu++'s BGM format",
	DM: true,
	permissions: [],
	async exec(UnivBot, msg) {
		let link = msg.args.value;
		if(msg.attachments.first())
			link = msg.attachments.first().attachment;

		if(!link)
			return msg.send("Enter a link!");

		if(link[0] == "<" && link[link.length - 1] == ">")
			link = link.substr(1, link.length - 2);

		let name = link.match(/.*\/(.*)/)?.[1];
		if(!name)
			return msg.send("Invalid file name!");

		let m = await msg.send("Downloading... (This may take a bit)");

		fetch(link, {"method": "Get"}).then(r => {
			if(r.status >= 200 && r.status <= 299) {
				return r.buffer();
			} else {
				throw Error(response.statusText);
			}
		}).then(r => {
			m.edit("Converting... (This may take a bit)");
			fs.writeFileSync(name, r);
			spawnSync("ffmpeg", ["-y", "-i", name, "-f", "s16le", "-acodec", "pcm_s16le", "-ac", "1", "-ar", "16k", "bgm.pcm.raw"], { encoding: "utf-8" });
			if(fs.existsSync(name)) {
				fs.unlinkSync(name);
			}
			m.edit("Sending... (This may take a bit)");
			msg.send("", MessageAttachment(fs.readFileSync("bgm.pcm.raw"), "bgm.pcm.raw")).then(() => m.edit("Done!"));
			if(fs.existsSync("bgm.pcm.raw")) {
				fs.unlinkSync("bgm.pcm.raw");
			}
		}).catch(e => {
			return msg.send(`Invalid URL: ${e}`);
		});
	}
}
