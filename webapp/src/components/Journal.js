
import React from 'react';
import {Link} from 'react-router-dom';

export default function ({match}) {
  return <div>
    <h2><Link to="/" className="btn btn-link">{'<<'} Back</Link> Journal: {match.params.journalId}</h2>

    <p>Here we will show:</p>
    <ul>
      <li>a bar chart of coverage by year</li>
      <li>a table of the top 100 most downloaded papers</li>
    </ul>
  </div>;
}

