
import React from 'react';
import {Link} from 'react-router-dom';
import github from './github.svg';

import styles from './root.scss';

import History from 'history';

export default ({}, {}) => <div>
  <nav className="navbar navbar-default">
    <div className="container">
      <div className="navbar-header">
        <button type="button" className="collapsed navbar-toggle" data-toggle="collapse" aria-expanded="false">
          <span className="sr-only">Toggle navigation</span>
          <span className="icon-bar"/>
          <span className="icon-bar"/>
          <span className="icon-bar"/>
        </button>
        <a href="#" className="navbar-brand">Sci-Hub</a>
        <span className="navbar-text text-uppercase">(Under Heavy Development and subject to change)</span>
      </div>

      <div className="collapse navbar-collapse navbar-right">
        <ul className="nav navbar-nav">
          <li>
            <Link to="/">Journals</Link>
          </li>
          <li>
            <Link to="/publishers">Publishers</Link>
          </li>
          <li>
            <a href="https://github.com/greenelab/scihub" target="_blank">
              <img className={styles.github} src={github} />
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</div>;

