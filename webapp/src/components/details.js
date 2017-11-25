// This file contains helper components for the Journal/Publisher
// details pages

import * as d3 from 'd3';
import React from 'react';
import {Link} from 'react-router-dom';
import { RowDefinition, ColumnDefinition } from 'griddle-react';
import { connect } from 'react-redux';

import {
  CreateTooltipHeader, FetchDataTable, NumberCell,
  TableHeaderTip, rowDataSelector,
} from "./Table";


export function AccessLogs({data}) {
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
      {<ColumnDefinition id="title_name" title="Journal" visible={!!this.props.journal} />}

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


// Text displayed when there's no data available
export function NoData() {
  return <div className="no-data">No data available.</div>;
}

