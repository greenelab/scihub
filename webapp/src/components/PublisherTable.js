
import React from 'react';
import {fetchPublishersDataMemoized} from "../utils/data";
import Griddle, { plugins, RowDefinition, ColumnDefinition } from 'griddle-react';

import {NumberCell, PercentCell, rowDataSelector, TableLayout} from "./Table";
import {FetchDataTable} from "./Table";

export default class PublishersTable extends FetchDataTable {
  sortProperties() {
    return [
      { id: 'crossref', sortAscending: false },
    ];
  }

  rowDefinition() {
    return <RowDefinition>
      <ColumnDefinition id="category" title="Publisher" width="70%" />
      <ColumnDefinition id="titles" title="Titles" customComponent={NumberCell}  />
      <ColumnDefinition id="scihub" title="Sci-Hub" customComponent={NumberCell}  />
      <ColumnDefinition id="crossref" title="Crossref" customComponent={NumberCell} />
      <ColumnDefinition id="coverage" title="Coverage" customComponent={PercentCell} />
    </RowDefinition>;
  }

  async fetchData() {
    let data = await fetchPublishersDataMemoized();
    this.setState({data});
  }
}

