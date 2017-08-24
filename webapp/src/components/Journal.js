
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
      return <div ref={(c)=>this.loaderWrapper = c}><Loading /></div>;
    } else {
      let spec = {
        width: this.elementWidth,
        ...this.props.spec,
      };

      return <VegaLite renderer="svg" {...this.props}
                       spec={ spec }
                       data={this.state.data}
                       enableHover={true}
                       onNewView={(view)=>console.log(view)}/>
    }
  }

  fetchData() {
    this.elementWidth = this.loaderWrapper.offsetWidth;
  }
}

export class JournalsCoverageChart extends FetchDataChart {
  async fetchData() {
    let data = await fetchJournalCoverageChart(this.props.journalId);

    super.fetchData();
    this.setState({ data: { values: data } });
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

    <JournalsCoverageChart spec={spec} journalId={journalId} />
  </div>;
}

