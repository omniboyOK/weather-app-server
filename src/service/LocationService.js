const ipapi = require("ipapi.co");
const Service = {
  getLocation: async function (req, res, next) {
    if (req.params.city) {
      res.locals.location = req.params.city;
      return next();
    }

    const { ip } = req;
    ipapi.location(function (result) {
      if (result.error) {
        res
          .status(404)
          .json({ city: "Unkown", error: "Could not get location" });
      } else {
        res.locals.location = result;
        return next();
        // res.status(200).json(result);
      }
    }, ip);
  },
};

module.exports = Service;
