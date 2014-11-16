'use strict'
var chai = require('chai');
var chaihttp = require("chai-http");
var expect = chai.expect;
require('../server');
chai.use(chaihttp);
var port = process.env.PORT || 3000;

var url = 'http://localhost:' + port;
describe('checking the temperature in Seattle', function() {





  
  it('should return the temperature', function(done) {
      chai.request(url)
      .get('/')
      .end(function(err,res){
        console.log (res.body)
        console.log (res.body)
          expect(res.text).to.include.keys('msg');
          done();
      });
  });
/*
  it('should return your location?', function(done) {
      chai.request(url)
        .get('/location')
        .send({msg:'You live here: '})
        .end(function(err, res) {
            expect(err).to.be.eql(null);
            expect(Array.isArray(res.body)).to.be.true;
            done();
        });
  });

   it('should return the precipitation', function(done) {
      chai.request(url)
      .get('/precip_1hr_metric')
      .send({msg: 'you got the precip.'})
      .end(function(err,res){
          expect(err).to.be.eql(null);
          expect(res.body.msg).to.be.eql('you got the precip, current status, cats and dogs');
          done();
      });
  });
*/

});