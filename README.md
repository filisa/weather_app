# Weather App

A small, beginner-friendly web app that shows the current weather in Stockholm with one click. It gets live data from the free [Open-Meteo API](https://open-meteo.com/) and gives you the temperature, the cloud cover, and a short plain-language summary such as "It's lagom. Partially cloudy".

## Features

- Gets the current temperature (°C) and cloud cover (%) with one button click
- Shows a short summary of how it feels outside:
  - **Temperature:** Frost (≤ 0°), It's cold (0–15°), It's lagom (15–25°), It's warm (≥ 25°)
  - **Sky:** Clear (< 30%), Partially cloudy (30–69%), Cloudy (≥ 70%)
- No API key, build tools, or dependencies needed. It's plain HTML, CSS, and JavaScript.
- Simple dark theme

## Tech Stack

- **HTML5**: page structure (`index.html`)
- **CSS3**: styling (`styles.css`)
- **Vanilla JavaScript**: data fetching and rendering (`script.js`), using `fetch` and `async/await`
- **[Open-Meteo Forecast API](https://open-meteo.com/en/docs)**: weather data, using the `metno_seamless` model

## Project Structure

```
weather_app/
├── images/
│   └── cloudy.svg     # Weather icon
├── index.html         # Main page
├── script.js          # Fetches and displays weather data
├── styles.css         # App styling
└── .gitattributes
```

## Getting Started

### Prerequisites

You only need a modern web browser and an internet connection.

### Run locally

1. Clone the repository:
   ```bash
   git clone https://github.com/filisa/weather_app.git
   cd weather_app
   ```
2. Open `index.html` in your browser.

   You can also serve it locally, for example with the VS Code **Live Server** extension, or with:
   ```bash
   npx serve .
   # or
   python3 -m http.server 8000
   ```
   Then go to `http://localhost:8000`.

## How It Works

1. When you click **"Check temperature in Sthlm"**, `getData()` runs.
2. The app sends a request to Open-Meteo:
   ```
   https://api.open-meteo.com/v1/forecast?latitude=59.91&longitude=10.75&models=metno_seamless&current=temperature_2m,cloud_cover&forecast_days=1
   ```
3. It reads `current.temperature_2m` and `current.cloud_cover` from the JSON response.
4. `renderData()` uses the thresholds above to turn those values into a short description, and the full reading appears on the page.
5. If the request fails, the error is logged to the browser console.

## Known Issues / Ideas for Improvement

- **Wrong coordinates:** `latitude=59.91&longitude=10.75` points to **Oslo**, not Stockholm. For Stockholm, use `latitude=59.33&longitude=18.07`.
- **Temperature gap:** exactly `15°` doesn't match any case, so no temperature description is shown. Changing `temperature > 15` to `temperature >= 15` fixes this.
- **Weather icon is always hidden:** `#weather_img` is set to `display: none` and never shown. You could show it and switch icons based on cloud cover.
- **Image accessibility:** the `<img>` has no `alt` attribute.
- **Error feedback:** errors only appear in the console. Showing a message on the page would help users.
- **Possible features:** search for other cities, a multi-day forecast, more weather icons, and wind or precipitation data.

## Credits

- Weather data by [Open-Meteo.com](https://open-meteo.com/) (CC BY 4.0)
- Created by [Margarita (filisa)](https://github.com/filisa)

## License

No license has been chosen for this project yet. To let others use the code, consider adding one, for example [MIT](https://choosealicense.com/licenses/mit/).
