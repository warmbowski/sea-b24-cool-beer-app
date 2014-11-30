'use strict';
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var request = require('superagent');
var dbFolder = '/db/';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.use('/', express.static(__dirname + '/build'));

app.get('/', function(req, res) {
  res.render('index.html');
});

var wu = process.env.WU_API_KEY;
app.post('/', function(req, res) {
  var lon = req.body.lon;
  var lat = req.body.lat;
  var wundergUrl = 'http://api.wunderground.com/api/' + wu +
    '/conditions/q/' + lat + ',' + lon + '.json';

  request
  .get(wundergUrl)
  .end(function(err, wundergRes) {
    if (err) return res.sendStatus(500).send('there was a problem');

    var parsedData = JSON.parse(wundergRes.text);
    var temp = parsedData.current_observation.temp_f;

    switch (temp) {
      case (temp >= 60):
        res.json({msg: 'Too warm', beer_list: 'no beer'});
        break;
      case (temp >= 55):
        res.sendFile(__dirname + dbFolder + 'warmBeer.json');
        break;
      case (temp >= 50):
        res.sendFile(__dirname + dbFolder + 'cellarBeer.json');
        break;
      case (temp >= 45):
        res.sendFile(__dirname + dbFolder + 'coolBeer.json');
        break;
      case (temp >= 40):
        res.sendFile(__dirname + dbFolder + 'coldBeer.json');
        break;
      case (temp >= 35):
        res.sendFile(__dirname + dbFolder + 'veryColdBeer.json');
        break;
      default:
        res.json({msg: 'Too cold', beer_list: 'no beer'});
        break;
    }
  });
});

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), function() {
  console.log('server running on port: %d', app.get('port'));
});
