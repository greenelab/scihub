
import React from 'react';
import {Link} from 'react-router-dom';
import Griddle, { plugins, RowDefinition, ColumnDefinition } from 'griddle-react';
import { connect } from 'react-redux';

import coverageSpec from './journal-coverage-chart.json';
import quantileSpec from './journal-quantile-chart.json';

import * as d3 from 'd3';

import {
  fetchJournalCoverageChart, fetchJournalQuantilesChart,
  fetchJournalTopArticles, fetchJournalInfo
} from "../utils/data";
import {FetchDataChart} from "./chart";
import {
  CreateTooltipHeader, FetchDataTable, NumberCell, rowDataSelector,
  TableHeaderTip
} from "./Table";

import JournalTable, {OpenAccessJournalCell, ActiveJournalCell} from './JournalTable';

import styles from './journal.scss';

export default function ({match: {params: {journalId}}}) {
  return <div>
    <JournalInfoLoader journalId={journalId} />

    <h3 className="text-center">Yearly coverage chart</h3>
    <FetchDataChart spec={coverageSpec} fetchData={()=>fetchJournalCoverageChart(journalId)} />

    <h3 className="text-center">Article access distribution</h3>
    <FetchDataChart spec={quantileSpec} fetchData={()=>fetchJournalQuantilesChart(journalId)} />

    <h3 className="text-center">Top Articles</h3>
    <p className="text-center section-description">The following table shows the 100 most visited articles in Sci-Hub's access logs from September 2015 through February 2016.</p>
    <TopArticlesTable journalId={journalId} />

  </div>;
}


class JournalInfoLoader extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    let data = await fetchJournalInfo(this.props.journalId);
    this.setState({data});
  }

  render() {
    let {journalId} = this.props;
    let {data} = this.state;

    if (!this.state.data) {
      return <div>
        <h2><Link to="/journals" className="btn btn-link">{'<<'} </Link> Journal: {journalId}</h2>
      </div>;
    } else {
      return <JournalInfo data={data} />
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

function JournalInfo({data}) {
  return <div>
    <JournalInfoHeader className="visible-xs" data={data}/>

    <div className="table-responsive pull-right">
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
          <td className="griddle-cell"><span>457,650</span></td>
          <td className="griddle-cell"><span>458,580</span></td>
          <td className="griddle-cell"><span>99.8%</span></td>
        </tr>
        </tbody>
      </table>
    </div>

    <JournalInfoHeader className="hidden-xs" data={data}/>

    <div className="clearfix"></div>

    {data.access_logs && <div>
      <h3 className="text-center">Access Logs</h3>

      <div className="table-responsive">
        <table className="table table-hover table-bordered text-center">
          <thead className="griddle-table-heading">
          <tr>
            <th className="griddle-table-heading-cell text-center">Visitors</th>
            <th className="griddle-table-heading-cell text-center">Downloads</th>
            <th className="griddle-table-heading-cell text-center">Countries</th>
            <th className="griddle-table-heading-cell text-center">Days</th>
            <th className="griddle-table-heading-cell text-center">Months</th>
            <th className="griddle-table-heading-cell text-center">Articles Requested</th>
            <th className="griddle-table-heading-cell text-center">Articles</th>
          </tr>
          </thead>
          <tbody className="griddle-table-body">
          <tr className="griddle-row">
            <td className="griddle-cell"><NumberCell value={data.access_logs.visitors}/></td>
            <td className="griddle-cell"><NumberCell value={data.access_logs.downloads}/></td>
            <td className="griddle-cell"><NumberCell value={data.access_logs.countries}/></td>
            <td className="griddle-cell"><NumberCell value={data.access_logs.days}/></td>
            <td className="griddle-cell"><NumberCell value={data.access_logs.months}/></td>
            <td className="griddle-cell"><NumberCell value={data.access_logs.n_articles_requested}/></td>
            <td className="griddle-cell"><NumberCell value={data.access_logs.n_articles}/></td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>}

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
      <ColumnDefinition id="issued" title="Year" width="20%" customComponent={IssuedYearCell} />

      <ColumnDefinition id="downloads" title="Downloads" customComponent={NumberCell}
                        customHeadingComponent={CreateTooltipHeader('Downloads: total number of times the article was accessed')} />
      <ColumnDefinition id="visitors" title="Visitors" customComponent={NumberCell}
                        customHeadingComponent={CreateTooltipHeader('Visitors: number of IP addresses that accessed the article')} />
      <ColumnDefinition id="countries" title="Countries" customComponent={NumberCell}
                        customHeadingComponent={CreateTooltipHeader('Countries: number of countries (geolocation by IP address) from which the article was accessed')} />
    </RowDefinition>;
  }

  async fetchData() {
    let data = await fetchJournalTopArticles(this.props.journalId);
    this.setState({data});
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



