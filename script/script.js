import fetchWeather from "./fetchWeather.js";

const input = document.getElementById("weatherSearch");
const form = document.querySelector("form");
let City


window.addEventListener("load", () => {
    fetchWeather("namur");
});


input.addEventListener("keyup", (e) => {
    City = e.currentTarget.value.toLowerCase()


});

form.addEventListener("keypress", (e) => {

    if (e.key === "Enter") {
        fetchWeather(City);
        e.preventDefault();
        input.value = "";
    }


});


