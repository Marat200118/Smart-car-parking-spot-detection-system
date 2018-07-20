/* eslint no-console:0 */
// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.
//
// To reference this file, add <%= javascript_pack_tag 'application' %> to the appropriate
// layout file, like app/views/layouts/application.html.erb

/* eslint no-console:0 */
// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.
//
// To reference this file, add <%= javascript_pack_tag 'application' %> to the appropriate
// layout file, like app/views/layouts/application.html.erb

import $ from "jquery";
import L from "leaflet";
//import './application.scss';
import Control from 'leaflet-draw';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import 'leaflet.awesome-markers/dist/leaflet.awesome-markers.js';
import 'leaflet.awesome-markers/dist/leaflet.awesome-markers.css';
import 'font-awesome/css/font-awesome.css';
import ActionCable from 'es6-actioncable';
import polyline from '@mapbox/polyline';
import 'leaflet.animatedmarker/src/AnimatedMarker.js';


const markers = {
  p1_angle1: { coordinates: [56.962500, 24.098500] },
  p1_angle29: { coordinates: [56.962504, 24.098580] },
  p1_angle82: { coordinates: [56.9625070, 24.098660] },
  p1_angle111: { coordinates: [56.9625100, 24.098740] },
  p2_angle1: { coordinates: [56.9623900, 24.098450] },
  p2_angle26: { coordinates: [56.9623500, 24.098450] },
  p2_angle51: { coordinates: [56.9623100, 24.098450] }
}

const carLocations = {
  car1: { coordinates: [56.961450, 24.100133] },
  car2: { coordinates: [56.962214, 24.102098] },
  car3: { coordinates: [56.962781, 24.103511] },
  car4: { coordinates: [56.967647, 24.099375] },
  car5: { coordinates: [56.965622, 24.100846] },
  car6: { coordinates: [56.964779, 24.103732] }
}

const house = { coordinates: [56.9624800, 24.098250] }

$(document).ready(function() {
  var map = L.map('map').setView([56.962445, 24.098397], 18,)
  L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
  subdomains: ['mt0','mt1','mt2','mt3']
  }).addTo(map);
  var editableLayers = new L.FeatureGroup();
  map.addLayer(editableLayers);

  function addMarkers() {
    Object.keys(markers).forEach(device => {
      const isAvailable = $('div#test').data('available-device_p1_angle1')
      let color = 'gray'

      if (isAvailable) {
        color = 'green'
      } else if (isAvailable === false) {
        color = 'red'
      }

      const marker = L.circle(markers[device].coordinates, {
        color: color,
        fillColor: color,
        radius: 1.7,
        fillOpacity: 1
      })

      markers[device].isAvailable = isAvailable
      markers[device].marker = marker
      marker.addTo(map)
            .bindPopup(device)
    });
  }

  addMarkers();


  var redMarker = L.AwesomeMarkers.icon({
    icon: 'glass',
    markerColor: 'red'
  });

  var blueMarker = L.AwesomeMarkers.icon({
    icon: 'home',
    markerColor: 'blue'
  });
    
  L.marker(house.coordinates, {
    icon: blueMarker,
  }).addTo(map);

  function findClosestParking() {
    const origin = new google.maps.LatLng(house.coordinates);
    const houseCoordinates = { location: new google.maps.LatLng(house.coordinates), stopover: true }
    
    const markerValues = Object.values(markers)
    const mappedValues = markerValues.filter(marker => {
      console.log(marker.isAvailable)
      return marker.isAvailable == true || marker.isAvailable == undefined  
    }).map(markerValue => {
      return { lat: markerValue.coordinates[0], lng: markerValue.coordinates[1] }
    })

    console.log(mappedValues)

    const directionService = new google.maps.DistanceMatrixService;
    directionService.getDistanceMatrix(
      {
        origins: [{ lat: house.coordinates[0], lng: house.coordinates[1] }],
        destinations: mappedValues,
        travelMode: 'DRIVING'
      },
      function(res) {
        const elements = res.rows[0].elements;
        let prevValue = 100000000;
        let closestMarker;
        console.log(elements)
        elements.forEach(function(element, index) {
          if(element.distance.value < prevValue) {
            closestMarker = mappedValues[index];
            console.log(element.distance.value);
          }
          prevValue = element.distance.value 
        })
        calculateDirections(closestMarker);
      }
    )
  }

  let weatherMarker

  function toggleWeatherMarker() {
    if (weatherMarker) {
      weatherMarker.remove()
      map.setZoom(18)
      weatherMarker = null
    } else {      
      weatherMarker = L.circle(house.coordinates, {
        color: 'green',
        fillColor: 'green',
        radius: 115,
        fillOpacity: 0.2
      })

      weatherMarker.addTo(map)
      weatherMarker.bindPopup('Temperature: 25°C, Humidity: 45%')
      weatherMarker.openPopup()
      map.setZoom(17);
    }
  }

  function toggleLastMeasures() {
    const measuresContainer = document.getElementById('measures')
    measuresContainer.classList.toggle('hidden')
  }

  

  function calculateDirections(closest) {
    const randomLocation = Object.values(carLocations)[Math.floor(Math.random() * Object.values(carLocations).length)];
    const origin = new google.maps.LatLng(randomLocation.coordinates[0], randomLocation.coordinates[1]);
    const destination = new google.maps.LatLng(closest);

    const directionService = new google.maps.DirectionsService;
    directionService.route(
      {
        origin: origin, 
        destination: destination, 
        travelMode: "DRIVING"
      }, function(res) {
        const line = res.routes[0].overview_polyline;
        const decodedPoly = polyline.decode(line);

        const firstpolyline = new L.Polyline(decodedPoly, {
          color: 'black',
          weight: 3,
          opacity: 0.5,
          smoothFactor: 1
        });


        const animatedMarker = L.animatedMarker(firstpolyline.getLatLngs(carLocations.coordinates), {
          distance: 10,  
          interval: 2000,
          icon: redMarker
        });

        clearMap();
        animatedMarker.addTo(map);
        firstpolyline.addTo(map);

        // addMarkers();
        // clearMap();


      } 
    )
  }

  function clearMap() {
    let i;
    for(i in map._layers) {
      if(map._layers[i].options.distance > 0 || map._layers[i].options.color === "black") {
        try {
          console.log(map._layers[i])
          map.removeLayer(map._layers[i]);
        }
        catch(e) {
          console.log("problem with " + e + map._layers[i]);
        }
      }
    }
  }


  ActionCable.createConsumer('/cable').subscriptions.create('MeasuresChannel', {
    received: data => {
      let color = 'gray'
      if (data.is_available) {
        color = 'green'
      } else if (data.is_available === false) {
        color = 'red'
      }

      console.log(data)
      markers[data.device].marker.setStyle({ color: color, fillColor: color })
      markers[data.device].isAvailable = data.is_available

      let measuresContainer = $('calculate-container')
      measuresContainer.empty()

      measuresContainer.append()
    }
  })

  const calculateButton = document.createElement("button1"); 
  
  calculateButton.innerHTML = "Calculate route";
  calculateButton.classList.add('button1')
  document.getElementById('calculate-container').appendChild(calculateButton);
  calculateButton.addEventListener('click', findClosestParking);


  const weatherButton = document.createElement("button2");

  weatherButton.innerHTML = "Weather at destination";
  weatherButton.classList.add('button2')
  document.getElementById('weather-container').appendChild(weatherButton);
  weatherButton.addEventListener('click', toggleWeatherMarker);


  const historyButton = document.getElementById('history-button') // document.createElement("button");
  historyButton.addEventListener('click', toggleLastMeasures);

})
