function mapInit() {
	var map = L.map('map-container').setView([51.505, -0.09], 13);
	 
 	//CartoDB layer names: light_all / dark_all / light_nonames / dark_nonames
	var layer = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
  	maxZoom: 18 		
  });
	 
  layer.addTo(map);
  //map.attributionControl.setPrefix(''); // Don't show the 'Powered by Leaflet' text. Attribution overload
  map.setView([51.365421, -0.434252], 13);
  map.invalidateSize();
  drawGrid(map);
}

function drawGrid(map) {
  let ctr = map.getCenter();
  console.log("centre", ctr);
  cells = getLayerBounds(ctr);
  cells = cells.reverse();
  for (i in cells)  {
    console.log("cells", i);
    // zoom the map to the rectangle bounds
    if (i==0) map.fitBounds(cells[i]);
    L.rectangle(cells[i], {color: "#0078ff", weight: 1, opacity: 0.3}).addTo(map);
  }

}

function getLayerBounds(point) {
  let lat = point.lat;
  let lng = point.lng;
  let scaleup = Math.pow(10,6);
  console.log("multiplier", scaleup);
  let layer = 1, cell,intlat,intlng,flrlat,flrlng,minlat,maxlat,minlng,maxlng = null;
  intlat = Math.floor(lat*scaleup);
  intlng = Math.floor(lng*scaleup);
  console.log("scaleup", [intlat,intlng]);
  let cells = [];

  for(layer=1;layer<=20;layer++) {
    let cell = Math.pow(2,layer); 
    console.log(cell);
    flrlat = intlat - Math.abs(intlat % cell);
    flrlng = intlng - Math.abs(intlng % cell);
    minlat = flrlat / scaleup;
    maxlat = (flrlat + cell) / scaleup;
    minlng = flrlng / scaleup;
    maxlng = (flrlng + cell) / scaleup;
    // define rectangle geographical bounds
    let bounds = [[minlat, minlng], [maxlat, maxlng]];
    console.log("bounds", bounds);
    // create an orange rectangle
    cells.push(bounds);
  }
  return cells
}

window.setTimeout(mapInit, 500);