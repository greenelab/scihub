
import React from 'react';
import {Link} from 'react-router-dom';
import { RowDefinition, ColumnDefinition } from 'griddle-react';
import { connect } from 'react-redux';

import coverageSpec from './journal-coverage-chart.json';
import quantileSpec from './journal-quantile-chart.json';

import * as d3 from 'd3';

import {
  fetchJournalCoverageChart, fetchJournalQuantilesChart,
  fetchJournalTopArticles, fetchJournalInfo
} from "../utils/data";
import {Chart} from "./chart";
import {
  CreateTooltipHeader, FetchDataTable, NumberCell,
  TableHeaderTip, PercentCell, rowDataSelector,
} from "./Table";

import JournalTable, {OpenAccessJournalCell, ActiveJournalCell} from './JournalTable';

import styles from './journal.scss';
import Loading from "./Loading";


export default class JournalDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {ready: false};
    this.journalId = this.props.match.params.journalId;
  }

  async componentDidMount() {
    let [info, coverage, quantiles, articles] = await Promise.all([
      fetchJournalInfo(this.journalId),
      fetchJournalCoverageChart(this.journalId),
      fetchJournalQuantilesChart(this.journalId),
      fetchJournalTopArticles(this.journalId)
    ]);

    this.setState({ready: true, info, coverage, quantiles, articles});
  }

  render() {
    if (!this.state.ready) {
      return <div>
        <h2><Link to="/journals" className="btn btn-link">{'<<'} </Link> Journal: {this.journalId}</h2>

        <Loading />
      </div>;
    } else {
      return <div>
        <JournalInfoHeader data={this.state.info}/>

        <h3 className="">Overall coverage</h3>
        <JournalOverallCoverage data={this.state.info} />

        <h3 className="">Yearly coverage</h3>
        <Chart spec={coverageSpec} data={this.state.coverage}
               tooltip={ {
                          showAllFields: false,
                          fields: [
                            {field: 'scihub', title: 'Sci-Hub', formatType: "number", format: ',d'},
                            {field: 'crossref', title: 'Crossref', formatType: "number", format: ',d'},
                            {field: 'coverage', title: 'Coverage', formatType: "number", format: ',.1%'},
                            {field: 'year', title: 'Year', formatType: 'time', format: '%Y'},
                          ]
                        } }/>

        {this.state.info.access_logs && <div>
          <h3 className="">Access logs summary</h3>
          <p className="section-description">Averages for how often articles published from January 2014 to October 2015 were accessed via Sci-Hub during September 2015 through February 2016.</p>
          <JournalAccessLogs data={this.state.info.access_logs}/>
        </div>}

        <h3 className="">Access logs visitor distribution</h3>
        <p className="section-description">Visitor percentiles are plotted for articles published from January 2014 to October 2015. Visitors refers to the number of unique IP addressed that accessed the article via Sci-Hub from September 2015 to February 2016.</p>
        <Chart spec={quantileSpec} data={this.state.quantiles} />

        <h3 className="">Access logs top articles</h3>
        <p className="section-description">The following table shows the 100 most visited articles in Sci-Hub's access logs from September 2015 through February 2016.</p>
        <TopArticlesTable journalId={this.journalId} data={this.state.articles} />

      </div>;
    }
  }

}

function JournalInfoHeader({data, className = ''}) {
  let title = data.homepage
    ? <a href={data.homepage} target="_blank">{data.title_name}</a>
    : <span>{data.title_name}</span>;

  return <h2 className={className}>
    <Link to="/journals" className="btn btn-link">{'<<'} </Link>
    {title}

    <ActiveJournalCell value={data.active === 1} className={styles.active} />
    <OpenAccessJournalCell value={data.open_access === 1} className={styles.openAccess} />
  </h2>
}

function JournalOverallCoverage({data}) {
  return <div className="table-responsive">
    <table className="table table-hover table-bordered">
      <thead className="griddle-table-heading">
      <tr>
        <th className="griddle-table-heading-cell">Sci-Hub <TableHeaderTip tooltip={JournalTable.Tooltips.scihub}/></th>
        <th className="griddle-table-heading-cell">Crossref <TableHeaderTip tooltip={JournalTable.Tooltips.crossref}/></th>
        <th className="griddle-table-heading-cell">Coverage <TableHeaderTip tooltip={JournalTable.Tooltips.coverage}/></th>
      </tr>
      </thead>
      <tbody className="griddle-table-body">
      <tr className="griddle-row">
        <td className="griddle-cell"><NumberCell value={data.scihub}/></td>
        <td className="griddle-cell"><NumberCell value={data.crossref}/></td>
        <td className="griddle-cell"><PercentCell value={data.coverage}/></td>
      </tr>
      </tbody>
    </table>
  </div>
}

function JournalAccessLogs({data}) {
  return <div className="table-responsive">
      <table className="table table-hover table-bordered">
        <thead className="griddle-table-heading">
        <tr>
          <th className="griddle-table-heading-cell">
            Downloads <TableHeaderTip tooltip="Downloads: total number of times the article was accessed"/>
          </th>
          <th className="griddle-table-heading-cell">
            Visitors <TableHeaderTip tooltip="Visitors: number of IP addresses that accessed the article"/>
          </th>
          <th className="griddle-table-heading-cell">
            Countries <TableHeaderTip tooltip="Countries: number of countries (geolocation by IP address) from which the article was accessed"/>
          </th>
          <th className="griddle-table-heading-cell">Days</th>
          <th className="griddle-table-heading-cell">Months</th>
          <th className="griddle-table-heading-cell">Articles Requested</th>
          <th className="griddle-table-heading-cell">Articles</th>
        </tr>
        </thead>
        <tbody className="griddle-table-body">
        <tr className="griddle-row">
          <td className="griddle-cell"><NumberCell value={data.downloads} decimals={1}/></td>
          <td className="griddle-cell"><NumberCell value={data.visitors} decimals={1}/></td>
          <td className="griddle-cell"><NumberCell value={data.countries} decimals={1}/></td>
          <td className="griddle-cell"><NumberCell value={data.days} decimals={1}/></td>
          <td className="griddle-cell"><NumberCell value={data.months} decimals={1}/></td>
          <td className="griddle-cell"><NumberCell value={data.n_articles_requested}/></td>
          <td className="griddle-cell"><NumberCell value={data.n_articles}/></td>
        </tr>
        </tbody>
      </table>
  </div>;
}

export class TopArticlesTable extends FetchDataTable {
  sortProperties() {
    return [
      { id: 'visitors', sortAscending: false },
    ];
  }

  pageProperties() {
    return {pageSize: 150};
  }

  rowDefinition() {
    return <RowDefinition>
      <ColumnDefinition id="title" title="Title" width="50%" customComponent={JournalTitleCell} />
      <ColumnDefinition id="authors" title="Authors" width="50%" customComponent={AuthorsCell}/>
      <ColumnDefinition id="year" title="Year" width="20%" customComponent={IssuedYearCell} />

      <ColumnDefinition id="downloads" title="Downloads" customComponent={NumberCell}
                        customHeadingComponent={CreateTooltipHeader('Downloads: total number of times the article was accessed')} />
      <ColumnDefinition id="visitors" title="Visitors" customComponent={NumberCell}
                        customHeadingComponent={CreateTooltipHeader('Visitors: number of IP addresses that accessed the article')} />
      <ColumnDefinition id="countries" title="Countries" customComponent={NumberCell}
                        customHeadingComponent={CreateTooltipHeader('Countries: number of countries (geolocation by IP address) from which the article was accessed')} />
    </RowDefinition>;
  }
}

export let JournalTitleCell = ({value, rowData}) =>
  <form method="post" action="https://dx.doi.org" target="_blank">
    <button type="submit" name="hdl" value={rowData.doi} className="btn-link text-left">
      {value}
    </button>
  </form>;
JournalTitleCell = connect((state, props) => ({
  // rowData will be available into JournalCell
  rowData: rowDataSelector(state, props)
}))(JournalTitleCell);

const formatYear = d3.time.format("%Y");
export const IssuedYearCell = ({value}) => <span>{value ? formatYear(new Date(value)) : ''}</span>;

class AuthorsCell extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      collapsed: true,
    };

    this._authors = props.value.split(',');
  }

  render() {
    if (this._authors.length < 10) {
      return <span>{this.props.value}</span>;
    } else {
      if (this.state.collapsed) {
        return <span>
          {this._authors.slice(0, 6).join(',')}
          <br/>
          <a href="javascript:void(0)" onClick={()=>this.setState({collapsed: false})}>Show All</a>
        </span>;
      } else {
        return <span>
          {this.props.value}
          <br/>
          <a href="javascript:void(0)" onClick={()=>this.setState({collapsed: true})}>Show Less</a>
        </span>
      }
    }
  }
}
