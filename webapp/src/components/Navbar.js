import React from 'react';
import { Link } from 'react-router-dom';
import github from './github.svg';

export default () => (
  <div>
    <nav className="navbar navbar-default">
      <div className="container">
        <div className="navbar-header">
          <button
            type="button"
            className="collapsed navbar-toggle"
            data-toggle="collapse"
            aria-expanded="false"
          >
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar" />
            <span className="icon-bar" />
            <span className="icon-bar" />
          </button>
          <a href="#" className="navbar-brand">
            Sci-Hub Stats Browser
          </a>
        </div>

        <div className="collapse navbar-collapse navbar-right">
          <ul className="nav navbar-nav">
            <li>
              <Link to="/journals">Journals</Link>
            </li>
            <li>
              <Link to="/publishers">Publishers</Link>
            </li>
            <li>
              <a href="https://github.com/greenelab/scihub" target="_blank">
                <img className="github" src={github} alt="github" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
);
