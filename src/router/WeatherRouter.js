const router = require("express").Router();
const WeatherController = require("../controller/WeatherController");
const LocationService = require("../service/LocationService");

router.get("/location", LocationService.getLocation, function (req, res) {
  let { location } = res.locals;
  res.status(200).json(location);
});

router.get("/current/:city?", LocationService.getLocation, WeatherController.getCityWeather);

router.get("/forecast/:city?", LocationService.getLocation, WeatherController.getCityForecast);

module.exports = router;
