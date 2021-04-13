const ipapi = require("ipapi.co");
const Service = {
  getLocation: async function (req, res, next) {
    /**
     * Recibimos un parametro city como string
     * y tomamos el ip de la request
     */
    const { city } = req.params;
    const { ip } = req;

    // Si tenemos la ciudad se la pasamos a express
    if (city) {
      res.locals.location = req.params.city;
      return next();
    }

    // Si no tenemos la ciudad utilizamos la ip
    if (ip) {
      ipapi.location(function (result) {
        if (result.error) {
          res.locals.location = "Buenos Aires";
          return next();
        } else {
          res.locals.location = result.city;
          return next();
        }
      }, ip);
    } else {
      // Si no tenemos la ciudad ni acceso a la ip rechazamos la request
      return res
        .status(400)
        .json({ error: "missing header data and city parameter" });
    }
  },
};

module.exports = Service;
