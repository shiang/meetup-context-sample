import React from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoidGVjaG1lZXQiLCJhIjoiY2pndWRpOHVnMW51dzJ3bWx2dWMwd3BjOSJ9.hsVtz9FaTpBnCRunS3evUQ';

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {meetup: ''};

  }

componentDidUpdate() {
  let currentComponent = this;

    currentComponent.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/techmeet/cjguetle700042roi9k1mb8mq',
      center: [151.2, -33.86],
      zoom: 11.33
    });

    currentComponent.map.on('load', () => onLoad());


  const onLoad = (props) => {
    if (this.props.meetups) {
    let meetupData = this.props.meetups.slice(0,30);

    for (let i = 0; i < meetupData.length; i++) {
      if (meetupData[i].venue && meetupData[i].name){
        let isLongString = false;
        if (meetupData[i].description.length > 255) {
          isLongString = true;
        }
        else {
          isLongString = false;
        }
// https://cdn.rawgit.com/amandytang/a2f43bda88756f9d1133fe36ca0239dc/raw/892192010e84f79640b5be1ca8c3bee02575ac17/tree.svg
        let geojson = {
          "type": "FeatureCollection",
          "features": [{
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [meetupData[i].venue.lon, meetupData[i].venue.lat]
            },
            "properties": {
                "title": meetupData[i].name,
                "description": isLongString ? `${meetupData[i].description.slice(0,255)}...` : `${meetupData[i].description.slice(0,200)}`
                // description": `${meetupData[i].description.split(/\.[\s].*?(\.[\s])/)[0]}...`
                // "icon": "tree"
            }
          }]
        }
//

geojson.features.forEach(function(marker) {

  // create a HTML element for each feature
  var el = document.createElement('div');
  el.className = 'marker';

  // make a marker for each feature and add to the map
  new mapboxgl.Marker(el)
  .setLngLat(marker.geometry.coordinates)
  .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
  .setHTML('<h3>' + marker.properties.title + '</h3><p>' + marker.properties.description + '</p>' + `<button class="markerViewDetails" id=${meetupData[i].id}>View Details</button>`))
  .addTo(currentComponent.map);
});

        // currentComponent.map.loadImage('https://i.imgur.com/thmI7CT.png', function(error, image) {
        //   if (error) throw error;
        //   currentComponent.map.addImage(`marker${i}`, image);
        //   currentComponent.map.addLayer({
        //
        //     "id": meetupData[i].name,
        //     "type": "symbol",
        //     "source": {
        //         "type": "geojson",
        //         "data": {
        //             "type": "FeatureCollection",
        //             "features": [{
        //                 "type": "Feature",
        //                 "geometry": {
        //                     "type": "Point",
        //                     "coordinates": [meetupData[i].venue.lon, meetupData[i].venue.lat]
        //                 },
        //                 "properties": {
        //                     "title": meetupData[i].name,
        //                     // "icon": "tree"
        //                 }
        //             }]
        //         }
        //     },
        //     "layout": {
        //         "icon-image": `marker${i}`,
        //         "text-field": "{title}",
        //         "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
        //         "text-offset": [0, 3],
        //         "icon-size": 0.6,
        //         "icon-allow-overlap": true,
        //         "icon-ignore-placement": true,
        //         "text-anchor": "top",
        //         "text-size": 12
        //     },
        //     paint: {
        //       "text-color": "#ffffff"
        //     }
        //   });

            // var coordinates = features.coordinates.slice();
          // currentComponent.map.on('click', function (e) {
          //
          //
          //
          //       // var coordinates = features.geometry.coordinates.slice();
          //       var description = e.features.properties.description;
          //
          //       // Ensure that if the map is zoomed out such that multiple
          //       // copies of the feature are visible, the popup appears
          //       // over the copy being pointed to.
          //       while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          //           coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
          //       }
          //
          //       new mapboxgl.Popup()
          //           .setLngLat(coordinates)
          //           .setHTML(description)
          //           .addTo(currentComponent.map); // i have a feeling this won't work
          //   });
        }
      }
    }
  } // end of onLoad function
} // end of componentDidUpdate

  render () {
    return (
      <div>
      </div>
    )
  }
}

export default Map;
