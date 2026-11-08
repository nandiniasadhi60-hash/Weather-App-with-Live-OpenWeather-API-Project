
const API_KEY = "YOUR_API_KEY";

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const message = document.getElementById("message");
const weatherResult = document.getElementById("weatherResult");

async function getWeather() {
    const city = cityInput.value.trim();

    if (city === "") {
        message.textContent = "Please enter a city name!";
        weatherResult.hidden = true;
        return;
    }

    if (API_KEY === "YOUR_API_KEY") {
        message.textContent = "Please add your OpenWeather API key.";
        weatherResult.hidden = true;
        return;
    }

    message.textContent = "Loading weather...";
    weatherResult.hidden = true;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Unable to get weather data.");
        }

        document.getElementById("cityName").textContent =
            `${data.name}, ${data.sys.country}`;

        document.getElementById("temperature").textContent =
            `${Math.round(data.main.temp)}°C`;

        document.getElementById("description").textContent =
            data.weather[0].description;

        document.getElementById("humidity").textContent =
            `${data.main.humidity}%`;

        document.getElementById("wind").textContent =
            `${data.wind.speed} m/s`;

        document.getElementById("weatherIcon").src =
            `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

        message.textContent = "";
        weatherResult.hidden = false;

    } catch (error) {
        message.textContent = error.message === "city not found"
            ? "City not found. Please enter a valid city."
            : error.message;

        weatherResult.hidden = true;
    }
}

searchBtn.addEventListener("click", getWeather);

cityInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        getWeather();
    }
});
