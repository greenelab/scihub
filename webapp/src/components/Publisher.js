import React from 'react';
import { Link } from 'react-router-dom';

import Loading from './Loading';

import styles from './journal.scss';

import {
  fetchPublisherCoverageChart,
  fetchPublisherInfo,
  fetchPublisherQuantilesChart,
  fetchPublisherTopArticles
} from '../utils/data';
import { NumberCell, PercentCell, TableHeaderTip } from './Table';
import {
  ActiveHeadingComponent,
  OpenAccessHeadingComponent
} from './PublisherTable';
import { Chart } from './chart';
import { NoData, AccessLogs, TopArticlesTable } from './details';

import coverageSpec from './publisher-coverage-chart.json';
import quantileSpec from './journal-quantile-chart.json';

export default class PublisherDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ready: false };
    // get the publisher id from the url, this parameter is passed by the router
    this.publisherId = this.props.match.params.publisherId;
  }

  async componentDidMount() {
    let [info, coverage, quantiles, articles] = await Promise.all([
      fetchPublisherInfo(this.publisherId),
      fetchPublisherCoverageChart(this.publisherId),
      fetchPublisherQuantilesChart(this.publisherId),
      fetchPublisherTopArticles(this.publisherId)
    ]);

    this.setState({ ready: true, info, coverage, quantiles, articles });
  }

  render() {
    if (!this.state.ready) {
      return (
        <div>
          <h2>
            <Link to="/publishers" className="btn btn-link">
              {'<<'}{' '}
            </Link>{' '}
            {this.publisherId}
          </h2>
          <Loading />
        </div>
      );
    } else {
      return (
        <div>
          <h2>
            <Link to="/publishers" className="btn btn-link">
              {'<<'}{' '}
            </Link>
            {this.state.info.publisher_name}
          </h2>

          <div className={styles.section}>
            <h3>Overall coverage</h3>
            <PublisherOverallCoverage data={this.state.info} />
          </div>

          <div className={styles.section}>
            <h3 className="">Yearly coverage</h3>
            {this._coverageChart()}
          </div>

          {this.state.info.access_logs && (
            <div className={styles.section}>
              <h3 className="">Access logs summary</h3>
              <p className="section-description">
                Averages for how often articles published from January 2014 to
                October 2015 were accessed via Sci-Hub during September 2015
                through February 2016.
              </p>
              <AccessLogs data={this.state.info.access_logs} />
            </div>
          )}

          <div className={styles.section}>
            <h3 className="">Access logs visitor distribution</h3>
            <p className="section-description">
              Visitor percentiles are plotted for articles published from
              January 2014 to October 2015. Visitors refers to the number of
              unique IP addressed that accessed the article via Sci-Hub from
              September 2015 to February 2016.
            </p>
            {this._quantilesChart()}
          </div>

          <div className={styles.section}>
            <h3 className="">Access logs top articles</h3>
            <p className="section-description">
              The following table shows the 100 most visited articles in
              Sci-Hub's access logs from September 2015 through February 2016.
            </p>
            {this._topArticles()}
          </div>
        </div>
      );
    }
  }

  _topArticles() {
    if (this.state.articles) {
      return <TopArticlesTable data={this.state.articles} journal={true} />;
    } else {
      return <NoData />;
    }
  }

  _quantilesChart() {
    if (this.state.quantiles) {
      return <Chart spec={quantileSpec} data={this.state.quantiles} />;
    } else {
      return <NoData />;
    }
  }

  _coverageChart() {
    if (this.state.coverage) {
      return (
        <Chart
          spec={coverageSpec}
          data={this.state.coverage}
          adjustWidth={-86}
          tooltip={{
            showAllFields: false,
            fields: [
              {
                field: 'scihub',
                title: 'Articles in Sci-Hub',
                formatType: 'number',
                format: ',d'
              },
              {
                field: 'scihub_journals',
                title: 'Journals in Sci-Hub',
                formatType: 'number',
                format: ',d'
              },
              {
                field: 'crossref',
                title: 'Articles in Crossref',
                formatType: 'number',
                format: ',d'
              },
              {
                field: 'crossref_journals',
                title: 'Journals in Crossref',
                formatType: 'number',
                format: ',d'
              },
              {
                field: 'coverage',
                title: 'Coverage',
                formatType: 'number',
                format: ',.1%'
              },
              { field: 'year', title: 'Year', formatType: 'time', format: '%Y' }
            ]
          }}
        />
      );
    } else {
      return <NoData />;
    }
  }
}

function PublisherOverallCoverage({ data }) {
  return (
    <div className="table-responsive">
      <table className="table table-hover table-bordered">
        <thead className="griddle-table-heading">
          <tr>
            {[
              ['Journals', 'The number of journals from the publisher.'],
              [
                'Sci-Hub',
                "The total number of the publisher's articles which are in Sci-Hub's database."
              ],
              [
                'Crossref',
                'The total number of articles in journals from the publisher, as extracted from Crossref.'
              ],
              [
                'Coverage',
                'The number of articles in Sci-Hub divided by the total number of articles.'
              ]
            ].map(([title, tooltip], index) => (
              <th key={index} className="griddle-table-heading-cell">
                {title} <TableHeaderTip tooltip={tooltip} />
              </th>
            ))}
            <th className="griddle-table-heading-cell">
              <OpenAccessHeadingComponent className="" />
            </th>
            <th className="griddle-table-heading-cell">
              <ActiveHeadingComponent className="" />
            </th>
          </tr>
        </thead>
        <tbody className="griddle-table-body">
          <tr className="griddle-row">
            <td className="griddle-cell">
              <NumberCell value={data.journals} />
            </td>
            <td className="griddle-cell">
              <NumberCell value={data.scihub} />
            </td>
            <td className="griddle-cell">
              <NumberCell value={data.crossref} />
            </td>
            <td className="griddle-cell">
              <PercentCell value={data.coverage} />
            </td>
            <td className="griddle-cell">
              <PercentCell value={data.crossref_open_access_percent} />
            </td>
            <td className="griddle-cell">
              <PercentCell value={data.crossref_open_active_percent} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
