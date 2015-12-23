var sinon = require("sinon");
var data = require("./data");
var cachefizzbuzz = require("../cachefizzbuzz");

describe("CacheFizzBuzz", function() {
    var c = new cachefizzbuzz("http://user:password@localhost:8080/fizzbuzz-web");

    describe("save()", function() {
        it("calls cloudant to store a document", function() {
            var mock = sinon.mock(c.cloudant);
            mock.expects("insert").withArgs(data.testResult[0]).once();

            c.save(data.testResult[0]);

            mock.verify();
            mock.restore();
        });
    });

    describe("fizzBuzzRange()", function() {
        var callback = function(data) {};

        it("calls cloudant to get record from fb/range view in DB", function() {
            var stub = sinon.stub(c.cloudant, "view");
            var params = {
                key: ["1", "20"],
                include_docs: true
            };

            c.fizzBuzzRange("1", "20", callback);

            expect(stub.withArgs('fb', 'range', params, sinon.match.any).calledOnce)
                .to.be.eql(true,
                    "expected cloudant view to be called once with correct parameters");
            c.cloudant.view.restore();
        });
    });

    describe("process()", function() {
        var callbackSpy = sinon.spy();
        var fbSpy = null;

        beforeEach(function() {
            fbSpy = sinon.spy(c.fizzbuzz, "convertRangeToFizzBuzz");
        });

        afterEach(function() {
            callbackSpy.reset();
            c.fizzbuzz.convertRangeToFizzBuzz.restore();
        });

        it("processes results from cloudant with valid result set", function() {
            var saveSpy = sinon.spy(c, "save");

            c.process(false, data.dbResult[0], "1", "20", callbackSpy);

            expect(fbSpy).callCount(0);
            expect(saveSpy).callCount(0);
            expect(callbackSpy.withArgs(data.testResult[0]).calledOnce)
                .to.be.eql(true, "Expected process to parse db return");
            c.save.restore();
        });

        it("calculates results when no results found then saves to db", function() {
            var saveStub = sinon.stub(c, "save");

            c.process(false, data.dbResult[1], "2", "21", callbackSpy);

            expect(fbSpy.withArgs("2", "21").calledOnce)
                .to.be.eql(true,
                    "convertRangeToFizzBuzz should be called to calculate results");
            expect(saveStub.withArgs(data.testResult[1]).calledOnce)
                .to.be.eql(true,
                    "expected calculated results to be stored in db");
            expect(callbackSpy.withArgs(data.testResult[1]).calledOnce)
                .to.be.eql(true, "expected calculated result when no db data");
            c.save.restore();
        });

        it("calculates results when db error, does not store results", function() {
            var saveSpy = sinon.spy(c, "save");

            c.process(true, data.dbResult[0], "1", "20", callbackSpy);

            expect(fbSpy.withArgs("1", "20").calledOnce)
                .to.be.eql(true,
                    "convertRangeToFizzBuzz should be called to calculate results");
            expect(saveSpy).callCount(0);
            expect(callbackSpy.withArgs(data.testResult[0]).calledOnce)
                .to.be.eql(true,
                    "expected process create unsaved result with db error");
            c.save.restore();
        });
    });
});
