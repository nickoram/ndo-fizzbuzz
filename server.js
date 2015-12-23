var express = require("express");
var app = express();
var fizzbuzz = require("./fizzbuzz");
var cachefizzbuzz = require("./cachefizzbuzz");

var serverPort = process.env.VCAP_APP_PORT || 8080;
var serverHost = process.env.VCAP_APP_HOST || "localhost";

var dbUrl = "";
if (process.env.VCAP_SERVICES) {
    var env = JSON.parse(process.env.VCAP_SERVICES);
    dbUrl = env.cloudantNoSQLDB[0].credentials.url + "/fizzbuzz-web";
} else {
    dbUrl = "http://localhost:8080/fizzbuzz-web";
}

app.get("/fizzbuzz_range/:from/:to", function(request, response) {
    var f = new fizzbuzz();
    var from = request.params.from;
    var to = request.params.to;

    response.send({
        "from": from,
        "to": to,
        "result": f.convertRangeToFizzBuzz(from, to)
    });
});

app.get("/cache_fizzbuzz_range/:from/:to", function(request, response) {
    var c = new cachefizzbuzz(dbUrl);
    var from = request.params.from;
    var to = request.params.to;

    c.fizzBuzzRange(from, to, function(data) {
        response.send(data);
    });
});

app.listen(serverPort, serverHost, function() {
    var host = this.address().address;
    var port = this.address().port;
    console.log("Listening at http://%s:%s", host, port);
});
