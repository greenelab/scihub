

import React from 'react';
import styles from './root.scss';
import 'babel-polyfill';

import {
  HashRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import Journal from './Journal';
import DataTable from './DataTable';

import Navbar from './Navbar';
import JournalTable from './JournalTable';

function JournalTableComponent({history}) {
  return <JournalTable journalClicked={(data) => {
    history.push(`/journal/${data.scopus_id}`)
  }}/>
}


export default class Root extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    return <Router>
      <div className="container">
        <Navbar />

        <Switch>
          <Route exact path="/" component={JournalTableComponent}/>
          <Route path="/journal/:journalId" component={Journal}/>
        </Switch>
      </div>
    </Router>;
  }
};


