const inputField = document.getElementById("input_field");
const text = document.getElementById("text");
const shortDescription = document.getElementById("short_description");
const searchBtn = document.getElementById("search_button");
const weatherConditionDiv = document.getElementById("weather_condition");
const weatherDiv = document.getElementById("weather_div");
const temperatureDiv = document.getElementById("temperature");
const windDiv = document.getElementById("wind");

weatherDiv.classList.add("hidden");
//if you start typing in input field it will start looking for cities
searchBtn.addEventListener("click", async function () {
	if (inputField.value.length === 0) {
		//add warning message here 'enter the name of the city first!
		return;
	}
	const searchResponse = await searchCity();
	await sendAnApiCallForSpecificCity(searchResponse[0], searchResponse[1]);
	weatherDiv.classList.remove("hidden");
});

async function searchCity() {
	const url = `https://geocoding-api.open-meteo.com/v1/search?name=${inputField.value}`;
	try {
		searchBtn.textContent = "...Loading";
		const response = await fetch(url);

		if (!response.ok) {
			throw new Error(`Response status: ${response.status}`);
			//render error message
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
	const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&models=metno_seamless&current=weather_code,temperature_2m,cloud_cover,wind_speed_10m&forecast_days=1&wind_speed_unit=ms`;
	try {
		searchBtn.textContent = "...Loading";
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error(`Response status: ${response.status}`);
			//render error message
		}
		const result = await response.json();
		const temperature = Math.round(result.current.temperature_2m);
		const cloudCover = result.current.cloud_cover;
		const windSpeed = Math.round(result.current.wind_speed_10m);
		const weatherCondition = await getWeatherByCode(
			result.current.weather_code
		);
		renderData(
			temperature,
			cloudCover,
			result.current.weather_code,
			weatherCondition,
			windSpeed
		);
		console.log(weatherCondition);
		text.textContent = `The current temperature in ${inputField.value} is ${temperature}° Celsius and the cloud coverage is ${cloudCover}%, the wind speed is ${windSpeed}m/s. ${weatherCondition}`;
	} catch (error) {
		console.error(error.message);
	}
}

function renderData(
	temperature,
	cloudCover,
	weatherCode,
	weatherCondition,
	windSpeed
) {
	//the part where the weather image is rendered
	weatherConditionDiv.textContent = "";
	const image = document.createElement("img");
	image.classList.add("weather_image");
	const text = document.createElement("span");
	text.classList.add("text");
	weatherConditionDiv.appendChild(image);
	text.textContent = weatherCondition;
	weatherConditionDiv.appendChild(text);
	switch (weatherCode) {
		case 0:
		case 1:
			image.src = "images/sun.svg";
			break;
		case 2:
		case 3:
			image.src = "images/cloudy.svg";
			break;
		case 51:
			image.src = "images/rainy.svg";
			break;
		default:
			console.log("No weather data. ");
	}
	//the part where the wind speed is rendered
	windDiv.textContent = "";
	const windInfo = document.createElement("p");
	windInfo.textContent = `${windSpeed} m/s`;
	windInfo.classList.add("wind_info");
	windDiv.appendChild(windInfo);

	const windText = document.createElement("span");
	windText.classList.add("text");
	windDiv.appendChild(windText);
	windText.textContent = "Wind";

	//the part where temperature is rendered
	temperatureDiv.textContent = "";
	const temperatureInfo = document.createElement("p");
	temperatureInfo.textContent = `${temperature}°C`;
	temperatureInfo.classList.add("temperature_info");
	temperatureDiv.appendChild(temperatureInfo);

	const temperatureText = document.createElement("span");
	temperatureText.classList.add("text");
	temperatureDiv.appendChild(temperatureText);
	temperatureText.textContent = "Temperature";

	searchBtn.textContent = "Search";
}

async function getWeatherByCode(code) {
	const response = await fetch("./codes.json");
	const parsed = await response.json();
	return parsed[code.toString()];
}

//is_day can be 0 or 1
