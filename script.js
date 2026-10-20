import { cities } from "./data.js";

const sthlmWeather = document.getElementById("sthlm_weather");
const inputField = document.getElementById("input_field");
const dropdown = document.getElementById("dropdown");
const citiesList = document.getElementById("cities_list");
const text = document.getElementById("text");
const shortDescription = document.getElementById("short_description");

if (sthlmWeather) {
	sthlmWeather.addEventListener("click", async function () {
		await getData();
	});
}

buildCitiesList();

// dropdown.addEventListener("pointerclickleave", (event) => {
// 	citiesList.style.display = "none";
// });

inputField.addEventListener("click", (event) => {
	if (citiesList.style.display == "block") {
		citiesList.style.display = "none";
	} else {
		citiesList.style.display = "block";
	}
});

async function getData() {
	const url =
		"https://api.open-meteo.com/v1/forecast?latitude=59.91&longitude=10.75&models=metno_seamless&current=temperature_2m,cloud_cover&forecast_days=1";
	try {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error(`Response status: ${response.status}`);
		}
		const result = await response.json();
		const temperature = result.current.temperature_2m;
		const cloudCover = result.current.cloud_cover;
		renderData(temperature, cloudCover);
		text.textContent = `The current temperature in Sthlm is ${temperature}° Celsius and the cloud coverage is ${cloudCover}%`;
	} catch (error) {
		console.error(error.message);
	}
}

function buildCitiesList() {
	for (let i = 0; i < cities.length; i++) {
		const cityId = cities[i].city.replace(/\s+/g, "-");
		citiesList.innerHTML += `
	<div class="list" id="list">
		<ul>
			<li class="list_item" id="${cityId}">${cities[i].city}</li>
		</ul>
	</div>`;
	}

	for (let i = 0; i < cities.length; i++) {
		const cityId = cities[i].city.replace(/\s+/g, "-");
		const el = document.querySelector(`#${CSS.escape(cityId)}`);
		el.addEventListener("click", async function () {
			inputField.placeholder = cities[i].city;
			await sendAnApiCallForSpecificCity(cities[i]);
			if (citiesList.style.display == "block") {
				citiesList.style.display = "none";
			} else {
				citiesList.style.display = "block";
			}
		});
	}
}

async function sendAnApiCallForSpecificCity(city) {
	const url = `https://api.open-meteo.com/v1/forecast?latitude=${city.latitude}&longitude=${city.longitude}&models=metno_seamless&current=temperature_2m,cloud_cover&forecast_days=1`;
	try {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error(`Response status: ${response.status}`);
		}
		const result = await response.json();
		const temperature = result.current.temperature_2m;
		const cloudCover = result.current.cloud_cover;
		renderData(temperature, cloudCover);
		text.textContent = `The current temperature in ${city.city} is ${temperature}° Celsius and the cloud coverage is ${cloudCover}%`;
	} catch (error) {
		console.error(error.message);
	}
}

function renderData(temperature, cloudCover) {
	switch (true) {
		case temperature <= 0:
			console.log("Frost");
			shortDescription.textContent = "Frost. ";
			break;
		case temperature > 0 && temperature < 15:
			console.log("It's cold");
			shortDescription.textContent = "It's cold. ";
			break;
		case temperature > 15 && temperature < 25:
			console.log("It's kinda warm");
			shortDescription.textContent = "It's lagom. ";
			break;
		case temperature >= 25 && temperature < 35:
			console.log("It's warm");
			shortDescription.textContent = "It's warm. ";
			break;
		case temperature >= 35:
			console.log("It's warm");
			shortDescription.textContent = "It's way too hot. ";
			break;
		default:
			console.log("No temperature data. ");
	}

	switch (true) {
		case cloudCover >= 70:
			console.log("Cloudy");
			shortDescription.textContent += "Cloudy";
			break;
		case cloudCover < 70 && cloudCover >= 30:
			console.log("Partially cloudy");
			shortDescription.textContent += "Partially cloudy";
			break;
		case cloudCover < 30:
			console.log("Clear");
			shortDescription.textContent += "Clear";
			break;
		default:
			console.log("No cloud cover data. ");
	}
}
