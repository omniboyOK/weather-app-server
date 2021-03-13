var express = require("express");
var app = express();
var port = process.env.PORT;
var WeatherRouter = require("./src/router/WeatherRouter");

app.use(express.json());
app.use(express.urlencoded());
app.enable("trust proxy");

app.get("/ping", function (req, res) {
  res.status(200).json({ message: "pong" });
});

app.use("/v1", WeatherRouter);

app.listen(port, function () {
  console.log("Server running on port", port);
});
