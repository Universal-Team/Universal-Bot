const weather = require("weather-js");

module.exports = {
	name: ["weather", "temperature", "temp"],
	usage: "[-__f__ahrenheit] <location>",
	desc: "Gets the weather at a given location. Weather data from MSN.",
	DM: true,
	permissions: [],
	async exec(UnivBot, msg) {
		const fahrenheit = msg.args.fahrenheit || msg.args.f;
		const degreeSymbol = fahrenheit ? "°F" : "°C";

		if(!msg.args.value)
			return msg.reply(`It is currently ${fahrenheit ? "-459.67" : "-273.15"}${degreeSymbol} in the void`);


		weather.find({search: msg.args.value, degreeType: (msg.args.fahrenheit || msg.args.f) ? "F" : "C"}, (err, result) => {
			if(err)
				return msg.reply(`Error: ${err}`);

			if(result.length == 0)
				return msg.reply("No weather data found for that location");

			let data = result[0];

			msg.reply({embeds: [{
				color: 0x87CEEB,
				title: `Weather in ${data.location.name}`,
				thumbnail: {
					url: data.current.imageUrl
				},
				fields: [
					{
						name: "Temperature",
						value: data.current.temperature + degreeSymbol,
						inline: true
					},
					{
						name: "Feels Like",
						value: data.current.feelslike + degreeSymbol,
						inline: true
					},
					{
						name: "_ _", // Empty field for a 2x2 grid
						value: "_ _",
						inline: true
					},
					{
						name: "Humidity",
						value: data.current.humidity,
						inline: true
					},
					{
						name: "Wind",
						value: data.current.winddisplay,
						inline: true
					},
					{
						name: "_ _", // Empty field for a 2x2 grid
						value: "_ _",
						inline: true
					}
				]
			}]});
		});
	}
}
