/* Helper functions used to fetch and pre-process data */

import * as d3Fetch from 'd3-fetch';
import { asyncMemoize } from './helpers';

// Update these commits hashes when the data is updated on the respecive repositories
// commit hash to access data on https://github.com/greenelab/scihub
const SCIHUB_COMMIT = '05f9410b0df0db7b2b9cdc12e8d9a5190ed8683f';
// commit hash for urls in https://github.com/greenelab/scihub-browser-data
const BROWSER_DATA_COMMIT = '7e1e92c59c4c1e03488e047e0b0d178e35fe7488';

const ROUTES = {
  journals: () =>
    `https://raw.githubusercontent.com/greenelab/scihub/${SCIHUB_COMMIT}/data/journal-coverage.tsv`,
  publishers: () =>
    `https://raw.githubusercontent.com/greenelab/scihub/${SCIHUB_COMMIT}/data/publisher-coverage.tsv`,

  journal: {
    info: journalId =>
      `https://media.githubusercontent.com/media/greenelab/scihub-browser-data/${BROWSER_DATA_COMMIT}/journals/${journalId}/info-${journalId}.json`,
    yearlyCoverage: journalId =>
      `https://media.githubusercontent.com/media/greenelab/scihub-browser-data/${BROWSER_DATA_COMMIT}/journals/${journalId}/yearly-coverage-${journalId}.tsv`,
    accessQuantiles: journalId =>
      `https://media.githubusercontent.com/media/greenelab/scihub-browser-data/${BROWSER_DATA_COMMIT}/journals/${journalId}/access-quantiles-${journalId}.tsv`,
    topArticles: journalId =>
      `https://media.githubusercontent.com/media/greenelab/scihub-browser-data/${BROWSER_DATA_COMMIT}/journals/${journalId}/top-articles-${journalId}.tsv`
  },

  publisher: {
    info: id =>
      `https://raw.githubusercontent.com/greenelab/scihub-browser-data/${BROWSER_DATA_COMMIT}/publishers/${id}/info.json`,
    topArticles: id =>
      `https://raw.githubusercontent.com/greenelab/scihub-browser-data/${BROWSER_DATA_COMMIT}/publishers/${id}/top-articles.tsv`,
    yearlyCoverage: id =>
      `https://raw.githubusercontent.com/greenelab/scihub-browser-data/${BROWSER_DATA_COMMIT}/publishers/${id}/yearly-coverage.tsv`,
    accessQuantiles: id =>
      `https://raw.githubusercontent.com/greenelab/scihub-browser-data/${BROWSER_DATA_COMMIT}/publishers/${id}/access-quantiles.tsv`
  }
};

export function fetchTsv({ url, forEach }) {
  return d3Fetch.tsv(url, forEach);
}

export const fetchJournalData = () =>
  fetchTsv({
    url: ROUTES.journals(),
    forEach: journal => ({
      ...journal,
      crossref: parseFloat(journal.crossref),
      scihub: parseFloat(journal.scihub),
      coverage: parseFloat(journal.coverage),
      open_access: journal.open_access === '1',
      active: journal.active === '1'
    })
  });

export const fetchJournalDataMemoized = asyncMemoize(fetchJournalData);

export const fetchJournalInfo = journalId =>
  d3Fetch.json(ROUTES.journal.info(journalId));

export const fetchJournalCoverageChart = journalId =>
  fetchTsv({
    url: ROUTES.journal.yearlyCoverage(journalId),
    forEach: row => ({
      ...row,
      coverage: parseFloat(row.scihub) / parseFloat(row.crossref)
    })
  });

export const fetchJournalQuantilesChart = journalId =>
  fetchTsv({
    url: ROUTES.journal.accessQuantiles(journalId)
  });

export const fetchJournalTopArticles = journalId =>
  fetchTsv({
    url: ROUTES.journal.topArticles(journalId),
    forEach: row => ({
      ...row,
      downloads: parseFloat(row.downloads),
      visitors: parseFloat(row.visitors),
      countries: parseFloat(row.countries)
    })
  });

export const fetchPublishersData = () =>
  fetchTsv({
    url: ROUTES.publishers(),
    forEach: publisher => ({
      ...publisher,
      journals: parseFloat(publisher.journals),
      crossref: parseFloat(publisher.crossref),
      crossref_open_access: parseFloat(publisher.crossref_open_access),
      crossref_active: parseFloat(publisher.crossref_active),
      scihub: parseFloat(publisher.scihub),
      coverage: parseFloat(publisher.coverage),

      // calculated fields
      crossref_open_access_percent:
        publisher.crossref_open_access / publisher.crossref,
      crossref_open_active_percent:
        publisher.crossref_active / publisher.crossref
    })
  });

export const fetchPublishersDataMemoized = asyncMemoize(fetchPublishersData);

export const fetchPublisherInfo = slug =>
  d3Fetch.json(ROUTES.publisher.info(slug)).then(data => ({
    ...data,
    crossref_open_access_percent: data.crossref_open_access / data.crossref,
    crossref_open_active_percent: data.crossref_active / data.crossref
  }));

export const fetchPublisherCoverageChart = slug =>
  fetchTsv({
    url: ROUTES.publisher.yearlyCoverage(slug),
    forEach: row => ({
      ...row,
      coverage: parseFloat(row.scihub) / parseFloat(row.crossref),
      open_access: row.open_access === '0' ? 'Toll Access' : 'Open Access'
    })
  });

export const fetchPublisherQuantilesChart = slug =>
  fetchTsv({
    url: ROUTES.publisher.accessQuantiles(slug)
  });

export const fetchPublisherTopArticles = slug =>
  fetchTsv({
    url: ROUTES.publisher.topArticles(slug),
    forEach: row => ({
      ...row,
      downloads: parseFloat(row.downloads),
      visitors: parseFloat(row.visitors),
      countries: parseFloat(row.countries)
    })
  });
