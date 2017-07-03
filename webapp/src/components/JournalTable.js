
import React from 'react';
import {fetchJournalDataMemoized} from "../utils/data";
import Griddle, { plugins, RowDefinition, ColumnDefinition } from 'griddle-react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';

import styles from './journal-table.scss';
import {NumberCell, PercentCell, rowDataSelector, TableLayout} from "./Table";
import {FetchDataTable} from "./Table";

export default class JournalTable extends FetchDataTable {
  sortProperties() {
    return [
      { id: 'crossref', sortAscending: false },
    ];
  }

  rowDefinition() {
    return <RowDefinition>
      <ColumnDefinition id="active" title=" " width="20px" customComponent={ActiveJournalCell} />
      <ColumnDefinition id="title_name" title="Journal" width="70%" customComponent={JournalCell} />
      <ColumnDefinition id="open_access" title=" " width="20px" customComponent={OpenAccessJournalCell} />
      <ColumnDefinition id="scihub" title="Sci-Hub" customComponent={NumberCell}  />
      <ColumnDefinition id="crossref" title="Crossref" customComponent={NumberCell} />
      <ColumnDefinition id="coverage" title="Coverage" customComponent={PercentCell} />
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

let ActiveJournalCell = ({value}) => <div className="text-center">{value
  ? <i className="glyphicon glyphicon-ok text-success" title="Active: this journal still publishes articles."/>
  : <i className="glyphicon glyphicon-remove text-danger" title="Inactive: this journal no longer publishes articles." />}</div>;

let OpenAccessJournalCell = ({value}) => <div className="text-center">
  {value && <img src="https://upload.wikimedia.org/wikipedia/commons/7/77/Open_Access_logo_PLoS_transparent.svg"
                 className={styles.logo} title="The articles of this journal are free to read."/>}
</div>;

