
import React from 'react';
import loading from './loading.gif';
import styles from './root.scss';

export default function Loading() {
  return <div className={styles.loading}>
    <img src={loading}/>
  </div>;
}
