import React from 'react';
import { MeetupContext } from "./App";

class MeetupDetails extends React.Component {
  constructor(props) {
     super(props);
     this.state = {
       isToggleOn: false,
       selectedMeetup: ''
     };

     this.handleClick = this.handleClick.bind(this);
   }

  handleClick() {
      this.setState(prevState => ({
        isToggleOn: !prevState.isToggleOn
      }));
    }

  // componentDidMount() {
  //   let id = this.props.location.pathname.split("/")[2];
  //   if (this.props.location.state) {
  //     let geojson = this.props.location.state.geojson;
  //     let _= require('underscore');
  //     let selectedMeetup = _.findWhere(geojson, {id: id});
  //     this.setState({selectedMeetup : selectedMeetup}); // object
  //   }
  // }

  render () {

    
    return <MeetupContext.Consumer>
        {({ meetups }) => {
          console.log("Meetups in detai: ", meetups)
        }}
      </MeetupContext.Consumer>;
      
  }
}

export default MeetupDetails;
