var express = require("express");
var cors = require("cors");
var logger = require("morgan");
var bodyParser = require("body-parser");

var app = express();

// CORS
app.use(cors())

// Enable the logs
app.use(logger("dev"));

// Convert the body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require("./routes/api_rest")(app);

app.use(function(req, res, next) {
  res.status(404);

  console.log("req.url:", req.url);
  console.log("req.params:", req.params);
  console.log("req.body:", req.body);

  // respond with json
  if (req.accepts("json")) {
    res.send({ error: `Recurso ${req.url} no encontrado!` });
    return;
  }

  // default to plain-text. send()
  res.type("txt").send("Not found");
});

var port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log("Running the backend on port " + port + "!");
});

module.exports = app;
