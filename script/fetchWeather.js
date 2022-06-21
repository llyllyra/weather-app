import Data from "./config.js";
import weatherDisplay from "./weatherDisplay.js";

let dataWeather = [];
const fetchWeather = async (city) => {
    let url = "https://api.openweathermap.org/data/2.5/forecast/daily?q=" + city + "&units=metric&lang=fr&cnt=7&appid=" + Data.key;
    let response = await fetch(url);
    dataWeather = await response.json();
    weatherDisplay(dataWeather)
}

export default fetchWeather;