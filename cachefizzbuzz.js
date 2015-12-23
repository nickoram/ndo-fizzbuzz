var fizzbuzz = require("./fizzbuzz");
var cloudant = require("cloudant");

var CacheFizzBuzz = function(dbUrl) {
    this.dbUrl = dbUrl;
    this.cloudant = new cloudant(dbUrl);
    this.fizzbuzz = new fizzbuzz();
};

CacheFizzBuzz.prototype.fizzBuzzRange = function(start, end, callback) {
    var params = {
        key: [start, end],
        include_docs: true
    };

    this.cloudant.view('fb', 'range', params, function(error, body) {
        this.process(error, body, start, end, callback);
    });
};

// store calculated result to database
CacheFizzBuzz.prototype.save = function(data) {
    this.cloudant.insert(data);
};

// process database result
CacheFizzBuzz.prototype.process = function(error, body, start, end, callback) {
    var data = {};

    if (!error && body.rows.length > 0) {
        var doc = body.rows[0].doc;
        delete doc._id;
        delete doc._rev;
        data = doc;
    } else {
        data = {
            from: start,
            to: end,
            result: this.fizzbuzz.convertRangeToFizzBuzz(start, end)
        };

        if (!error) {
            this.save(data);
        }
    }

    callback(data);
};

module.exports = CacheFizzBuzz;
