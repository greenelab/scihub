
import React from 'react';
import Loading from './Loading';
import {fetchJournalData, fetchJournalDataMemoized} from "../utils/data";
import Griddle, { plugins, RowDefinition, ColumnDefinition } from 'griddle-react';
import {format} from "../utils/helpers";
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';

import styles from './journal-table.scss';

export default class JournalTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this._fetchData();
  }

  render () {
    if (!this.state.data) {
      return <Loading />
    } else {
      return <Griddle data={this.state.data}
                      plugins={[plugins.LocalPlugin]}
                      pageProperties={{pageSize: 20}}
                      components={{
                        Layout: TableLayout
                      }}
                      sortProperties={[
                        { id: 'crossref', sortAscending: false },
                      ]}
                      styleConfig={{
                        classNames: {
                          Filter: 'form-control ' + styles.filter,
                          Table: 'table table-hover table-bordered',
                          Pagination: 'form-inline text-center',
                          PageDropdown: 'form-control ' + styles.select,
                          NextButton: 'btn btn-default',
                          PreviousButton: 'btn btn-default',
                          TableHeadingCell: styles.heading,
                        }
                      }}>
        <RowDefinition>
          <ColumnDefinition id="active" title=" " width="20px" customComponent={ActiveJournalCell} />
          <ColumnDefinition id="title_name" title="Journal" width="70%" customComponent={JournalCell} />
          <ColumnDefinition id="open_access" title=" " width="20px" customComponent={OpenAccessJournalCell} />
          <ColumnDefinition id="scihub" title="Sci-Hub" customComponent={NumberCell}  />
          <ColumnDefinition id="crossref" title="Crossref" customComponent={NumberCell} />
          <ColumnDefinition id="coverage" title="Coverage" customComponent={PercentCell} />
        </RowDefinition>
      </Griddle>
    }
  }

  async _fetchData() {
    let data = await fetchJournalDataMemoized();
    this.setState({data});
  }
}
