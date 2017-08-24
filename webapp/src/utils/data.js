
/* Helper functions used to fetch and pre-process data */

import d3 from 'd3';


export function fetchJournalData() {
  return new Promise((resolve, reject) => {
    d3.tsv(env.journals_data, function(data) {
      for (let journal of data) {
        journal.crossref = parseFloat(journal.crossref);
        journal.scihub = parseFloat(journal.scihub);
        journal.coverage = parseFloat(journal.coverage);

        journal.open_access = journal.open_access === '1';
        journal.active = journal.active === '1';
      }
      resolve(data);
    });
  });
}

export function fetchJournalCoverageChart(journalId) {
  let path = 'https://github.com/greenelab/scihub/files/1058944/jounal-year-coverage-12001.txt';
  return new Promise((resolve, reject) => {
    d3.tsv(path, function(data) {
      resolve(data);
    });
  });
}


export function fetchPublishersData() {
  return new Promise((resolve, reject) => {
    d3.tsv(env.publishers_data, function(data) {
      data = data.filter((x) => x.facet === 'Publisher');
      for (let journal of data) {
        journal.titles = parseFloat(journal.titles);
        journal.journals = parseFloat(journal.journals);
        journal.crossref = parseFloat(journal.crossref);
        journal.crossref_open_access = parseFloat(journal.crossref_open_access);
        journal.crossref_active = parseFloat(journal.crossref_active);
        journal.scihub = parseFloat(journal.scihub);
        journal.coverage = parseFloat(journal.coverage);

        // calculated fields
        journal.crossref_open_access_percent = journal.crossref_open_access/journal.crossref;
        journal.crossref_open_active_percent = journal.crossref_active/journal.crossref;
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
export const fetchPublishersDataMemoized = asyncMemoize(fetchPublishersData);



