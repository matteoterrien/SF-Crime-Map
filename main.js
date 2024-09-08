import Legend from "./Legend.js";

$(document).ready(function () {
  var map = L.map("map").setView([37.771616, -122.436227], 13);

  // OSM layer
  var osm = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  });
  osm.addTo(map);

  // Search Bar
  L.Control.geocoder({
    geocoder: L.Control.Geocoder.nominatim({
      countrycodes: "US",
    }),
    defaultMarkGeocode: false,
  })
    .on("markgeocode", function (e) {
      var bbox = e.geocode.bbox;
      var poly = L.polygon([
        [bbox.getSouthEast().lat, bbox.getSouthEast().lng],
        [bbox.getNorthEast().lat, bbox.getNorthEast().lng],
        [bbox.getNorthWest().lat, bbox.getNorthWest().lng],
        [bbox.getSouthWest().lat, bbox.getSouthWest().lng],
      ]);
      map.fitBounds(poly.getBounds());
    })
    .addTo(map);

  // Neighborhood Outlines
  function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
      weight: 5,
      color: "#666",
      dashArray: "",
      fillOpacity: 0.7,
    });

    layer.bringToFront();
  }

  function resetHighlight(e) {
    geojson.resetStyle(e.target);
  }

  function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
  }

  function onEachFeature(feature, layer) {
    layer.on({
      mouseover: highlightFeature,
      mouseout: resetHighlight,
      click: zoomToFeature,
    });
  }

  var geojson;
  $.ajax({
    url: "https://data.sfgov.org/resource/gfpk-269f.geojson",
    type: "GET",
    data: {},
  }).done(function (data) {
    geojson = L.geoJSON(data, {
      style: {
        fillColor: "grey",
        fillOpacity: 0.3,
        color: "black",
        dashArray: "5",
      },
      onEachFeature: onEachFeature,
    }).addTo(map);
  });

  // Creating Markers and Storing Data
  var reports = [];
  var resolutions = new ResolutionReport();

  $.ajax({
    url: "https://data.sfgov.org/resource/tmnf-yvry.json",

    type: "GET",
    data: {
      $where: "date > '2015-01-01T00:00:00'",
      $limit: 1250,
    },
  }).done(function (data) {
    console.log("Retrieved " + data.length + " records from the dataset!");
    for (let i = 0; i < data.length; i++) {
      reports.push(new CrimeReport(data[i]));
      resolutions.addStatistic(data[i].resolution);
    }

    // Create markers after reports are populated
    for (let i = 0; i < reports.length; i++) {
      var marker = L.marker(reports[i].get_location, {
        icon: reports[i].icon,
      }).addTo(map);
      marker.bindPopup(reports[i].display_info());
    }

    var info = L.control({ position: "bottomleft" });

    info.onAdd = function (map) {
      var div = L.DomUtil.create("div", "info");
      const statistics = resolutions.statistics;

      div.innerHTML += `<h3>Resolutions: ${resolutions.total}</h3>`;

      for (var i = 0; i < statistics.length; i++) {
        const key = Object.keys(statistics[i])[0];
        const value = statistics[i][key];
        div.innerHTML += key + ": " + value + "<br><br>";
      }

      return div;
    };

    info.addTo(map);
    Legend(map);
  });
});
