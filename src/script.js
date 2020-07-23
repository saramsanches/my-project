let currentTime = new Date();

let h3 = document.querySelector(".hours");

let date = currentTime.getDate();
let hours = currentTime.getHours();
let minutes = currentTime.getMinutes();
let year = currentTime.getFullYear();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[currentTime.getDay()];
let months = [
  "January",
  "February",
  "March",
  "April",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[currentTime.getMonth()];

h3.innerHTML = `${day} ${month} ${date} ${year}, ${hours}:${minutes}`;

function showTemperature(response) {
  console.log(response);

  let cityTemp = Math.round(response.data.main.temp);
  let todayTemp = document.querySelector(".todayTemperature");
  let rangeTemp = document.querySelector(".todayMinMax");
  let humidity = document.querySelector("#hum");
  let prediction = document.querySelector("#pred");
  let cityName = document.querySelector(".city");
  todayTemp.innerHTML = `${cityTemp}ºC`;
  rangeTemp.innerHTML = `${response.data.main.temp_min}ºC | ${response.data.main.temp_max}ºC`;
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  prediction.innerHTML = `Prediction: ${response.data.weather[0].description}`;
  cityName.innerHTML = `${response.data.name}`;
}

function showCityTemperature(event) {
  let city = document.querySelector("#enterCity");
  let apiKey = "540573f8fa49b4473d94a3c057290a63";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}

function changeCity(event) {
  event.preventDefault();

  let cityInput = document.querySelector("#enterCity");

  let cityOut = document.querySelector(".city");
  if (cityInput.value) {
    cityOut.innerHTML = `${cityInput.value}`;
  } else {
    alert("Please type a city...");
  }
}

let cityForm = document.querySelector("#city-form");

cityForm.addEventListener("submit", changeCity);
cityForm.addEventListener("submit", showCityTemperature);

function changeToCelsius(event) {
  event.preventDefault();
  let celsius = document.querySelector(".todayTemperature");
  celsius.innerHTML = "26ºC";
}
let chooseCelsius = document.querySelector("#linkCelsius");
chooseCelsius.addEventListener("click", changeToCelsius);

function changeToFahrenheit(event) {
  event.preventDefault();
  let fahrenheit = document.querySelector(".todayTemperature");
  fahrenheit.innerHTML = "78,8ºF";
}
let chooseFahrenheit = document.querySelector("#linkFahrenheit");
chooseFahrenheit.addEventListener("click", changeToFahrenheit);

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  console.log(latitude);

  let apiKey = "540573f8fa49b4473d94a3c057290a63";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}

function showGeolocation(event) {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let positionButton = document.querySelector(".position");
positionButton.addEventListener("click", showGeolocation);
