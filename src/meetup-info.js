import React, {PureComponent} from 'react';
import { Link } from 'react-router-dom';

export default class MeetupInfo extends PureComponent {

  render() {
    const {info} = this.props;
    const heading = `${info.meetup}`;

    const createMarkup = () => {
      return {__html: `${info.description}`};
    }

    return (
      <div>
        <h3>
          {heading}
        </h3>
        <div id="description" dangerouslySetInnerHTML={createMarkup()} />
        <Link to={ {
          pathname: `/meetup/${info.id}`,
          state: { fromHome: true, meetupId: `${info.id}` }
        } } ><button className="markerViewDetails" id={info.id}>View Details</button>
        </Link>
      </div>
    );
  }
}
