

import React from 'react';
import styles from './root.scss';
import 'babel-polyfill';
import Loading from './Loading';

import {
  HashRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

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
        <h2 className={styles.title}>Sci-Hub</h2>

        <Router>
          <Switch>
            <Route exact path="/" component={Loading}/>
            <Route path="/journal" component={()=><h2>COMPONENT</h2>}/>
          </Switch>
        </Router>
      </div>
    </Layout>;
  }
}


