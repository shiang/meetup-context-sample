import React from "react";
import "./App.css";
import Map from "./Map.js";
import Navigation from "./Navigation.js";

export const MeetupContext = React.createContext();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      meetups: "",
      geojson: []
    };
    this.setState = this.setState.bind(this);
  }
  componentDidMount() {
    let currentComponent = this;

    const fetchMeetups = () => {
      let jsonp = require("jsonp");
      jsonp(
        "https://api.meetup.com/find/events?city=sydney&text=software&sig_id=251998231&radius=25&sig=c67e612c1dc6f5f1116d2f160cdcab33de903ba3",
        null,
        function(err, data) {
          if (err) {
            console.error(err.message);
          } else {
            currentComponent.setState({ meetups: data.data });

            let meetupData = currentComponent.state.meetups.slice(0, 30);
            let tempArr = [];
            for (let i = 0; i < meetupData.length; i++) {
              if (meetupData[i].venue && meetupData[i].name) {
                let isLongString = false;
                if (meetupData[i].description.length > 255) {
                  isLongString = true;
                } else {
                  isLongString = false;
                }
                let geojson = {
                  meetup: meetupData[i].name,
                  id: meetupData[i].id,
                  latitude: meetupData[i].venue.lat,
                  longitude: meetupData[i].venue.lon,
                  description: isLongString
                    ? `${meetupData[i].description.slice(0, 255)}...`
                    : `${meetupData[i].description.slice(0, 200)}`
                };
                tempArr.push(geojson);
              }
            } // end of for loop
            currentComponent.setState({ geojson: tempArr });

            //working
          }
        }
      );
    };

    fetchMeetups();
  }

  // $my_geoJSON = '{ "type": "Point", "coordinates": ['.$longitude.' ,'.$latitude.'] }';

  render() {
    return (
      <MeetupContext.Provider value={this.state}>
        {this.props.children}
      </MeetupContext.Provider>
    );
  }
}

export default App;

{/* <div id="wrapper">
  {/* <Map
            // meetups={this.state.meetups}
            // geojson={this.state.geojson}
            style={{
              width: "100%",
              height: "100%"
            }}
          /> */}
  {/*<Navigation
  // meetups={this.state.meetups}
  // geojson={this.state.geojson}
  />
</div> */}
