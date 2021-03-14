const WeatherService = require("../service/WeatherService");

const Controller = {
  getCityWeather: function (req, res) {
    let { location } = res.locals;

    if (!location) {
      return res.status(400).json({ message: "bad request" });
    }

    WeatherService.getWeatherByCity(location)
      .then((result) => {
        return res.status(200).json(result);
      })
      .catch((error) => {
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
        return res.status(200).json({ city, list });
      })
      .catch((error) => {
        return res.status(404).json({ message: "city not found" });
      });
  },
};

module.exports = Controller;
