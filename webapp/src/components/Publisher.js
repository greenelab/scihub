
import * as d3 from 'd3';
import React from 'react';
import {Link} from 'react-router-dom';

import Loading from "./Loading";

import styles from './journal.scss';

export default class PublisherDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {ready:false};
    // get the publisher id from the url, this parameter is passed by the router
    this.publisherId = this.props.match.params.publisherId;
    console.log(this.props.match);
  }

  render() {
    if (!this.state.ready) {
      return <div>
        <h2><Link to="/publishers" className="btn btn-link">{'<<'} </Link> {this.publisherId}</h2>
        <Loading />
      </div>;
    } else {

    }
  }
}
