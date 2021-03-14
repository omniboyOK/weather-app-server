const ipapi = require("ipapi.co");
const Service = {
  getLocation: async function (req, res, next) {
    const { city } = req.params;
    const { ip } = req;

    if (city) {
      res.locals.location = req.params.city;
      return next();
    }

    if (ip) {
      ipapi.location(function (result) {
        if (result.error) {
          return res.status(400).json({ error: "couldn't get location by ip" });
        } else {
          res.locals.location = result;
          return next();
        }
      }, ip);
    } else {
      return res
        .status(400)
        .json({ error: "missing header data and city parameter" });
    }
  },
};

module.exports = Service;