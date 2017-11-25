
import * as d3 from 'd3';
import React from 'react';
import {Link} from 'react-router-dom';

import Loading from "./Loading";

import styles from './journal.scss';

import {
  fetchPublisherCoverageChart, fetchPublisherInfo,
  fetchPublisherQuantilesChart, fetchPublisherTopArticles
} from "../utils/data";
import {NumberCell, PercentCell, TableHeaderTip} from "./Table";
import {ActiveHeadingComponent, OpenAccessHeadingComponent} from "./PublisherTable";

export default class PublisherDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {ready:false};
    // get the publisher id from the url, this parameter is passed by the router
    this.publisherId = this.props.match.params.publisherId;
  }

  async componentDidMount() {
    let [info, coverage, quantiles, articles] = await Promise.all([
      fetchPublisherInfo(this.publisherId),
      fetchPublisherCoverageChart(this.publisherId),
      fetchPublisherQuantilesChart(this.publisherId),
      fetchPublisherTopArticles(this.publisherId),
    ]);

    this.setState({ready: true, info, coverage, quantiles, articles});
  }

  render() {
    if (!this.state.ready) {
      return <div>
        <h2><Link to="/publishers" className="btn btn-link">{'<<'} </Link> {this.publisherId}</h2>
        <Loading />
      </div>;
    } else {
      return <div>
        <h2>
          <Link to="/publishers" className="btn btn-link">{'<<'} </Link>
          {this.state.info.publisher_name}
        </h2>

        <div className={styles.section}>
          <h3>Overall coverage</h3>
          <PublisherOverallCoverage data={this.state.info} />
        </div>


      </div>;
    }
  }
}

function PublisherOverallCoverage({data}) {
  return <div className="table-responsive">
    <table className="table table-hover table-bordered">
      <thead className="griddle-table-heading">
      <tr>
        {[['Journals', 'The number of journals from the publisher.'],
          ['Sci-Hub', 'The total number of the publisher\'s articles which are in Sci-Hub\'s database.'],
          ['Crossref', 'The total number of articles in journals from the publisher, as extracted from Crossref.'],
          ['Coverage', 'The number of articles in Sci-Hub divided by the total number of articles.'],
         ].map(([title, tooltip], index) => <th key={index} className="griddle-table-heading-cell">{title} <TableHeaderTip tooltip={tooltip}/></th>)}
        <th className="griddle-table-heading-cell"><OpenAccessHeadingComponent /></th>
        <th className="griddle-table-heading-cell"><ActiveHeadingComponent /></th>
      </tr>
      </thead>
      <tbody className="griddle-table-body">
      <tr className="griddle-row">
        <td className="griddle-cell"><NumberCell value={data.journals}/></td>
        <td className="griddle-cell"><NumberCell value={data.scihub}/></td>
        <td className="griddle-cell"><NumberCell value={data.crossref}/></td>
        <td className="griddle-cell"><PercentCell value={data.coverage}/></td>
        <td className="griddle-cell"><PercentCell value={data.crossref_open_access_percent}/></td>
        <td className="griddle-cell"><PercentCell value={data.crossref_open_active_percent}/></td>
      </tr>
      </tbody>
    </table>
  </div>
}


