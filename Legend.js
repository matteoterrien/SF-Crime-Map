function Legend(map) {
  var legend = L.control({ position: "bottomright" });

  legend.onAdd = function (map) {
    var div = L.DomUtil.create("div", "legend");
    div.innerHTML = `
        <h3>Legend</h3>
        
        <p><img src="icons/bluecircle.png" class="legend-icon"/>Arrested and Booked</p>
        <p><img src="icons/greencircle.png" class="legend-icon"/>Arrested and Cited</p>
        <p><img src="icons/redcircle.png" class="legend-icon"/>Unresolved</p>
        <p><img src="icons/whitecircle.png" class="legend-icon"/>Other</p>
    `;
    return div;
  };

  legend.addTo(map);
}

export default Legend;
