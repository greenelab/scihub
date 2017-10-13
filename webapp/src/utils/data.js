/* Helper functions used to fetch and pre-process data */

import d3 from 'd3';
import {format} from "./helpers";

export function fetchTsv({url, forEach}) {
  return new Promise((resolve, reject) => {
    d3.tsv(url, function(data) {
        if (forEach) {
          for (let row of data) {
            forEach(row);
          }
        }

        resolve(data);
      })
      .on('error', (e)=>reject(e));
  });
}

export const fetchJournalData = () => fetchTsv({
  url: env.journals_data,
  forEach: (journal) => {
    journal.crossref = parseFloat(journal.crossref);
    journal.scihub = parseFloat(journal.scihub);
    journal.coverage = parseFloat(journal.coverage);

    journal.open_access = journal.open_access === '1';
    journal.active = journal.active === '1';
  }
});

export const fetchJournalInfo = (journalId) => new Promise((resolve, reject) => {
  let url = `https://media.githubusercontent.com/media/greenelab/scihub-browser-data/74e6a70711a9626206968c0fc9accf314aedcb74/journals/${journalId}/info-${journalId}.json`;
  d3.json(url, function(data) {
    resolve(data);
  });
});

export const fetchJournalCoverageChart = (journalId) => fetchTsv({
  url:`https://media.githubusercontent.com/media/greenelab/scihub-browser-data/74e6a70711a9626206968c0fc9accf314aedcb74/journals/${journalId}/yearly-coverage-${journalId}.tsv`,
  forEach: (row) => {
    row.coverage = parseFloat(row.scihub)/parseFloat(row.crossref);
  }
});

export const fetchJournalQuantilesChart = (journalId) => fetchTsv({
  url: `https://media.githubusercontent.com/media/greenelab/scihub-browser-data/74e6a70711a9626206968c0fc9accf314aedcb74/journals/${journalId}/access-quantiles-${journalId}.tsv`,
});

export const fetchJournalTopArticles = (journalId) => fetchTsv({
  url: `https://media.githubusercontent.com/media/greenelab/scihub-browser-data/74e6a70711a9626206968c0fc9accf314aedcb74/journals/${journalId}/top-articles-${journalId}.tsv`,
  forEach: (row) => {
    row.downloads = parseFloat(row.downloads);
    row.visitors = parseFloat(row.visitors);
    row.countries = parseFloat(row.countries);
  }
});

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



