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

    describe("convertToFizzBuzz()", function() {
        it("when divisible by 3", function() {
            expect(fizzbuzz.convertToFizzBuzz(3)).to.be.eql("Fizz");
            expect(fizzbuzz.convertToFizzBuzz(6)).to.be.eql("Fizz");
        });

        it("when divisible by 5", function() {
            expect(fizzbuzz.convertToFizzBuzz(5)).to.be.eql("Buzz");
            expect(fizzbuzz.convertToFizzBuzz(10)).to.be.eql("Buzz");
        });

        it("when divisible by 15", function() {
            expect(fizzbuzz.convertToFizzBuzz(15)).to.be.eql("FizzBuzz");
            expect(fizzbuzz.convertToFizzBuzz(30)).to.be.eql("FizzBuzz");
        });

        it("when not divisible by 3, 5, or 15", function() {
            expect(fizzbuzz.convertToFizzBuzz(4)).to.be.eql("4");
            expect(fizzbuzz.convertToFizzBuzz(7)).to.be.eql("7");
        });
    });
});
