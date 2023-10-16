const API_KEY = `439d4b804bc8187953eb36d2a8c26a02`;
const form = document.querySelector("form");
const search = document.querySelector("#search");
const weather = document.querySelector("#weather");

const getWeather = async (city) => {
  weather.innerHTML = `<h6>Loading...<h6>`;
  const url = `https://openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

  const response = await fetch(url);
  const data = await response.json();
  return showWeather(data);
};

const showWeather = (data) => {
  if (data.cod == 404 || data.cod == 500) {
    weather.innerHTML = `<h4>Try Another City<h4>`;
    return;
  }
  weather.innerHTML = `
        <div>
            <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="">
        </div>
        <div>
            <h2>${data.main.temp} ℃</h2>
            <h4>${data.weather[0].main} </h4>
            <h6>${data.wind.speed} m/s</h6>
        </div>
    `;
};

form.addEventListener("submit", function (event) {
  getWeather(search.value);
  event.preventDefault();
});
