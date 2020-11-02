// declaring and initializing variables in global memory to store location of HTML elements
var button = document.querySelectorAll("button")
var searchButton = button[0]
var historyButton
var inputField = document.querySelector("input")
// var formGroup = document.getElementsByClassName("form-group")
// setting ID attributes for cards in HTML
document.body.children[1].children[0].children[0].setAttribute("id", "search-card");
document.body.children[1].children[1].setAttribute("id", "main-card");
// declaring and initializing variables in global memory to store location of card elements by ID
var searchCard = document.getElementById("search-card");
var mainCard = document.getElementById("main-card");
// creating elements and storing location in global memory
var cityNameEl = document.createElement("h2");
var cityHistory = document.createElement("div")
var historyPEl = document.createElement("p");
cityHistory.setAttribute("class", "btn-group-vertical")
cityHistory.setAttribute("style", "width: 100%;")
historyPEl.setAttribute("style", "padding-top: 12px; font-size: 18px;")
historyPEl.textContent = "Search History: "
searchCard.append(cityHistory)


// searchButton.addEventListener("click", 
function getWeather() {
    citySearch = inputField.value
    var weatherAPI = "http://api.openweathermap.org/data/2.5/weather?q=" + citySearch + "&units=imperial&appid=3e4368688e458ef35fad62be7bed14b1"
    mainCard.innerHTML = "";
    document.body.children[1].children[0].children[0].children[0].append(historyPEl)

    fetch(weatherAPI)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {

            console.log(data)
            localStorage.setItem(data.id, data.name)

            historyButton = document.createElement("button");
            historyButton.setAttribute("id", "button-" + data.id)
            historyButton.setAttribute("style", "text-align: left")
            historyButton.setAttribute("class", "btn btn-info btn-lg")

            // historyButton.setAttribute()
            historyButton.textContent = localStorage.getItem(data.id);
            // console.log(history);
            cityHistory.prepend(historyButton);

            historyButton.addEventListener("click", function (event) {
                console.log(event.target)
                var citySearch = localStorage.getItem(event.target.id)
                getWeather()
            })

            var cityName = cityNameEl.textContent = data.name;
            mainCard.prepend(cityNameEl)
            cityNameEl.setAttribute("style", "padding-top: 10px; color: darkcyan;")

            //date
            var dtStamp = new Date(data.dt * 1000);
            var currentDate = dtStamp.toLocaleDateString()
            cityNameEl.textContent = cityName + " (" + currentDate + ") ";

            //weather icon
            var weatherIcon = document.createElement("img");
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
            // concatenating URL for UV info with lat and lon from query city
            var uvAPI = "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=3e4368688e458ef35fad62be7bed14b1"

            fetch(uvAPI)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    console.log(data)
                    // declaring and initializing variables in global memory to store location of HTML elements
                    var uvEl = document.createElement("p")
                    var uvSpan = document.createElement("span")
                    var uvButton = document.createElement("button")
                    // appending HTML elements to document
                    mainCard.append(uvEl);
                    uvEl.append(uvSpan);
                    uvEl.append(uvButton)
                    // storing values and adding text 
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
                    // creating elements, adding classes and text, and appending
                    var forecastRow = document.createElement("div")
                    forecastRow.setAttribute("class", "row");
                    mainCard.append(forecastRow);
                    var forecastEl = document.createElement("h3");
                    forecastEl.textContent = "5-Day Forecast";
                    forecastRow.append(forecastEl);
                    var cardRow = document.createElement("div");
                    cardRow.setAttribute("class", "row");
                    mainCard.append(cardRow);

                    // var forecastAPI = "http://api.openweathermap.org/data/2.5/forecast?q=" + citySearch + "&units=imperial&appid=3e4368688e458ef35fad62be7bed14b1"
                    var forecastAPI = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=hourly,minutely&units=imperial&appid=3e4368688e458ef35fad62be7bed14b1"
                    fetch(forecastAPI)
                        .then(function (response) {
                            return response.json();
                        })
                        .then(function (data) {
                            console.log(data)

                            // cards for 5-Day Forecast
                            for (var i = 1; i < 6; i++) {
                                // creating cards for each day of the forecast
                                var forecastCard = document.createElement("div") // main card div
                                forecastCard.setAttribute("class", "card col-lg-2 col-md-6");
                                forecastCard.setAttribute("style", "margin-left: 10px; margin-bottom: 10px; padding: 2px;")
                                cardRow.append(forecastCard);
                                var forecastBodyCard = document.createElement("div");
                                forecastBodyCard.setAttribute("class", "card-body");
                                forecastCard.append(forecastBodyCard)

                                // adding date to forecast cards as h4
                                var dateH4El = document.createElement("h4");
                                var dtStamp = new Date(data.daily[i].dt * 1000);
                                var forecastDate = dtStamp.toLocaleDateString()
                                dateH4El.textContent = forecastDate
                                forecastBodyCard.append(dateH4El);

                                // adding weather icon to forecast cards as img
                                var iconForecast = data.daily[i].weather[0].icon
                                var iconImgEl = document.createElement("img");
                                iconImgEl.setAttribute("src", "http://openweathermap.org/img/w/" + iconForecast + ".png")
                                forecastBodyCard.append(iconImgEl);

                                // adding temperature to forecast cards as p
                                var tempPEl = document.createElement("p");
                                var temp = Math.round(data.daily[i].temp.day) + "°F";
                                tempPEl.textContent = "Temp: " + temp
                                forecastBodyCard.append(tempPEl);

                                // adding humidity to forecast cards as p
                                var humidPEl = document.createElement("p");
                                var humid = Math.round(data.daily[i].humidity)
                                humidPEl.textContent = "Humidity: " + humid + "%"
                                forecastBodyCard.append(humidPEl);
                            }

                        })
                })


        })
}
var citySearch = inputField.value
searchButton.addEventListener("click", getWeather)