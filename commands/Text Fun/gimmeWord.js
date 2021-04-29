module.exports = {
	name: ["gimmeWord", "randomWord"],
	usage: "",
	desc: "Gives a random word",
	DM: true,
	permissions: [],
	exec(UnivBot, msg) {
		let names = require("../../data/unicode-names.json");
		out = names[Object.keys(names)[Math.floor(Math.random() * Object.keys(names).length)]].split(/\b/).filter(r => r.match(/\b/));

		msg.send(out[Math.floor(Math.random() * out.length)].toLowerCase());
	}
}
