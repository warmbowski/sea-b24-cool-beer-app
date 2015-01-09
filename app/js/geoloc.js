'use strict';
var $ = require('jquery');

// geolocation script from https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/Using_geolocation
function geoFindMe() {
  var output = document.getElementById('out');
  var map = document.getElementById('map');
  var list = document.getElementById('list');

  if (!navigator.geolocation) {
    output.innerHTML = '<p>Geolocation is not supported by your browser</p>';
    return;
  }

  function success(position) {
    var latitude  = position.coords.latitude;
    var longitude = position.coords.longitude;

    $.ajax({
      type: 'POST',
      url: '/',
      data: {lat: latitude, lon: longitude},
      success: function(data) {
        console.log(data);
        output.innerHTML = '<p>' + data.msg + '</p><p class="subbig">' + data.temp + '</p>';
        list.innerHTML = '<p>You may store ' + data.beer_list + ' on your porch right now.</p>';
        $('.big').css('color', data.color);
      }
    });

    var img = new Image();
    img.src = 'http://maps.googleapis.com/maps/api/staticmap?center=' + latitude + ',' +
      longitude + '&zoom=13&size=300x300&sensor=false';

    map.appendChild(img);
  }

  function error() {
    output.innerHTML = 'Unable to retrieve your location';
  }

  output.innerHTML = '<p>Thinking…</p>';

  navigator.geolocation.getCurrentPosition(success, error);
}
window.onload = geoFindMe;
