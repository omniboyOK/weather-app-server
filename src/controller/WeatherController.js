const ipapi = require("ipapi.co");
const Controller = {
  getLocation: async function (req, res) {
    const { ip } = req;
    ipapi.location(function (result) {
      if (result.error) {
        res
          .status(404)
          .json({ city: "Unkown", error: "Could not get location" });
      } else {
        res.status(200).json(result);
      }
    }, ip);
  },
};

module.exports = Controller;
