
const sthlmWeather = document.getElementById("sthlm_weather")
const text = document.getElementById("text")
const weatherImgDiv =  document.getElementById("weather_img")
const shortDescription =  document.getElementById("short_description")


sthlmWeather.addEventListener("click", async function(){
    await getData()
})


async function getData() {
      const url = "https://api.open-meteo.com/v1/forecast?latitude=59.91&longitude=10.75&models=metno_seamless&current=temperature_2m,cloud_cover&forecast_days=1";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const result = await response.json();
    const temperature = result.current.temperature_2m
    const cloudCover = result.current.cloud_cover
    renderData(temperature,cloudCover);
    text.textContent= `The current temperature in Sthlm is ${temperature}° Celsius and the cloud coverage is ${cloudCover}%`;
  } catch (error) {
    console.error(error.message);
  }
}





function renderData(temperature,cloudCover) { 
    switch (true) {
      case temperature<=0:
        console.log("Frost")
        shortDescription.textContent = "Frost. "
        break;
      case temperature > 0 && temperature < 15:
        console.log("It's cold")
        shortDescription.textContent = "It's cold. "
        break;
      case temperature > 15 && temperature < 25:
          console.log("It's lagom")
          shortDescription.textContent = "It's lagom. "
          break;
      case temperature >= 25:
          console.log("It's warm")
          shortDescription.textContent = "It's warm. "
          break;
      default: 
        console.log("No temperature data. ")
    }

    switch(true) {
      case cloudCover >= 70:
        console.log("Cloudy")
        shortDescription.textContent += "Cloudy"
        break;
      case cloudCover < 70 && cloudCover >= 30:
        console.log("Partially cloudy")
        shortDescription.textContent += "Partially cloudy"
        break;
      case cloudCover < 30:
        console.log("Clear")
        shortDescription.textContent += "Clear"
        break;
      default: 
        console.log("No cloud cover data. ")

    } 
  }

