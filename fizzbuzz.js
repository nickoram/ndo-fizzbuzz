var FizzBuzz = function() {

};

FizzBuzz.prototype.divisibleBy = function(number, divisor) {
    return number % divisor === 0;
};

module.exports = FizzBuzz;