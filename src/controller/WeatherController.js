const moment = require("moment");
const WeatherService = require("../service/WeatherService");

const Controller = {
  getCityWeather: function (req, res) {
    let { location } = res.locals;
    if (!location) {
      return res.status(400).json({ message: "bad request" });
    }

    WeatherService.getWeatherByCity(location)
      .then((result) => {
        result.weather = result.weather[0];
        let timezoneInMinutes = result.timezone / 60;
        result.date = moment()
          .utcOffset(timezoneInMinutes)
          .format("HH:mm DD/MM");
        return res.status(200).json(result);
      })
      .catch((error) => {
        console.log(error);
        return res.status(404).json({ message: "city not found" });
      });
  },
  getCityForecast: function (req, res) {
    let { location } = res.locals;

    if (!location) {
      return res.status(400).json({ message: "bad request" });
    }

    WeatherService.getForecastByCity(location)
      .then((result) => {
        let { list, city } = result;

        list.forEach((item) => {
          let timezoneInMinutes = city.timezone / 60;
          item.date = moment(item.dt_txt)
            .utcOffset(timezoneInMinutes)
            .format("HH:mm DD/MM");
          item.weather = item.weather[0];
        });

        return res.status(200).json({ city, list });
      })
      .catch((error) => {
        return res.status(404).json({ message: "city not found" });
      });
  },
};

module.exports = Controller;
