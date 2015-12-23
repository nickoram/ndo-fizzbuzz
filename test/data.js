var Data = function () {
    // mock data class
};

Data.prototype.testResult = [{
    "from": "1",
    "to": "20",
    "result": ["1", "2", "Fizz", "4", "Buzz", "Fizz", "7", "8", "Fizz",
        "Buzz", "11", "Fizz", "13", "14", "FizzBuzz", "16", "17",
        "Fizz", "19", "Buzz"
    ]
}, {
    "from": "2",
    "to": "21",
    "result": ["2", "Fizz", "4", "Buzz", "Fizz", "7", "8", "Fizz",
        "Buzz", "11", "Fizz", "13", "14", "FizzBuzz", "16", "17",
        "Fizz", "19", "Buzz", "Fizz"
    ]
}];

Data.prototype.dbResult = [{
    "total_rows": 7,
    "offset": 6,
    "rows": [{
        "id": "35523244d141fb56c2e6b8dfa58d7fed",
        "key": ["1", "20"],
        "value": null,
        "doc": {
            "_id": "35523244d141fb56c2e6b8dfa58d7fed",
            "_rev": "1-a0337a71e877726cb8fda7d6ceeb2bfc",
            "from": "1",
            "to": "20",
            "result": ["1", "2", "Fizz", "4", "Buzz", "Fizz",
                "7", "8", "Fizz", "Buzz", "11", "Fizz",
                "13", "14", "FizzBuzz", "16", "17", "Fizz",
                "19", "Buzz"
            ]
        }
    }]
}, {
    "total_rows": 7,
    "offset": 7,
    "rows": []
}];

module.exports = new Data();
