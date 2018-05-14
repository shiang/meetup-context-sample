import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import MeetupDetails from "./MeetupDetails";
import Navigation from "./Navigation";
import { MeetupContext } from "./App";


import { HashRouter as Router, Route } from 'react-router-dom';

const Routes = ( // App component holds the Navigation component - but how do I keep the drawer open when navigating back?
  <Router>
    <div>
      <App>
        <Route exact path="/" component={Navigation} />
        <Route exact path="/meetup/:id" component={MeetupDetails} />
      </App>
    </div>
  </Router>
);



ReactDOM.render(Routes, document.getElementById('root'));
registerServiceWorker();
