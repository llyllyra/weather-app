const result = document.getElementById("result");
const input = document.getElementById("weatherSearch");
const form = document.querySelector("form");
const dayOne = document.getElementById("one");
const dayTwo = document.getElementById("two");
const dayThree = document.getElementById("three");
const dayFour = document.getElementById("four");
const dayFive = document.getElementById("five");
let dataWeather = [];
console.log(dayOne);

async function fetchWeather(city) {
    await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&lang=fr&appid=`
    )
        .then((res) => res.json())
        .then((data) => (dataWeather = data));

    // console.log(dataWeather);
}
fetchWeather();
function weatherDisplay() {
    console.log(dataWeather.city);
    // result.innerHTML = `<div>${dataWeather.id}</div>`;
    if (dataWeather === null) {
        result.innerHTML = `<h2>Aucun résultat</h2>`;
    } else {
        result.innerHTML = `
        <h2>${dataWeather.city.country}</h2>
        <h3>${dataWeather.city.name}</h3>
        `;
        dayOne.innerHTML = `
        <li>${dataWeather.list[0].dt_txt}</li>
        <li>${dataWeather.list[0].main.temp}°</li>
        <li>${dataWeather.list[0].weather[0].description}</li>
        `;
        dayTwo.innerHTML = `
        <li>${dataWeather.list[3].dt_txt}</li>
        <li>${dataWeather.list[3].main.temp}°</li>
        <li>${dataWeather.list[3].weather[0].description}</li>
        `;
        dayThree.innerHTML = `
        <li>${dataWeather.list[11].dt_txt}</li>
        <li>${dataWeather.list[11].main.temp}°</li>
        <li>${dataWeather.list[11].weather[0].description}</li>
        `;
        dayFour.innerHTML = `
        <li>${dataWeather.list[19].dt_txt}</li>
        <li>${dataWeather.list[19].main.temp}°</li>
        <li>${dataWeather.list[19].weather[0].description}</li>
        `;
        dayFive.innerHTML = `
        <li>${dataWeather.list[27].dt_txt}</li>
        <li>${dataWeather.list[27].main.temp}°</li>
        <li>${dataWeather.list[27].weather[0].description}</li>
        `;
    }
}

input.addEventListener("input", (e) => {
    fetchWeather(e.target.value);
});
//
//
form.addEventListener("submit", (e) => {
    e.preventDefault();
    // fetchWeather(input.value);
    weatherDisplay();
    console.log(dataWeather);
});
