import Data from "./config.js";
const input = document.getElementById("weatherSearch");
const form = document.querySelector("form");


let labels = [];
let data = [];
let dataWeather = [];

 const fetchWeather = async (city) => {
    let url = "https://api.openweathermap.org/data/2.5/forecast/daily?q="+ city +"&units=metric&lang=fr&cnt=7&appid=" + Data.key;
    let response = await fetch(url);
    dataWeather = await response.json();
}

const weatherDisplay = () => {
    const result = document.getElementById("result");
    const today = document.querySelector(".today");
    if (Chart.getChart("myChart")){
        Chart.getChart("myChart").destroy();
    }
    let dates = dataWeather.list[0].dt
    if (dataWeather === null) {
        result.innerHTML = `<h2>Aucun résultat</h2>`;
    } else {
        result.innerHTML = `
        <h2>${dataWeather.city.country}</h2>
        <h3>${dataWeather.city.name}</h3>
        `;
        today.innerHTML = `
        <h4>${getDate(dates)}<h4>
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
        <h4>${getDate(dates)}<h4>
        <section class="text"><img src="http://openweathermap.org/img/wn/${list.weather[0].icon}@2x.png" 
        alt="${list.description}"> ${Math.round(list.temp.max)}° Celcius</section>
        <p>${list.weather[0].description}</p>
      
        `
        }
    }

    let ctx = document.querySelector(".myChart")
    let myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels:labels,
            datasets: [{
                label : "Température",
                data: data,
                fill: false,
                borderColor: 'red'
            }]
        }
    });
}



const getDate = (date) => {
    let newDate = new Date(date * 1000)
    let dates = newDate.toLocaleDateString()
    let day = newDate.getUTCDay()
    let dayString =""
    dayString = getJour(day)
    labels.push(dayString)
    let dateTotal = dayString + " " + dates
    return dateTotal
}

const getJour = (jour) =>{
    let dayString =""
    switch (jour){
        case 1:
            return  "Lundi"
            break
        case 2:
            return  "Mardi"
            break
        case 3:
            return  "Mercredi"
            break
        case 4:
            return "Jeudi"
            break
        case 5:
            return  "Vendredi"
            break
        case 6:
            return  "Samedi"
            break
        case 0:
            return "Dimanche"
    }
}

input.addEventListener("input", (e) => {
    let City = e.target.value.toLowerCase()
    fetchWeather(City);
});

form.addEventListener("submit", (e) => {


    e.preventDefault();
    weatherDisplay();
    input.value = "";
});


