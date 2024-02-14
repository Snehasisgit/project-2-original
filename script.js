const apiKey = "c71cb55d0080db62a0c8b06d473f7f0a";
        const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
        const searchBox = document.querySelector(".search input");
        const searchBtn = document.querySelector(".search button");
        const weatherIcon = document.querySelector(".weather img");
        const tempElement = document.querySelector(".temp");
        const cityElement = document.querySelector(".city");
        const humidityElement = document.querySelector(".humidity");
        const windElement = document.querySelector(".wind");
        const errorElement = document.querySelector(".error");

        async function checkWeather(city) {
            try {
                const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);
                if (response.status === 404) {
                    errorElement.style.display = "block";
                    document.querySelector(".weather").style.display = "none";
                } else {
                    const data = await response.json();
                    cityElement.innerHTML = data.name;
                    tempElement.innerHTML = Math.round(data.main.temp) + "°C";
                    humidityElement.innerHTML = data.main.humidity + "%";
                    windElement.innerHTML = data.wind.speed + " km/h";

                    if (data.weather[0].main === "Clouds") {
                        weatherIcon.src = "images/clouds.png";
                    } else if (data.weather[0].main === "Clear") {
                        weatherIcon.src = "images/clear.png";
                    } else if (data.weather[0].main === "Rain") {
                        weatherIcon.src = "images/rain.png";
                    } else if (data.weather[0].main === "Drizzle") {
                        weatherIcon.src = "images/drizzle.png";
                    } else if (data.weather[0].main === "Mist") {
                        weatherIcon.src = "images/mist.png";
                    }

                    document.querySelector(".weather").style.display = "block";
                    errorElement.style.display = "none";
                }
            } catch (error) {
                console.error("Error fetching weather data:", error);
            }
        }

        searchBtn.addEventListener("click", () => {
            checkWeather(searchBox.value);
        });

        // Default city on page load
        checkWeather("Bangalore");