const weather = require("weather-js");

const colors = [
	0x00008B, // Thunderstorm
	0x00008B, // Thunderstorm
	0x00008B, // Thunderstorm
	0x00008B, // Thunderstorm
	0x00008B, // Thunderstorm
	0xADD8E6, // Rain/Snow mix
	0xADD8E6, // Sleet/Snow mix
	0xADD8E6, // Rain/Sleet/Snow mix
	0xADD8E6, // Icy
	0xADD8E6, // Icy
	0x4169E1, // Rain/Sleet mix
	0x4169E1, // Light Rain
	0x4169E1, // Rain
	0xFFFFFF, // Light Snow
	0xFFFFFF, // Snow
	0xFFFFFF, // Blizzard
	0xFFFFFF, // Snow
	0x00008B, // Thunderstorm
	0x4169E1, // Showers
	0xF5F5DC, // Dust
	0xA9A9A9, // Fog
	0xA9A9A9, // Haze
	0x808080, // Smoke
	0xD3D3D3, // Windy
	0xD3D3D3, // Windy
	0xADD8E6, // Frigid
	0xD3D3D3, // Cloudy
	0xD3D3D3, // Partly Cloudy (night)
	0xD3D3D3, // Partly Cloudy
	0xD3D3D3, // Partly Cloudy (night)
	0xD3D3D3, // Partly Cloudy
	0x202020, // Clear (night)
	0x87CEEB, // Clear
	0xD3D3D3, // Partly Cloudy (night)
	0xD3D3D3, // Partly Cloudy
	0x00008B, // Thunderstorm
	0xFFA500, // Hot
	0x00008B, // Scattered Thunderstorms
	0x00008B, // Scattered Thunderstorms
	0x4169E1, // Scattered Showers
	0x4169E1, // Showers
	0xADD8E6, // Scattered Snow Showers
	0xFFFFFF, // Snow
	0xFFFFFF, // Snow
	0xFF00FF, // N/A
	0x4169E1, // Scattered Rain Showers (night)
	0xFFFFFF, // Scattered Snow Showers (night)
	0x00008B  // Scattered Thunderstorms (night)
];

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

			if(msg.args.webhookId) {
				msg.reply(`Weather in ${data.location.name}:
Temperature: ${data.current.temperature + degreeSymbol}
Feels Like: ${data.current.feelslike + degreeSymbol}
Humidity: ${data.current.humidity}%
Wind: ${data.current.winddisplay}`);
			} else {
				msg.reply({embeds: [{
					color: colors[data.current.skycode],
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
							value: `${data.current.humidity}%`,
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
			}
		});
	}
}
