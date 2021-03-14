const axios = require("axios");

const URL = "https://api.openweathermap.org/data/2.5/weather?";
const KEY = process.env.WEATHER_KEY;

const Service = {
  getWeatherByCity: function (city) {
    return axios
      .get(`${URL}q=${city}&appid=${KEY}`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return Promise.reject()
      });
  },
};

module.exports = Service;

