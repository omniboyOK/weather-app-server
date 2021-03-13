const router = require("express").Router();
const WeatherController = require("../controller/WeatherController");

router.get("/location", WeatherController.getLocation);

router.get("/current/:city?", function (req, res) {
  const { city } = req.params;
  res.status(200).json({});
});

router.get("/forecast/:city?", function (req, res) {
  const { city } = req.params;
  res.status(200).json({});
});

module.exports = router;
