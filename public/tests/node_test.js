var assert = require('assert');
var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();
//Тестируемый код
var server = require('../../app');

chai.use(chaiHttp);

describe('Basic Mocha String Test', function () {
    it('should return number of charachters in a string', function () {
        //5 == 5
        assert.equal("Hello".length, 5);
    });
});

describe('Request Test', function () {
        it('Should return index page', function(done) {
            chai.request(server)
              .get('/')
              .end(function(err, res){
                res.should.have.status(200);
                done();
              });
          });
});
