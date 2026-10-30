# Weather App

A small browser app that displays the current temperature and cloud cover for a
city selected from a preset list. Weather data comes from the free
[Open-Meteo API](https://open-meteo.com/).

## Features

- Select from Stockholm, Dubai, Tokyo, New York, London, and Los Angeles.
- View the current temperature in Celsius and cloud cover as a percentage.
- See a short description based on temperature and cloud cover.
- No API key, build tools, or third-party dependencies are needed.

## Tech Stack

- **HTML5** for the page structure (`index.html`)
- **CSS3** for styling (`styles.css`)
- **Vanilla JavaScript** for city selection, fetching, and rendering (`script.js`)
- **Open-Meteo Forecast API** for current weather conditions

## Project Structure

```
weather_app/
├── images/
│   ├── cloudy.svg      # Favicon and weather image
│   └── search.svg      # Search icon used in the city selector
├── data.js             # City names and coordinates
├── index.html          # Main page
├── script.js           # City selector and weather requests
└── styles.css          # App styling
```

## Getting Started

You need a modern web browser and an internet connection. Because the app uses
JavaScript modules, run it from a local web server rather than opening
`index.html` directly.

1. Clone the repository:
   ```bash
   git clone https://github.com/filisa/weather_app.git
   cd weather_app
   ```
2. Start a local server:
   ```bash
   python3 -m http.server 8000
   ```
   Or use the VS Code **Live Server** extension.
3. Open `http://localhost:8000` in your browser.

## How It Works

1. Click the city selector to show the preset cities.
2. Select a city. Its coordinates are read from `data.js` and used to request
   current temperature and cloud cover from Open-Meteo.
3. The app displays the reading and derives a short description from these
   thresholds:
   - **Temperature:** Frost at 0°C or below; It's cold above 0°C through 15°C;
     It's lagom above 15°C and below 25°C; It's warm from 25°C to below 35°C;
     It's way too hot at 35°C or above.
   - **Cloud cover:** Clear below 30%; Partially cloudy from 30% to below 70%;
     Cloudy at 70% or above.

The API request uses the `metno_seamless` model and requests current
`temperature_2m` and `cloud_cover` values. If a request fails, the error is
logged to the browser console.

## Known Limitations

- The city list is fixed in `data.js`; the selector does not search for arbitrary
  cities.
- Request errors are only logged in the browser console and are not shown in
  the page.
- The weather image is currently hidden by the stylesheet.

## Credits

- Weather data by [Open-Meteo](https://open-meteo.com/) (CC BY 4.0)
- Created by [Margarita (filisa)](https://github.com/filisa)

## License

No license has been chosen for this project yet. To let others use the code,
consider adding one, for example [MIT](https://choosealicense.com/licenses/mit/).
