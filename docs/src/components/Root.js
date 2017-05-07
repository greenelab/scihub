

import React from 'react';
import styles from './root.scss';
import 'babel-polyfill';

import {
  HashRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import Journal from './Journal';
import Top100 from './Top100';
import DataTable from './DataTable';

import Navbar from './Navbar';

function JournalTable({history}) {
  return <DataTable journalSelected={(data) => history.push(`/journal/${data.scopus_id}`)} />
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
          <Route exact path="/" component={JournalTable}/>
          <Route path="/journal/:journalId" component={Journal}/>
          <Route path="/top-100" component={Top100}/>
        </Switch>
      </div>
    </Router>;
  }
};


