var Mocha = require('mocha')
var Suite = Mocha.Suite,
    Runner = Mocha.Runner,
    Test = Mocha.Test;

var trxReporter = require('../lib/trx.js');
var should = require('should');

describe('On trx reporter', function(){
    var suite, runner;

    beforeEach(function(){
        var mocha = new Mocha({
            reporter: trxReporter
        });
        suite = new Suite('TRX suite', 'root');
        runner = new Runner(suite);
        var mochaReporter = new mocha._reporter(runner);

        var testTitle = 'trx test';
        var error = { message: 'omg' };

        suite.addTest(new Test(testTitle, function (done) {
            done(new Error(error.message));
        }));

        suite.addTest(new Test(testTitle));

        suite.addTest(new Test(testTitle, function (done) {
            done();
        }));
    });

    it('should create correct mocha test result', function(done){

        runner.run(function(failureCount) {
            failureCount.should.be.exactly(1);
            runner.should.have.property('testResults');
            runner.testResults.should.have.property('tests');
            runner.testResults.tests.should.be.an.instanceOf(Array);
            runner.testResults.tests.should.have.a.lengthOf(3);

            done();
        });
    });

});