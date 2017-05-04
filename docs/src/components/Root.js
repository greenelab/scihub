

import React from 'react';
import styles from './root.scss';
import 'babel-polyfill';
import loading from './loading.gif';

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
        <Loading />
      </div>
    </Layout>;
  }
}


function Loading() {
  return <div className={styles.loading}>
    <h4>Loading...</h4>
    <img src={loading}/>
  </div>;
}

