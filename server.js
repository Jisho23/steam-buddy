var constants = require("./constants");
var express = require("express");

var app = express();

var request = require("request");

app.get("/steam/user/:appid/games", function(httpRequest, httpResponse) {
  var url =
    "http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/" +
    "?key=" +
    constants.KEY +
    "&steamid=" +
    httpRequest.params.appid +
    "&format=json";
  request.get(url, function(error, steamHttpResponse, steamHttpBody) {
    httpResponse.setHeader("Content-Type", "application/json");
    httpResponse.send(steamHttpBody);
  });
});

app.get("/steam/game/:appid", function(httpRequest, httpResponse) {
  var url =
    "http://store.steampowered.com/api/appdetails?appids=" +
    httpRequest.params.appid +
    "&format=json";
  request.get(url, function(error, steamHttpResponse, steamHttpBody) {
    httpResponse.setHeader("Content-Type", "application/json");
    httpResponse.send(steamHttpBody);
  });
});

app.use("/", express.static("public"));

var bodyParser = require("body-parser");

app.use(bodyParser.text());

var port = 4000;
var server = app.listen(port);
console.log("Listening on port " + port);
