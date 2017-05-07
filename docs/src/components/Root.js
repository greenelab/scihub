

import React from 'react';
import styles from './root.scss';
import 'babel-polyfill';

import {
  HashRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import DataTable from './DataTable';


export function Layout({children}) {
  return <div className="container">
    <div className={styles.container}>
      {children}
    </div>
  </div>
}

export default class Root extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  render () {
    return <Layout>
      <div>
        <h2 className={styles.title}>SciHub</h2>

        <DataTable journalSelected={(data) => this._journalSelected(data)} />

        <Router>
          <Switch>
            <Route path="/journal" component={()=><h2>COMPONENT</h2>}/>
          </Switch>
        </Router>
      </div>
    </Layout>;
  }

  _journalSelected(data) {
    console.log(data);
  }
}


