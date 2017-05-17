
/* Helper functions used to fetch and pre-process data */

import d3 from 'd3';


export function fetchJournalData() {
  return new Promise((resolve, reject) => {
    d3.tsv(env.journals_data, function(data) {
      for (let journal of data) {
        journal.crossref = parseFloat(journal.crossref);
        journal.scihub = parseFloat(journal.scihub);
        journal.coverage = parseFloat(journal.coverage);
      }
      resolve(data);
    });
  });
}


export const asyncMemoize = (fn) => {
  let value;
  let valueCalculated = false;

  return async (...args) => {
    if (!valueCalculated) {
      value = await fn(...args);
      valueCalculated = true;
    }

    return value;
  }
};

export const fetchJournalDataMemoized = asyncMemoize(fetchJournalData);

