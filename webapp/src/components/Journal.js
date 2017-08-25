
import React from 'react';
import {Link} from 'react-router-dom';
import Griddle, { plugins, RowDefinition, ColumnDefinition } from 'griddle-react';

import coverageSpec from './journal-coverage-chart.json';
import quantileSpec from './journal-quantile-chart.json';

import {
  fetchJournalCoverageChart, fetchJournalQuantilesChart,
  fetchJournalTopArticles
} from "../utils/data";
import {FetchDataChart} from "./chart";
import {CreateTooltipHeader, FetchDataTable, NumberCell} from "./Table";

export default function ({match: {params: {journalId}}}) {
  return <div>
    <h2><Link to="/journals" className="btn btn-link">{'<<'} Back</Link> Journal: {journalId}</h2>

    <h3 className="text-center">Yearly coverage chart</h3>
    <FetchDataChart spec={coverageSpec} fetchData={()=>fetchJournalCoverageChart(journalId)} />

    <h3 className="text-center">Yearly quantile chart</h3>
    <FetchDataChart spec={quantileSpec} fetchData={()=>fetchJournalQuantilesChart(journalId)} />

    <h3 className="text-center">Top Articles</h3>
    <TopArticlesTable journalId={journalId} />

  </div>;
}



export class TopArticlesTable extends FetchDataTable {
  sortProperties() {
    return [
      { id: 'downloads', sortAscending: false },
    ];
  }

  pageProperties() {
    return {pageSize: 150};
  }

  rowDefinition() {
    return <RowDefinition>
      <ColumnDefinition id="doi" title="DOI"  />
      <ColumnDefinition id="title" title="Title" width="50%"  />
      <ColumnDefinition id="authors" title="Authors" width="50%"
                        customHeadingComponent={CreateTooltipHeader('authors')} />
      <ColumnDefinition id="issued" title="Issued" width="20%"
                        customHeadingComponent={CreateTooltipHeader('issued')} />

      <ColumnDefinition id="downloads" title="Downloads" customComponent={NumberCell}
                        customHeadingComponent={CreateTooltipHeader('Downloads')} />
      <ColumnDefinition id="visitors" title="Visitors" customComponent={NumberCell}
                        customHeadingComponent={CreateTooltipHeader('visitors')} />
      <ColumnDefinition id="countries" title="Countries" customComponent={NumberCell}
                        customHeadingComponent={CreateTooltipHeader('countries')} />

    </RowDefinition>;
  }

  async fetchData() {
    let data = await fetchJournalTopArticles(this.props.journalId);
    this.setState({data});
  }
}
