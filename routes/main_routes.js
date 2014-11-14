'use strict';
var request = require('superagent')

module.exports = function(app) {
  var temperature;
  
  app.get('/', function(req, res) {
    res.render('index.html');
  });
  
  app.post('/', function(req, res) {
    request
    
  });
  
}
