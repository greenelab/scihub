import React from 'react';
import { Link } from 'react-router-dom';

import coverageSpec from './journal-coverage-chart.json';
import quantileSpec from './journal-quantile-chart.json';

import {
  fetchJournalCoverageChart,
  fetchJournalQuantilesChart,
  fetchJournalTopArticles,
  fetchJournalInfo
} from '../utils/data';
import { Chart } from './chart';
import { NumberCell, TableHeaderTip, PercentCell } from './Table';

import JournalTable, {
  OpenAccessJournalCell,
  ActiveJournalCell
} from './JournalTable';

import Loading from './Loading';

import styles from './journal.scss';
import { TopArticlesTable, NoData, AccessLogs } from './details';

// Renders the journals details page
export default class JournalDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ready: false };
    this.journalId = this.props.match.params.journalId;
  }

  async componentDidMount() {
    let [info, coverage, quantiles, articles] = await Promise.all([
      fetchJournalInfo(this.journalId),
      fetchJournalCoverageChart(this.journalId),
      fetchJournalQuantilesChart(this.journalId),
      fetchJournalTopArticles(this.journalId)
    ]);
    
    this.setState({ ready: true, info, coverage, quantiles, articles });
  }

  render() {
    if (!this.state.ready) {
      return (
        <div>
          <h2>
            <Link to="/journals" className="btn btn-link">
              {'<<'}{' '}
            </Link>{' '}
            Journal: {this.journalId}
          </h2>
          <Loading />
        </div>
      );
    } else {
      return (
        <div>
          <JournalInfoHeader data={this.state.info} />

          <div className={styles.section}>
            <h3 className="">Overall coverage</h3>
            <JournalOverallCoverage data={this.state.info} />
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
      return (
        <TopArticlesTable
          journalId={this.journalId}
          data={this.state.articles}
        />
      );
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
          tooltip={{
            showAllFields: false,
            fields: [
              {
                field: 'scihub',
                title: 'Sci-Hub',
                formatType: 'number',
                format: ',d'
              },
              {
                field: 'crossref',
                title: 'Crossref',
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

function JournalInfoHeader({ data, className = '' }) {
  let title = data.homepage ? (
    <a href={data.homepage} target="_blank">
      {data.title_name}
    </a>
  ) : (
    <span>{data.title_name}</span>
  );

  return (
    <h2 className={className}>
      <Link to="/journals" className="btn btn-link">
        {'<<'}{' '}
      </Link>
      {title}

      <ActiveJournalCell value={data.active === 1} className={styles.active} />
      <OpenAccessJournalCell
        value={data.open_access === 1}
        className={styles.openAccess}
      />
    </h2>
  );
}

function JournalOverallCoverage({ data }) {
  return (
    <div className="table-responsive">
      <table className="table table-hover table-bordered">
        <thead className="griddle-table-heading">
          <tr>
            <th className="griddle-table-heading-cell">
              Sci-Hub <TableHeaderTip tooltip={JournalTable.Tooltips.scihub} />
            </th>
            <th className="griddle-table-heading-cell">
              Crossref{' '}
              <TableHeaderTip tooltip={JournalTable.Tooltips.crossref} />
            </th>
            <th className="griddle-table-heading-cell">
              Coverage{' '}
              <TableHeaderTip tooltip={JournalTable.Tooltips.coverage} />
            </th>
          </tr>
        </thead>
        <tbody className="griddle-table-body">
          <tr className="griddle-row">
            <td className="griddle-cell">
              <NumberCell value={data.scihub} />
            </td>
            <td className="griddle-cell">
              <NumberCell value={data.crossref} />
            </td>
            <td className="griddle-cell">
              <PercentCell value={data.coverage} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
