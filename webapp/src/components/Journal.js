
import React from 'react';
import {Link} from 'react-router-dom';
import VegaLite from 'react-vega-lite';

import spec from './journal-coverage-chart.json';
import Loading from "./Loading";
import {fetchJournalCoverageChart} from "../utils/data";

export class FetchDataChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.fetchData();
  }

  render () {
    if (!this.state.data) {
      return <Loading />
    } else {
      return <VegaLite {...this.props} data={this.state.data}/>
    }
  }

  fetchData() {
    throw new Error('not implemented');
  }
}

export class JournalsCoverageChart extends FetchDataChart {
  async fetchData() {
    let data = await fetchJournalCoverageChart(this.props.journalId);
    this.setState({data});
  }
}

export default function ({match: {params: {journalId}}}) {
  return <div>
    <h2><Link to="/journals" className="btn btn-link">{'<<'} Back</Link> Journal: {journalId}</h2>

    <p>Here we will show:</p>
    <ul>
      <li>a bar chart of coverage by year</li>
      <li>a table of the top 100 most downloaded papers</li>
    </ul>

    <JournalsCoverageChart spec={spec} journalId={journalId} width={500} />
  </div>;
}

