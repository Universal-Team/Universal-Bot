const fetch = require("node-fetch");

function skyColor(id, night) {
	if(id >= 200 && id < 300) {
		return 0x00008B; // Thunderstorm
	} else if(id >= 300 && id < 600) {
		return 0x4169E1; // Rain
	} else if(id >= 600 && id < 700) {
		if(id == 615 || id == 616)
			return 0xADD8E6; // Rain and snow
		return 0xFFFFFF; // Snow
	} else if(id >= 700 && id < 900) {
		if(id == 711)
			return 0x808080; // Smoke
		else if(id == 721 || id == 741)
			return 0xA9A9A9; // Haze/Fog
		else if(id == 761)
			return 0xF5F5DC; // Dust
		else if(id == 800)
			return night ? 0x202020 : 0x87CEEB; // Clear
		return 0xD3D3D3; // Cloudy
	}

	return 0xFF00FF; // Error
}

function kToC(k) { return Math.round(k - 273.15); }
function kToF(k) { return Math.round((k - 273.15) * 9 / 5 + 32); }

function mpsToKmph(mps) { return Math.round(mps * 3.6); }
function mpsToMph(mps) { return Math.round(mps * 2.23693629); }

module.exports = {
	name: ["weather", "temperature", "temp"],
	args: {
		fahrenheit: {
			letter: "f"
		},
		value: {
			title: "location",
			required: true
		}
	},
	desc: "Gets the weather at a given location. Weather data from OpenWeatherMap.",
	DM: true,
	permissions: [],
	async exec(UnivBot, msg) {
		if(!process.env.WEATHER_TOKEN)
			return msg.reply("Please set `WEATHER_TOKEN` in your `.env`.");

		const degreeSymbol = msg.args.fahrenheit ? "°F" : "°C";
		const fromKelvin = msg.args.fahrenheit ? kToF : kToC;
		const fromMps = msg.args.fahrenheit ? mpsToMph : mpsToKmph;

		if(!msg.args.value)
			return msg.reply(`It is currently ${fromKelvin(0)}${degreeSymbol} in the void`);

		let result = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(msg.args.value)}&cnt=1&appid=${process.env.WEATHER_TOKEN}`).then(r => r.json());
		if(result.cod != 200)
			return msg.reply(`No weather data found for that location (Error ${result.cod})`);

		const data = result.list[0];
		const city = result.city;

		if(msg.webhookId) {
			msg.reply(`Weather in ${city.name}, ${city.country}:
Temperature: ${fromKelvin(data.main.temp)}${degreeSymbol}
Feels Like: ${fromKelvin(data.main.feels_like)}${degreeSymbol}
Min/Max: ${fromKelvin(data.main.temp_min)}${degreeSymbol}/${fromKelvin(data.main.temp_max)}${degreeSymbol}
Humidity: ${data.main.humidity}%
Wind: ${fromMps(data.wind.speed)} ${msg.args.fahrenheit ? "mph" : "km/h"}`);
		} else {
			msg.reply({embeds: [{
				color: skyColor(data.weather[0].id, data.weather[0].icon[2] == "n"),
				title: `Weather in ${city.name}, ${city.country}`,
				description: data.weather[0].description,
				thumbnail: {
					url: `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`
				},
				fields: [
					{
						name: "Temperature",
						value: fromKelvin(data.main.temp) + degreeSymbol,
						inline: true
					},
					{
						name: "Feels Like",
						value: fromKelvin(data.main.feels_like) + degreeSymbol,
						inline: true
					},
					{
						name: "Min/Max",
						value: `${fromKelvin(data.main.temp_min)}${degreeSymbol}/${fromKelvin(data.main.temp_max)}${degreeSymbol}`,
						inline: true
					},
					{
						name: "Humidity",
						value: data.main.humidity + "%",
						inline: true
					},
					{
						name: "Wind",
						value: fromMps(data.wind.speed) + (msg.args.fahrenheit ? " mph" : " km/h"),
						inline: true
					},
					{
						name: "Sunrise/Sunset",
						value: `<t:${city.sunrise}:t> (<t:${city.sunrise}:R>)\n<t:${city.sunset}:t> (<t:${city.sunset}:R>)`,
						inline: true
					}
				]
			}]});
		}
	}
}
