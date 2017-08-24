
import React from 'react';
import {Link} from 'react-router-dom';

import coverageSpec from './journal-coverage-chart.json';
import quantileSpec from './journal-quantile-chart.json';

import {fetchJournalCoverageChart, fetchJournalQuantilesChart} from "../utils/data";
import {FetchDataChart} from "./chart";

export default function ({match: {params: {journalId}}}) {
  return <div>
    <h2><Link to="/journals" className="btn btn-link">{'<<'} Back</Link> Journal: {journalId}</h2>

    <p>Here we will show:</p>
    <ul>
      <li>a bar chart of coverage by year</li>
      <li>a table of the top 100 most downloaded papers</li>
    </ul>

    <h3 className="text-center">Yearly coverage chart</h3>
    <FetchDataChart spec={coverageSpec} fetchData={()=>fetchJournalCoverageChart(journalId)} />

    <h3 className="text-center">Yearly quantile chart</h3>
    <FetchDataChart spec={quantileSpec} fetchData={()=>fetchJournalQuantilesChart(journalId)} />

  </div>;
}

