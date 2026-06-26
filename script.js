
// ===============================
// Weather API Key
// ===============================

const apiKey = "4313f3a848934a82878140511262606";

// ===============================
// DOM Elements
// ===============================
const themeBtn = document.getElementById("themeBtn");
const body = document.body;
const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

const city = document.getElementById("city");
const country = document.getElementById("country");

const temperature = document.getElementById("temperature");
const description = document.getElementById("description");

const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const pressure = document.getElementById("pressure");
const visibility = document.getElementById("visibility");
const feelsLike = document.getElementById("feelsLike");
const uv = document.getElementById("uv");

const weatherIcon = document.getElementById("weatherIcon");

const date = document.getElementById("date");
const time = document.getElementById("time");

const loading = document.querySelector(".loading");
const error = document.querySelector(".error");
const weatherCard = document.querySelector(".weather-card");
const detailsGrid = document.querySelector(".details-grid");

// ===============================
// Search Button
// ===============================

searchBtn.addEventListener("click", () => {

    const cityName = cityInput.value.trim();

    if(cityName !== ""){

        getWeather(cityName);

    }

});

// ===============================
// Enter Key Support
// ===============================

cityInput.addEventListener("keydown", function(event){

    if(event.key === "Enter"){

        searchBtn.click();

    }

});

async function getWeather(cityName){

    loading.classList.remove("hidden");
    error.classList.add("hidden");
    weatherCard.classList.add("hidden");
    detailsGrid.classList.add("hidden");

    try{

        const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cityName}&aqi=yes`;

        const response = await fetch(url);

        const data = await response.json();

        if(data.error){

            throw new Error(data.error.message);

        }

        displayWeather(data);

    }

    catch(err){

        error.classList.remove("hidden");

    }

    finally{

        loading.classList.add("hidden");

    }

}
function displayWeather(data){

    city.textContent = data.location.name;

    country.textContent = data.location.country;

    temperature.textContent = `${data.current.temp_c}°C`;

    description.textContent = data.current.condition.text;

    humidity.textContent = `${data.current.humidity}%`;

    wind.textContent = `${data.current.wind_kph} km/h`;

    pressure.textContent = `${data.current.pressure_mb} mb`;

    visibility.textContent = `${data.current.vis_km} km`;

    feelsLike.textContent = `${data.current.feelslike_c}°C`;

    uv.textContent = data.current.uv;

    weatherIcon.src = "https:" + data.current.condition.icon;

    weatherIcon.alt = data.current.condition.text;

    weatherCard.classList.remove("hidden");

    detailsGrid.classList.remove("hidden");

    updateDateTime();
    updateBackground(data.current.condition.text);
    weatherIcon.src = "https:" + data.current.condition.icon;

}

function updateBackground(weather){

    weather = weather.toLowerCase();

    if(weather.includes("sun")){

        document.body.style.background =
        "linear-gradient(135deg,#FDB813,#FF7E5F)";

    }

    else if(weather.includes("rain")){

        document.body.style.background =
        "linear-gradient(135deg,#4facfe,#1e3c72)";

    }

    else if(weather.includes("cloud")){

        document.body.style.background =
        "linear-gradient(135deg,#8E9EAB,#EEF2F3)";

    }

    else if(weather.includes("snow")){

        document.body.style.background =
        "linear-gradient(135deg,#E6DADA,#274046)";

    }

    else{

        document.body.style.background =
        "linear-gradient(135deg,#4facfe,#00f2fe)";

    }

}


function updateDateTime(){

    const now = new Date();

    date.textContent = now.toDateString();

    time.textContent = now.toLocaleTimeString();

}

updateDateTime();
setInterval(updateDateTime,1000);
// ===============================
// Dark Mode
// ===============================

themeBtn.addEventListener("click", () => {

    body.classList.toggle("dark");

    const icon = themeBtn.querySelector("i");

    if(body.classList.contains("dark")){

        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");

    }

    else{

        icon.classList.remove("fa-sun");
        icon.classList.add("fa-moon");

    }

});
getWeather("Lahore");