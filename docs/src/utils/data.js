
/* Helper functions used to fetch and pre-process data */

import d3 from 'd3';

export function fetchJournalData() {
  return new Promise((resolve, reject) => {
    d3.tsv(env.journals_data, function(data) {
      resolve(data);
    });
  });
}



