const result = document.getElementById("result");
const today = document.querySelector(".today");
const weather = document.querySelector(".weather")
const input = document.getElementById("weatherSearch");
const form = document.querySelector("form");
const flex = document.querySelector(".canvas");
let labels = [];
let data = [];
let dataWeather = [];

async function fetchWeather(city) {
    let response = await fetch(`https://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&units=metric&lang=fr&cnt=7&appid=ffb244457d1a960eb98d2cf7933495a9`);
    dataWeather = await response.json();
    console.log(dataWeather);
}

function weatherDisplay() {
    if (Chart.getChart("myChart")){
        Chart.getChart("myChart").destroy();
    }
    labels = []
    data = []
    let dates = dataWeather.list[0].dt
    if (dataWeather === null) {
        result.innerHTML = `<h2>Aucun résultat</h2>`;
    } else {
        result.innerHTML = `
        <h2>${dataWeather.city.country}</h2>
        <h3>${dataWeather.city.name}</h3>
        `;
        today.innerHTML = `
        <h4>${date(dates)}<h4>
        <section class="text">${iconWeather(0)}${Math.round(dataWeather.list[0].temp.max)}° Celcius</section>
        `
        data.push(dataWeather.list[0].temp.max)
        for(let i = 1; i < 6; i++ ){
            dates = dataWeather.list[i].dt
            let number = i
            data.push(dataWeather.list[i].temp.max)
            const day = document.getElementById([i]);
            day.innerHTML = `
        <h4>${date(dates)}<h4>
        <section class="text">${iconWeather(i)} ${Math.round(dataWeather.list[i].temp.max)}° Celcius</section>
      
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
function iconWeather(i){
    switch (dataWeather.list[i].weather[0].id){
        case 800:
            return `<img src="http://openweathermap.org/img/wn/01d@2x.png" alt="Clear">`
        case 801:
            return `<img src="http://openweathermap.org/img/wn/02d@2x.png" alt="un peu de nuage">`
        case 802:
            return `<img src="http://openweathermap.org/img/wn/03d@2x.png" alt="Clouds">`
        case 803:
            return `<img src="http://openweathermap.org/img/wn/04d@2x.png" alt="clouds">`
        case 804:
            return `<img src="http://openweathermap.org/img/wn/04d@2x.png" alt="clouds">`
        case 200 || 201 || 202 || 210 || 211 || 212 || 221 || 230 || 231 || 232:
            return `<img src="http://openweathermap.org/img/wn/11d@2x.png" alt="">`
        case 300 || 301 || 302 || 310 || 311 || 312 || 313 || 314 || 321:
            return `<img src="http://openweathermap.org/img/wn/09d@2x.png" alt="">`
        case 500 || 501 || 502 || 503 || 504:
            return `<img src="http://openweathermap.org/img/wn/10d@2x.png" alt="">`
        case 511:
            return `<img src="http://openweathermap.org/img/wn/13d@2x.png" alt="">`
        case 520 || 521 || 522 || 531:
            return `<img src="http://openweathermap.org/img/wn/09d@2x.png" alt="">`
        case 600 || 601 || 602 || 611 || 612 || 613 || 615 || 616 || 620 || 621 || 622:
            return `<img src="http://openweathermap.org/img/wn/13d@2x.png" alt="">`

        default:
            return `<p>${dataWeather.list[i].weather[0].main}</p>`
    }




}
function date(date) {
    let date1 = new Date(date * 1000)
    let date3 = date1.toLocaleDateString()
    let day = date1.getUTCDay()
    let dayString =""
    dayString = jour(day)
    labels.push(jour(day))
    let dateTotal = dayString + " " + date3
    return dateTotal
}
function jour(jour){
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
    fetchWeather(e.target.value);
});
form.addEventListener("submit", (e) => {
    console.log(input.Value)
    e.preventDefault();
    weatherDisplay();
    input.value = "";
});


