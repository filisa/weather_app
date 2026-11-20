const inputField = document.getElementById("input_field");
const text = document.getElementById("text");
const weatherConditionDiv = document.getElementById("weather_condition");
const weatherDiv = document.getElementById("weather_div");
const temperatureDiv = document.getElementById("temperature");
const windDiv = document.getElementById("wind");
const dropdownSuggestionsDiv = document.getElementById(
	"dropdown_suggestions_div"
);
const loader = document.getElementById("loader");
loader.classList.add("hidden");
weatherDiv.classList.add("hidden");
dropdownSuggestionsDiv.classList.add("hidden");
let delayForTyping;

//if you start typing in input field it will start looking for cities
inputField.addEventListener("input", async function () {
	clearTimeout(delayForTyping);
	weatherDiv.classList.add("hidden");
	delayForTyping = setTimeout(async () => {
		if (inputField.value.length === 0) {
			//add warning message here 'enter the name of the city first!
			return;
		}
		loader.classList.remove("hidden");
		const cities = await searchCity();
		showDropdownList(cities);
		loader.classList.add("hidden");
	}, 400);
});

function showDropdownList(citiesList) {
	dropdownSuggestionsDiv.classList.remove("hidden");
	dropdownSuggestionsDiv.textContent = "";
	if (!citiesList) {
		dropdownSuggestionsDiv.textContent = "Nothing found, try again.";
		loader.classList.add("hidden");
	}
	citiesList.forEach((item) => {
		createSearchResult(item);
	});
}

async function searchCity() {
	const url = `https://geocoding-api.open-meteo.com/v1/search?name=${inputField.value}`;
	try {
		const response = await fetch(url);

		if (!response.ok) {
			throw new Error(`Response status: ${response.status}`);
		}
		const result = await response.json();
		if (!result.results) {
			dropdownSuggestionsDiv.textContent = "error! nothing found";
		}
		return result.results;
	} catch (error) {
		console.error(error.message);
		throw error;
	}
}

async function sendAnApiCallForSpecificCity(latitude, longitude) {
	console.log("sendAnApiCallForSpecificCity", latitude, longitude);
	const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&models=metno_seamless&current=weather_code,temperature_2m,wind_speed_10m&forecast_days=1&wind_speed_unit=ms`;
	try {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error(`Response status: ${response.status}`);
			//render error message
		}
		const result = await response.json();
		const temperature = Math.round(result.current.temperature_2m);
		const windSpeed = Math.round(result.current.wind_speed_10m);
		const weatherCondition = await getWeatherByCode(
			result.current.weather_code
		);
		renderData(
			temperature,
			result.current.weather_code,
			weatherCondition,
			windSpeed
		);
		console.log(weatherCondition);
		text.textContent = `The current temperature in ${inputField.value} is ${temperature}° Celsius, the wind speed is ${windSpeed}m/s. ${weatherCondition}`;
	} catch (error) {
		console.error(error.message);
	}
}

function renderData(temperature, weatherCode, weatherCondition, windSpeed) {
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
			image.src = "images/progress.svg";
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
	temperatureText.textContent = "Temp.";
	loader.classList.add("hidden");
}

async function getWeatherByCode(code) {
	const response = await fetch("./codes.json");
	const parsed = await response.json();
	return parsed[code.toString()];
}

function createSearchResult(city) {
	const div = document.createElement("div");
	div.classList.add("location_div");
	dropdownSuggestionsDiv.appendChild(div);
	const cityEl = document.createElement("button");
	cityEl.classList.add("city_button");
	cityEl.id = `${city.id}`;
	cityEl.textContent = `${city.name}, ${city.country}`;
	div.appendChild(cityEl);
	const btn = document.getElementById(`${city.id}`);
	btn.addEventListener("click", async function () {
		loader.classList.remove("hidden");
		dropdownSuggestionsDiv.classList.add("hidden");
		await sendAnApiCallForSpecificCity(city.latitude, city.longitude);
		weatherDiv.classList.remove("hidden");
	});
}
