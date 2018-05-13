import React from 'react';
import Moment from 'react-moment';
import MeetupDetails from "./MeetupDetails";
import { Link } from 'react-router-dom';



class Navigation extends React.Component {
  constructor(props) {
     super(props);
     this.state = {isToggleOn: true};

     this.handleClick = this.handleClick.bind(this);
   }

  handleClick() {
      this.setState(prevState => ({
        isToggleOn: !prevState.isToggleOn
      }));
    }

// componentDidMount() {
// could we say... if (this.state.meetup)
//       const toggleHeader = () => {
//       if (this.props.isToggleOn === false) {
//         this.setState(prevState => ({
//           isToggleOn: !prevState.isToggleOn
//         }));
//     }
//   }
//   toggleHeader();
// }

  render () {

    return (
      <div id="nav-wrapper">
        <div id="navbar"><span tooltip="Menu" flow="down"><img src="./menu.svg" alt="menu" id="menu" onClick={this.handleClick} /></span></div>{this.state.isToggleOn ? (<div id="sidebar" style={{"transition": "transform 0.4s ease"}}></div>)
        :
        (<div id="sidebar" className="sidebar-shadow" style={{"transform": "translate3d(0px, 0, 0)", "transition": "transform 0.4s ease"}}>
          <img src="close-menu.svg" className="close-menu" alt="collapse sidebar button" onClick={this.handleClick}/>
            <MeetupList meetups={this.props.meetups} geojson={this.props.geojson}/>
          </div>)}
        </div>
      )
    }
  }


class MeetupList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      meetupData: []    };
    // this.handleClick = this.handleClick.bind(this);

  }
  //
  // handleClick = (id) => {
  //   // logging the id works but is it saving to state?
  //     this.setState({ meetup: id}); // we are storing the id of the meetup into state so our next component (MeetupDetails) can use it
  //     const identifier = this.state.meetup;
  //     this.context.router.history.push(`/meetup/${identifier}`);
  //   }


  componentDidMount () {
   // console.log(this.props.geojson); have geojson at this point yay
   if (this.props.meetups) {
      let _= require('underscore');

      let meetupData = _.sortBy(this.props.meetups.slice(0,30), 'local_date'); // array of meetups sorted by date
      const temp = this.state.meetupData; // empty array

      meetupData.forEach( (element) => {
        const obj = { name: element.name, venue: element.venue, date: element.local_date, description: element.description, id: element.id };
       // create ideal object and push into state array
        temp.push(obj);
      })
      this.setState({meetupData: temp});
    }
  }

  render () {

    return (
      <div>
          <div id="meetups">
            {this.state.meetupData.map( (meetup) => {
              if (meetup.venue && meetup.date) {
                return (
                  <Link to={ {
                    pathname: `/meetup/${meetup.id}`,
                    state: { fromHome: true, meetupId: `${meetup.id}`, geojson: this.props.geojson }
                  } } >
                    <div className="meetupContent" id={meetup.id} >
                      <div className="meetupNames">
                        <div className="meetupName">{meetup.name}</div>
                        <p><b>Date:</b> <Moment format="dddd, MMM Do YYYY">{meetup.date}</Moment></p>
                        <p><b>Venue:</b> {meetup.venue.address_1}</p>
                      </div>
                    </div>
                  </Link>
                )
              }
              })
            }
          </div>
      </div>
    )
  }
}
// ${meetup.date.slice(5)}
// <div className="meetupContent" id={meetup.id} onClick={() => this.handleClick(meetup.id)}>

export default Navigation;
