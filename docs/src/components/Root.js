

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


function JournalTable({history}) {
  return <DataTable journalSelected={(data) => history.push(`/journal/${data.scopus_id}`)} />
}


export default class Root extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    return <div className="container">
      <div className={styles.container}>
        <h2 className={styles.title}>SciHub</h2>

        <Router>
          <Switch>
            <Route exact path="/" component={JournalTable}/>
            <Route path="/journal/:journalId" component={Journal}/>
          </Switch>
        </Router>
      </div>
    </div>;
  }
};


