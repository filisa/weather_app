# Weather App

A browser-based weather app. Enter a city name to look up its current weather
using the [Open-Meteo Geocoding API](https://open-meteo.com/en/docs/geocoding-api)
and [Forecast API](https://open-meteo.com/en/docs).

## Features

- Looks up a city by name and uses the first geocoding result.
- Displays the current weather condition, rounded temperature in Celsius, and
  rounded wind speed in meters per second.
- Includes cloud cover, weather description, and the entered city name in a
  summary sentence.
- Shows a weather icon for clear, mainly clear, partly cloudy, overcast, and
  light drizzle conditions.
- Uses the Open-Meteo APIs without an API key or third-party dependencies.

## Getting Started

You need a modern browser and an internet connection. Serve the project over
HTTP so the browser can load the JavaScript module and `codes.json`.

```bash
git clone https://github.com/filisa/weather_app.git
cd weather_app
python3 -m http.server 8000
```

Then open <http://localhost:8000>.

You can also use the VS Code **Live Server** extension.

## Using the App

Type a city name into the input field. The app starts looking up the city as the
input changes, then requests its current weather and displays the results.

## Project Structure

```
weather_app/
├── images/
│   ├── cloudy.svg
│   ├── partly_cloudy_day.svg
│   ├── rainy.svg
│   ├── search.svg
│   ├── snow.png
│   ├── sun.svg
│   └── thunder.svg
├── codes.json    # Weather-code descriptions
├── index.html    # App page
├── script.js     # City lookup, weather requests, and rendering
└── styles.css    # App styling
```

## How It Works

1. On input, `script.js` sends the entered city name to the Open-Meteo
   Geocoding API and uses the first result's coordinates.
2. It requests current temperature, cloud cover, wind speed, and weather code
   from the Open-Meteo Forecast API using the `metno_seamless` model.
3. Weather-code descriptions are loaded from `codes.json`. The page displays
   the condition, temperature, wind speed, and a summary sentence.

## Known Limitations

- A lookup runs on each input change rather than when the **Search** button is
  clicked.
- Only the first geocoding result is used; there is no city-results list for
  choosing between places with the same name.
- The weather icon is mapped only for codes 0, 1, 2, 3, and 51. Other
  conditions can still have a text description but may not have an icon.
- Request and lookup errors are logged to the browser console rather than
  displayed on the page.

## Credits

- Weather data by [Open-Meteo](https://open-meteo.com/) (CC BY 4.0)
- Created by [Margarita (filisa)](https://github.com/filisa)

## Data License

Open-Meteo data is licensed under
[Creative Commons Attribution 4.0 International](https://creativecommons.org/licenses/by/4.0/).
