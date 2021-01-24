const letters = {
	"A": "803001811119505418",
	"B": "803001811229343755",
	"C": "803001811421626388",
	"D": "803001811291209761",
	"E": "803001811367755846",
	"F": "803001811408519188",
	"G": "803001811501056020",
	"H": "803001811639861328",
	"I": "803001811606175784",
	"J": "803001811693993994",
	"K": "803001811769360394",
	"L": "803002054330810378",
	"M": "803001811660570667",
	"N": "803001812113686538",
	"O": "803001811874873356",
	"P": "803001812391166042",
	"Q": "803001812281327616",
	"R": "803001812286308392",
	"S": "803001812180271115",
	"T": "803001812344897567",
	"U": "803001812281851924",
	"V": "803001811966754817",
	"W": "803001812331528234",
	"X": "803001812176732192",
	"Y": "803001812251967519",
	"Z": "803001812386316319"
}

module.exports = {
	name: "blobSign",
	usage: "[-__l__ast] <message>",
	desc: "Writes using blob signs",
	DM: true,
	permissions: [],
	exec(UnivBot, msg) {
		if(msg.args.last || msg.args.l)
			msg.args.value = msg.channel.messages.cache.array()[msg.channel.messages.cache.size - 2].content;

		if(!msg.args.value)
			return msg.send("<:blobNo:667718424809439262>");

		msg.send(msg.args.value.replace(/[A-Z]/gi, r => `<:blob${r.toUpperCase()}:${letters[r.toUpperCase()]}>`));
	}
}
