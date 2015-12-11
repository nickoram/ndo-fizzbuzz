var express = require("express");
var app = express();
var fizzbuzz = require("./fizzbuzz");

var server_port = process.env.VCAP_APP_PORT || 8080;
var server_host = process.env.VCAP_APP_HOST || "localhost";

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

app.listen(server_port, server_host, function() {
    var host = this.address().address;
    var port = this.address().port;
    console.log("Listening at http://%s:%s", host, port);
});

