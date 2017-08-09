
import React from 'react';
import {fetchJournalDataMemoized} from "../utils/data";
import Griddle, { plugins, RowDefinition, ColumnDefinition } from 'griddle-react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import Tooltip from './tooltip';

import styles from './journal-table.scss';
import {
  CreateTooltipHeader, NumberCell, PercentCell, rowDataSelector,
  TableLayout
} from "./Table";
import {FetchDataTable} from "./Table";

export default class JournalTable extends FetchDataTable {
  sortProperties() {
    return [
      { id: 'crossref', sortAscending: false },
    ];
  }

  render () {
    return <div>
      <h2 className="section-title">Journal Coverage Table</h2>
      <p className="section-description">The following table shows Sci-Hub's article coverage, as of March 2017, for each journal.</p>

      {super.render()}
    </div>
  }

  rowDefinition() {
    return <RowDefinition>
      <ColumnDefinition id="active" title=" " width="20px" customComponent={ActiveJournalCell} />
      <ColumnDefinition id="title_name" title="Journal" width="70%" //customComponent={JournalCell}
                        customHeadingComponent={CreateTooltipHeader('The journal\'s name, as extracted from Scopus.')} />
      <ColumnDefinition id="open_access" title=" " width="20px" customComponent={OpenAccessJournalCell} />
      <ColumnDefinition id="scihub" title="Sci-Hub" customComponent={NumberCell}
                        customHeadingComponent={CreateTooltipHeader('The total number of the journal\'s articles which are in Sci-Hub\'s database.')} />
      <ColumnDefinition id="crossref" title="Crossref" customComponent={NumberCell}
                        customHeadingComponent={CreateTooltipHeader('The total number of articles published by the journal, as extracted from Crossref.')} />
      <ColumnDefinition id="coverage" title="Coverage" customComponent={PercentCell}
                        customHeadingComponent={CreateTooltipHeader('The number of articles in Sci-Hub divided by the total number of articles.')} />
    </RowDefinition>;
  }

  async fetchData() {
    let data = await fetchJournalDataMemoized();
    this.setState({data});
  }
}

let JournalCell = ({value, rowData})=><div>
  <Link to={`/journal/${rowData.scopus_id}`} className="btn-link">{value}</Link>
</div>;
JournalCell = connect((state, props) => ({
  // rowData will be available into JournalCell
  rowData: rowDataSelector(state, props)
}))(JournalCell);

let ActiveJournalCell = ({value}) =>
  <div className="text-center">
    {value
    ? <Tooltip title="Active: this journal still publishes articles.">
        <i className="glyphicon glyphicon-ok text-success" />
      </Tooltip>
    : <Tooltip title="Inactive: this journal no longer publishes articles.">
        <i className="glyphicon glyphicon-remove text-danger"  />
      </Tooltip>
    }
  </div>;

let OpenAccessJournalCell = ({value}) => <div className="text-center">
  {value && <Tooltip title="The articles of this journal are free to read.">
      <img src="https://upload.wikimedia.org/wikipedia/commons/7/77/Open_Access_logo_PLoS_transparent.svg"
                   className="open-access-logo" />
    </Tooltip>
  }
</div>;

