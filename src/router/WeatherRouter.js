const router = require("express").Router();

router.get("/location", function (req, res) {
  res.status(200).json({});
});

router.get("/current/:city?", function (req, res) {
  const { city } = req.params;
  res.status(200).json({});
});

router.get("/forecast/:city?", function (req, res) {
  const { city } = req.params;
  res.status(200).json({});
});

module.exports = router;
