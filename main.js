const apiKey = "74333ceb8c3de22cd11a92598467c318";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric";
const cityInput = document.querySelector("input");
const cityElement = document.querySelector('.city');
const tempElement = document.querySelector(".temperature");
const humidityElement = document.querySelector(".humidity");
const windElement = document.querySelector(".wind");
const searchBtn = document.querySelector("button");
const weatherIcon = document.querySelector(".weather-icon");
const errorMessage = document.querySelector(".error-message");
const weatherElement = document.querySelector(".weather");

async function getWeather(city) {
    try {
        const response = await fetch(`${apiUrl}&q=${city}&appid=${apiKey}`);
        if (!response.ok) {
            throw new Error('City not found');
        }
        const data = await response.json();
        
        // Update weather information
        cityElement.textContent = data.name;
        tempElement.textContent = `${Math.round(data.main.temp)}°C`;
        humidityElement.textContent = `${data.main.humidity}%`;
        windElement.textContent = `${data.wind.speed} km/h`;

        // Update weather icon based on weather condition
        const weatherMain = data.weather[0].main;
        if (weatherMain == "Clouds") {
            weatherIcon.src = "images/clouds.png";
        } else if (weatherMain == "Clear") {
            weatherIcon.src = "images/clear.png";
        } else if (weatherMain == "Rain") {
            weatherIcon.src = "images/rain.png";
        } else if (weatherMain == "Drizzle") {
            weatherIcon.src = "images/drizzle.png";
        } else if (weatherMain == "Mist") {
            weatherIcon.src = "images/mist.png";
        } else if (weatherMain == "Snow") {
            weatherIcon.src = "images/snow.png";
        } else {
            weatherIcon.src = "images/clouds.png";
        }

        // Clear error and show weather
        errorMessage.textContent = "";
        weatherElement.classList.add('active');
        
    } catch (error) {
        console.error(error);
        errorMessage.textContent = "Please enter a valid city name!";
        weatherElement.classList.remove('active');
    }
}

// Add click event to search button
searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city !== "") {
        getWeather(city);
    } else {
        errorMessage.textContent = "Please enter a city name!";
        weatherElement.classList.remove('active');
    }
});

// Add enter key event to input
cityInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        const city = cityInput.value.trim();
        if (city !== "") {
            getWeather(city);
        } else {
            errorMessage.textContent = "Please enter a city name!";
            weatherElement.classList.remove('active');
        }
    }
});

// Clear error when user starts typing
cityInput.addEventListener("input", () => {
    if (errorMessage.textContent) {
        errorMessage.textContent = "";
    }
});

// Load default weather on page load
document.addEventListener('DOMContentLoaded', () => {
    getWeather("New York");
});