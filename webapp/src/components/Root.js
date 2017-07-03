

import React from 'react';
import styles from './root.scss';
import 'babel-polyfill';

import {
  HashRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import Journal from './Journal';

import Navbar from './Navbar';
import JournalTable from './JournalTable';
import PublishersTable from "./PublisherTable";


export default class Root extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    return <Router>
      <div className={styles.app}>
        <div className="container">
          <Navbar />

          <Switch>
            <Route exact path="/" component={JournalTable}/>
            <Route exact path="/publishers" component={PublishersTable}/>
            <Route path="/journal/:journalId" component={Journal}/>
          </Switch>
        </div>
      </div>
    </Router>;
  }
};


