
import React from 'react';
import {Link} from 'react-router-dom';
import Griddle, { plugins, RowDefinition, ColumnDefinition } from 'griddle-react';
import { connect } from 'react-redux';

import coverageSpec from './journal-coverage-chart.json';
import quantileSpec from './journal-quantile-chart.json';

import * as d3 from "d3";

import {
  fetchJournalCoverageChart, fetchJournalQuantilesChart,
  fetchJournalTopArticles
} from "../utils/data";
import {FetchDataChart} from "./chart";
import {CreateTooltipHeader, FetchDataTable, NumberCell, rowDataSelector} from "./Table";

export default function ({match: {params: {journalId}}}) {
  return <div>
    <h2><Link to="/journals" className="btn btn-link">{'<<'} Back</Link> Journal: {journalId}</h2>

    <h3 className="text-center">Yearly coverage chart</h3>
    <FetchDataChart spec={coverageSpec} fetchData={()=>fetchJournalCoverageChart(journalId)} />

    <h3 className="text-center">Article access distribution</h3>
    <FetchDataChart spec={quantileSpec} fetchData={()=>fetchJournalQuantilesChart(journalId)} />

    <h3 className="text-center">Top Articles</h3>
    <p className="text-center section-description">The following table shows the 100 most visited articles in Sci-Hub's access logs from September 2015 through February 2016.</p>
    <TopArticlesTable journalId={journalId} />

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
      <ColumnDefinition id="doi" title="DOI" customComponent={DoiCell} />
      <ColumnDefinition id="title" title="Title" width="50%"  />
      <ColumnDefinition id="authors" title="Authors" width="50%" />
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

export let DoiCell = ({value}) =>
  <span>
    <form method="post" action="https://dx.doi.org" target="_blank">
      <input type="hidden" name="hdl" value={value} />
      <input type="image" src="http://www.doi.org/img/Logo_TM.png" alt="Submit" title={value} />
    </form>
  </span>;


const formatYear = d3.time.format("%Y");
export const IssuedYearCell = ({value}) => <span>{value ? formatYear(new Date(value)) : ''}</span>;


