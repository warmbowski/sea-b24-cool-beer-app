/*jshint expr: true*/
'use strict';
var chai = require('chai');
var chaihttp = require('chai-http');
var expect = chai.expect;
chai.use(chaihttp);

require('../server');
var port = process.env.PORT || 3000;
var url = 'http://localhost:' + port;
var wu = process.env.WU_API_KEY;
var wupath = '/api/' + wu +
  '/conditions/q/47.60,-122.33.json';

describe('checking the temperature in Seattle', function() {

  it('should return index.html without error', function(done) {
    chai.request(url)
      .get('/')
      .end(function(err, res) {
        expect(err).to.be.null();
        expect(res.statusCode).to.equal(200);
        expect(res).to.be.html;
        done();
      });
  });

  it('it tell you if its cold enough', function(done) {
    chai.request(url)
      .post('/')
      .send({lat: '47.60', lon: '-122.33'})
      .end(function(err, res) {
        expect(err).to.be.eql(null);
        expect(res.body).to.have.property('beer_list');
        done();
      });
  });

  it('should return weather data', function(done) {
    chai.request('http://api.wunderground.com')
      .get(wupath)
      .end(function(err, res) {
        expect(err).to.be.null();
        expect(res).to.be.json;
        expect(res.body).to.have.property('current_observation');
        done();
      });
  });
});
