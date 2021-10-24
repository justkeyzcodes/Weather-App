let currentTime = new Date();

function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  let currentDay = days[date.getDay()];
  let currentMonth = months[date.getMonth()];
  let currentDate = date.getDate();
  let currentYear = date.getFullYear();
  let currentHours = date.getHours();
  let currentMinutes = date.getMinutes();

  let formattedDate = `${currentDay}, ${currentMonth} ${currentDate}, ${currentYear} | ${currentHours}:${currentMinutes}`;

  return formattedDate;
}

function showTemperature(response) {
  console.log(response);
  let temperature = Math.round(response.data.main.temp);
  let h3 = document.querySelector("#temperature");
  h3.innerHTML = `${temperature}°F`;
}

function displayCityWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
}

function searchCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let searchCity = document.querySelector("h1");
  let city = cityInput.value;
  searchCity.innerHTML = cityInput.value;
  let apiKey = "46fac47dd8b8fa26d1b6852218ad3dfe";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function searchLocation(position) {
  let apiKey = "46fac47dd8b8fa26d1b6852218ad3dfe";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayCityWeather);
}

function currentTemperature(event) {
  let cityElement = document.querySelector("#city");
  let cityInput = document.querySelector("#city-input");
  cityElement.innerHTML = cityInput.value;
}

let searchForm = document.querySelector("form");
searchForm.addEventListener("submit", searchCity);

let dateElement = document.querySelector("#date");
dateElement.innerHTML = formatDate(currentTime);

navigator.geolocation.getCurrentPosition(currentTemperature);
navigator.geolocation.getCurrentPosition(searchLocation);

console.log(currentTemperature);
