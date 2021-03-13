var express = require("express");
var app = express();
var port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded());

app.listen(port, function () {
  console.log("Server running on port", port);
});
