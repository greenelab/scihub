import React from 'react';
import styles from './root.scss';

import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import Journal from './Journal';
import Publisher from './Publisher';

import Navbar from './Navbar';
import JournalTable from './JournalTable';
import PublishersTable from './PublisherTable';
import Home from './Home';

export default class Root extends React.Component {
  render() {
    return (
      <Router>
        <div className="app">
          <div className="container">
            <Navbar />

            <div className="app__container">
              <Switch>
                <Route exact path="/" component={Home} />

                <Route exact path="/journals" component={JournalTable} />
                <Route path="/journal/:journalId" component={Journal} />

                <Route exact path="/publishers" component={PublishersTable} />
                <Route path="/publisher/:publisherId" component={Publisher} />
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}
