import React from 'react';

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

  componentDidMount() {
    let id = this.props.location.pathname.split("/")[2];
    if (this.props.location.state) {
      let geojson = this.props.location.state.geojson;
      let _= require('underscore');
      let selectedMeetup = _.findWhere(geojson, {id: id});
      this.setState({selectedMeetup : selectedMeetup}); // object
    }
  }

  render () {

    return (
      <div id="nav-wrapper">
        <div id="navbar"><span tooltip="Menu" flow="down"><img src="./menu.svg" alt="menu" id="menu" onClick={this.handleClick} /></span></div>{this.state.isToggleOn ? (<div id="sidebar" style={{"transition": "transform 0.4s ease"}}></div>)
        :
        (<div id="sidebar" className="sidebar-shadow" style={{"transform": "translate3d(0px, 0, 0)", "transition": "transform 0.4s ease"}}>
          <img src="close-menu.svg" className="close-menu" alt="collapse sidebar button" onClick={this.handleClick}/>
          {this.state.selectedMeetup.meetup}
          {this.state.selectedMeetup.description}

          </div>)}
        </div>
    )
  }
}

export default MeetupDetails;
