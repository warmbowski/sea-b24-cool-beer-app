'use strict';
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var request = require('superagent');
var fs = require('fs');
var dbFolder = './db';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
    app.use('/', express.static(__dirname + '/public'));

app.get('/', function(req, res, next) {
  res.render('index.html');
});

var wu = process.env.WU_API_KEY;
app.post('/', function(req, res, next) {
  var lon = req.body.lon;
  var lat = req.body.lat;
  var wundergUrl = 'http://api.wunderground.com/api/' + wu +
    '/conditions/q/' + lat + ',' + lon +'.json'
    console.log(wundergUrl);
  
  request
  .get(wundergUrl)
  .end(function(err, wundergRes){
    if (err) res.sendStatus(500).send('there was a problem');
    
    var parsedData = JSON.parse(wundergRes.text);
    var temp = parsedData.current_observation.temp_f;
    
    if (temp >= 60) {
      res.json({'msg': 'Too warm', 'beer_list': ''});
    } else if (temp >= 55) {
      res.sendfile('./db/warmBeer.json');
    } else if (temp >= 50) {
      res.sendfile('./db/cellarBeer.json');
    } else if (temp >= 45) {
      res.sendfile('./db/coolBeer.json');
    } else if (temp >= 40) {
      res.sendfile('./db/coldBeer.json');
    } else if (temp <= 35) {
      res.sendFile('./db/veryColdBeer.json');
    } else {
      res.json({'msg': 'Too cold', 'beer_list': ''});
    }
  });
});


app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), function() {
  console.log('server running on port: %d', app.get('port'));
});
