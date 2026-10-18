import { cities } from "./data.js";
const inputField = document.getElementById("input_field");
const dropdown = document.getElementById("dropdown");
const citiesList = document.getElementById("cities_list");

buildCitiesList();

dropdown.addEventListener("pointerleave", (event) => {
	citiesList.style.display = "none";
});

inputField.addEventListener("pointerenter", (event) => {
	citiesList.style.display = "block";
});

inputField.addEventListener("input", (event) => {
	citiesList.style.display = "block";
});

// build html list of cities
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
		console.log(el);
		el.addEventListener("click", function () {
			inputField.innerHTML += cities[i].city;
		});
	}
}
