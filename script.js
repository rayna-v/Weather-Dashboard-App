var button = document.querySelectorAll("button")
var searchButton = button[0]
var inputField = document.querySelector("input")
console.log(inputField.value)
var citySearch
// var lat
// var lon
// console.log(lat)
// console.log(lon)

// URLs for APIs
// var weatherAPI = "http://api.openweathermap.org/data/2.5/weather?q=" + citySearch + "&units=imperial&appid=3e4368688e458ef35fad62be7bed14b1"

document.body.children[1].children[0].setAttribute("id", "search-card");
document.body.children[1].children[1].setAttribute("id", "main-card");
var searchCard = document.getElementById("search-card");
var mainCard = document.getElementById("main-card");
var cityNameEl = document.createElement("h2");
var cityHistory = document.createElement("div")
searchCard.append(cityHistory)

// div selector
var divEl = document.querySelectorAll("div");
// console.log(divEl);

searchButton.addEventListener("click", function () {
    citySearch = inputField.value
    var weatherAPI = "http://api.openweathermap.org/data/2.5/weather?q=" + citySearch + "&units=imperial&appid=3e4368688e458ef35fad62be7bed14b1"
    mainCard.innerHTML = "";


    // var history = ("data.name");
    // console.log(localStorage)
    fetch(weatherAPI)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {

            console.log(data)
            localStorage.setItem(data.id, data.name)
            var history = data.name;
            for (var i = 0; i < localStorage.length; i++) {
                var historyButton = document.createElement("button");
                historyButton.setAttribute("id", "button-" + i)
                historyButton.textContent = localStorage;
                // console.log(history);
                cityHistory.prepend(historyButton);
            }

            //city
            cityNameEl.textContent = data.name;
            mainCard.prepend(cityNameEl)
            cityNameEl.setAttribute("style", "padding-top: 10px; color: darkcyan;")

            //date
            // var dateEl = data.dt.getTime()
            // console.log(dateEl)

            //weather icon
            var weatherIcon = document.createElement("img");
            weatherIconSpan = document.createElement("span");
            weatherIcon.setAttribute("src", "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png");
            cityNameEl.append(weatherIcon)

            // temperature elements
            var tempEl = document.createElement("p")
            mainCard.append(tempEl)

            // humidity elements
            var humidEl = document.createElement("p")
            mainCard.append(humidEl)

            // wind speed elements
            var windEl = document.createElement("p");

            // adding temperature value 
            var temp = Math.round(data.main.temp) + "°F";
            tempEl.innerHTML = "Temperature: " + temp + ""

            // adding humidity value 
            var humid = data.main.humidity;
            humidEl.innerHTML = "Humidity: " + humid + "%";

            // adding wind speed and wind direction value 
            var wind = Math.round(data.wind.speed);
            var windDir = data.wind.deg;
            mainCard.append(windEl);


            // conditional statement to compare current wind direction (in degrees) to value range to assign a cardinal wind direction and append it with the wind speed
            if (windDir > 345 && windDir <= 360 || windDir <= 15) {
                var windDirection = "N"
                windEl.innerHTML = "Wind: " + wind + " mph " + windDirection
            } else if (windDir > 15 && windDir <= 35) {
                var windDirection = "N/NE"
                windEl.innerHTML = "Wind: " + wind + " mph " + windDirection
            } else if (windDir > 35 && windDir <= 55) {
                var windDirection = "NE"
                windEl.innerHTML = "Wind: " + wind + " mph " + windDirection
            } else if (windDir > 55 && windDir <= 75) {
                var windDirection = "E/NE"
                windEl.innerHTML = "Wind: " + wind + " mph " + windDirection
            } else if (windDir > 75 && windDir <= 105) {
                var windDirection = "E"
                windEl.innerHTML = "Wind: " + wind + " mph " + windDirection
            } else if (windDir > 105 && windDir <= 125) {
                var windDirection = "E/SE"
                windEl.innerHTML = "Wind: " + wind + " mph " + windDirection
            } else if (windDir > 125 && windDir <= 145) {
                var windDirection = "SE"
                windEl.innerHTML = "Wind: " + wind + " mph " + windDirection
            } else if (windDir > 145 && windDir <= 165) {
                var windDirection = "S/SE"
                windEl.innerHTML = "Wind: " + wind + " mph " + windDirection
            } else if (windDir > 165 && windDir <= 195) {
                var windDirection = "S"
                windEl.innerHTML = "Wind: " + wind + " mph " + windDirection
            } else if (windDir > 195 && windDir <= 215) {
                var windDirection = "S/SW"
                windEl.innerHTML = "Wind: " + wind + " mph " + windDirection
            } else if (windDir > 215 && windDir <= 235) {
                var windDirection = "SW"
                windEl.innerHTML = "Wind: " + wind + " mph " + windDirection
            } else if (windDir > 235 && windDir <= 255) {
                var windDirection = "W/SW"
                windEl.innerHTML = "Wind: " + wind + " mph " + windDirection
            } else if (windDir > 255 && windDir <= 285) {
                var windDirection = "W"
                windEl.innerHTML = "Wind: " + wind + " mph " + windDirection
            } else if (windDir > 285 && windDir <= 305) {
                var windDirection = "W/NW"
                windEl.innerHTML = "Wind: " + wind + " mph " + windDirection
            } else if (windDir > 305 && windDir <= 325) {
                var windDirection = "NW"
                windEl.innerHTML = "Wind: " + wind + " mph " + windDirection
            } else if (windDir > 325 && windDir <= 345) {
                var windDirection = "N/NW"
                windEl.innerHTML = "Wind: " + wind + " mph " + windDirection
            }

            // declaring variables for the latitude and longitude of the query city
            var lat = data.coord.lat
            var lon = data.coord.lon

            var uvAPI = "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=3e4368688e458ef35fad62be7bed14b1"

            fetch(uvAPI)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    // Use the console to examine the response
                    console.log(data)
                    var uvEl = document.createElement("p")
                    var uvSpan = document.createElement("span")
                    var uvButton = document.createElement("button")
                    // uvEl("btn");
                    // uvButton.setAttribute("type", "button", "class", "btn", "data-toggle", "modal", "data-target", "#exampleModal")
                    mainCard.append(uvEl);
                    uvEl.append(uvSpan);
                    uvEl.append(uvButton)
                    var uvIndex = data.value
                    uvEl.innerHTML = "UV Index: " + uvIndex.toFixed(1)
                    uvButton.textContent = uvIndex.toFixed(1)

                    // new UV Index standards, according to the EPA
                    // https://www.epa.gov/sites/production/files/documents/uviguide.pdf
                    if (uvIndex <= 2) {
                        uvButton.setAttribute("type", "button")
                        uvEl.setAttribute("class", "btn low")
                        uvButton.setAttribute("data-toggle", "modal")
                        uvButton.setAttribute("data-target", "#exampleModal")
                        uvButton.setAttribute("html", uvIndex.toFixed(1))
                    } else if (uvIndex > 2 && uvIndex <= 5) {
                        uvEl.setAttribute("class", "btn moderate")
                    } else if (uvIndex > 5 && uvIndex <= 7) {
                        uvEl.setAttribute("class", "btn high")
                    } else if (uvIndex > 7) {
                        uvEl.setAttribute("class", "btn severe")
                    }
                    // row for 5-Day Forecast
                    var forecastRow = document.createElement("div")
                    forecastRow.setAttribute("class", "row");
                    mainCard.append(forecastRow);
                    var forecastEl = document.createElement("h3");
                    forecastEl.textContent = "5-Day Forecast";
                    forecastRow.append(forecastEl);
                    console.log(document)
                    // cards for 5-Day Forecast
                    document.createElement("div").setAttribute("class", "card", "style", "width: 18rem").append(document.createElement("div"))

                })
        })
})