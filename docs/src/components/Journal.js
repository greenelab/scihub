
import React from 'react';

export default function ({match}) {
  return <h1>Details for Journal: {match.params.journalId}</h1>;
}

