var FizzBuzz = require("../fizzbuzz");

describe("FizzBuzz", function() {
	var fizzbuzz = new FizzBuzz();
	
	describe("divisibleBy()", function() {
        it("when divisible", function() {
            expect(fizzbuzz.divisibleBy(3,3)).to.be.eql(true);
        });
        
        it("when not divisable", function() {
            expect(fizzbuzz.divisibleBy(3,2)).to.be.eql(false);
        });
    });
});
