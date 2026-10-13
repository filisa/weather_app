
const sthlmWeather = document.getElementById("sthlm_weather")
const text = document.getElementById("text")
const weatherImgDiv =  document.getElementById("weather_img")

sthlmWeather.addEventListener("click", async function(){
    const temperature = await getWeatherData();
    text.textContent= `The current temperature in Sthlm is ${temperature}° Celsius`;
    isItCloudy()
})

async function getWeatherData() {
  const url = "https://api.open-meteo.com/v1/forecast?latitude=59.3021336&longitude=18.083144&models=metno_seamless&current=temperature_2m&forecast_days=1";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    console.log(`The current temperature in Sthlm is ${result.current.temperature_2m} Celsius`);
    const weather = result.current.temperature_2m;
    return weather;
  } catch (error) {
    console.error(error.message);
  }
}

async function isItCloudy() {
   
  const url = "https://api.open-meteo.com/v1/forecast?latitude=59.3021336&longitude=18.083144&models=metno_seamless&current=cloud_cover&forecast_days=1";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    console.log(`The cloud coverage is ${result.current.cloud_cover}`);
    const cloudCoverage = result.current.cloud_cover;
    if (cloudCoverage >= 70) {
        console.log("very cloudy")
        weatherImgDiv.style.display = 'block';
    } else if (cloudCoverage > 30 && cloudCoverage < 70) {
      console.log('a bit cloudy')
    } else if (cloudCoverage<20) {
      console.log('clear')
    } else { 
      console.log("error")
    }
  } catch (error) {
    console.error(error.message);
  }
}

