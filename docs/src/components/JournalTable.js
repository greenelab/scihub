
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
                        }
                      }}>
        <RowDefinition>
          <ColumnDefinition id="title_name" title="Journal" width="70%" customComponent={JournalCell} />
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

  _journalClicked(data) {
    this.props.journalClicked && this.props.journalClicked(data);
  }
}

export const NumberCell = ({value}) => <span>{format.number(value, 0)}</span>;

export const PercentCell = ({value}) => <span>{format.percent(value)}</span>;

const TableLayout = ({ Table, Pagination, Filter }) => (
  <div>
    <Filter />

    <div className="table-responsive">
      <Table />
    </div>

    <Pagination />
  </div>
);




const rowDataSelector = (state, { griddleKey }) => {
  return state
    .get('data')
    .find(rowMap => rowMap.get('griddleKey') === griddleKey)
    .toJSON();
};

// enhance cells with row data
// thanks to http://griddlegriddle.github.io/Griddle/examples/getDataFromRowIntoCell/
const enhancedWithRowData = connect((state, props) => {
  return {
    // rowData will be available into MyCustomComponent
    rowData: rowDataSelector(state, props)
  };
});


let JournalCell = ({value, rowData})=><div>
  <Link to={`/journal/${rowData.scopus_id}`} className="btn-link">{value}</Link>
</div>;
JournalCell = enhancedWithRowData(JournalCell);



