import getDate from "./getDate.js";
import charts from "./charts.js";
let labels = [];
let data = [];
const weatherDisplay = (dataWeather) => {
    labels = [];
    data = []
    const result = document.getElementById("result");
    const today = document.querySelector(".today");

    let dates = dataWeather.list[0].dt
    result.innerHTML = `
        <h2>${dataWeather.city.country}</h2>
        <h3>${dataWeather.city.name}</h3>
        `;
    today.innerHTML = `
        <h4>${getDate(dates,labels)}<h4>
        <section class="text">
        <img 
        src="http://openweathermap.org/img/wn/${dataWeather.list[0].weather[0].icon}@2x.png" 
        alt="${dataWeather.list[0].weather[0].description}">
        ${Math.round(dataWeather.list[0].temp.max)}° Celcius
        
        </section>
        <p>${dataWeather.list[0].weather[0].description}</p>
        `
    data.push(dataWeather.list[0].temp.max)
    for(let i = 1; i < 6 ; i++ ){
        dates = dataWeather.list[i].dt
        data.push(dataWeather.list[i].temp.max)
        const day = document.getElementById([i]);
        const list = dataWeather.list[i];
        day.innerHTML = `
        <h4>${getDate(dates,labels)}<h4>
        <section class="text"><img src="http://openweathermap.org/img/wn/${list.weather[0].icon}@2x.png" 
        alt="${list.description}"> ${Math.round(list.temp.max)}° Celcius</section>
        <p>${list.weather[0].description}</p>
      
        `
    }
    charts(labels, data);
}

export default weatherDisplay