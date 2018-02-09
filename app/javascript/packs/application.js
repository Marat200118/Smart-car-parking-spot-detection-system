/* eslint no-console:0 */
// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.
//
// To reference this file, add <%= javascript_pack_tag 'application' %> to the appropriate
// layout file, like app/views/layouts/application.html.erb

console.log('Hello World from Webpacker')

import $ from "jquery";
import L from "leaflet";

$(document).ready(function() {
  var map = L.map('map').setView([56.96953, 24.16514], 19);
  L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  // P1
  var isAvailableP1 = $('div#test').data('available-p1');
  switch (isAvailableP1) {
    case true:
      var colorP1 = 'green';
      break;
    case false:
      var colorP1 = 'red';
      break;
    default:
      var colorP1 = 'gray';
  }

  var circleP1 = L.circle([56.96955, 24.16525], {
    color: colorP1,
    fillColor: colorP1,
    fillOpacity: 0.5,
    radius: 2
  }).addTo(map)
  .bindPopup('P1');

  // P2
  var isAvailableP2 = $('div#test').data('available-p2');
  switch (isAvailableP2) {
    case true:
      var colorP2 = 'green';
      break;
    case false:
      var colorP2 = 'red';
      break;
    default:
      var colorP2 = 'gray';
  }

  var circleP2 = L.circle([56.96948, 24.16535], {
    color: colorP2,
    fillColor: colorP2,
    fillOpacity: 0.5,
    radius: 2
  }).addTo(map)
  .bindPopup('P2');

  // P3
  var isAvailableP3 = $('div#test').data('available-p3');
  switch (isAvailableP3) {
    case true:
      var colorP3 = 'green';
      break;
    case false:
      var colorP3 = 'red';
      break;
    default:
      var colorP3 = 'gray';
  }

  var circleP3 = L.circle([56.96940, 24.16551], {
    color: colorP3,
    fillColor: colorP3,
    fillOpacity: 0.5,
    radius: 2
  }).addTo(map)
  .bindPopup('P3');



});
