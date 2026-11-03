const sthlmWeather = document.getElementById("sthlm_weather");
const inputField = document.getElementById("input_field");
const text = document.getElementById("text");
const shortDescription = document.getElementById("short_description");
const search = document.getElementById("search");
if (sthlmWeather) {
	sthlmWeather.addEventListener("click", async function () {
		await getData();
	});
}

//if you start typing in input field it will start looking for cities
search.addEventListener("click", async function () {
	const searchResponse = await searchCity();
	await sendAnApiCallForSpecificCity(searchResponse[0], searchResponse[1]);
});

async function searchCity() {
	const url = `https://geocoding-api.open-meteo.com/v1/search?name=${inputField.value}`;
	try {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error(`Response status: ${response.status}`);
		}
		const result = await response.json();
		const latitude = result.results[0].latitude;
		const longitude = result.results[0].longitude;
		console.log(latitude, longitude);
		return [latitude, longitude];
	} catch (error) {
		console.error(error.message);
	}
}

async function sendAnApiCallForSpecificCity(latitude, longitude) {
	console.log("sendAnApiCallForSpecificCity", latitude, longitude);
	const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&models=metno_seamless&current=weather_code,temperature_2m,cloud_cover&forecast_days=1`;
	try {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error(`Response status: ${response.status}`);
		}
		const result = await response.json();
		const temperature = result.current.temperature_2m;
		const cloudCover = result.current.cloud_cover;
		const weatherCondition = await getWeatherByCode(
			result.current.weather_code
		);
		renderData(temperature, cloudCover, weatherCondition);
		console.log(weatherCondition);
		text.textContent = `The current temperature in ${inputField.value} is ${temperature}° Celsius and the cloud coverage is ${cloudCover}%. ${weatherCondition}`;
	} catch (error) {
		console.error(error.message);
	}
}

function renderData(temperature, cloudCover, weatherCondition) {
	switch (true) {
		case temperature > 0 && temperature <= 15:
			break;
		case temperature > 15 && temperature < 25:
			break;
		case temperature >= 25 && temperature < 35:
			break;
		case temperature >= 35:
			break;
		default:
			console.log("No weather data. ");
	}
}

async function getWeatherByCode(code) {
	const response = await fetch("./codes.json");
	const parsed = await response.json();
	return parsed[code.toString()];
}

//is_day can be 0 or 1
