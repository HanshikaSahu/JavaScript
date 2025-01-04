const inputBox = document.querySelector(".input-box");
const searchBtn = document.querySelector(".search-btn");
const weatherImg = document.querySelector(".weather-img");
const temperature = document.querySelector(".temperature");
const description = document.querySelector(".description");
const humidity = document.getElementById('humdity');
const wind = document.getElementById('wind');
const locationNotFound = document.querySelector(".not-found");
const weatherBody = document.querySelector(".weather-body");

async function checkWeather(city){
    const apiKey = "02844e06698e524a02f2bec1fd7aef6b";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    
    const weatherData = await fetch(`${url}`).then
    (response => response.json());
    console.log(weatherData);

    if(weatherData.cod === "404"){
        locationNotFound.style.display = "flex";
        weatherBody.style.display = "none";
        return;
    }

    locationNotFound.style.display = "none";
    weatherBody.style.display = "flex";
    temperature.innerHTML = `${Math.round(weatherData.main.temp - 273.15)}°C`;
    description.innerHTML = `${weatherData.weather[0].description}`;
    humidity.innerHTML = `${weatherData.main.humidity}%`;
    wind.innerHTML = `${weatherData.main.wind.speed}km/h`;
    
    switch(weatherData.weather[0].main){
        case 'Clouds':
            weatherImg.src = "cloud.webp";
            break;
        case 'Clear':
            weatherImg.src = "clear.png";
            break;
        case 'Rain':
            weatherImg.src = "rain.webp";
            break;
        case 'Mist':
            weatherImg.src = "mist.png";
            break;
        case 'Snow':
            weatherImg.src = "snow.png";
            break;
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(inputBox.value);
})