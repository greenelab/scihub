
import React from 'react';
import Griddle, {plugins} from 'griddle-react';
import {format, isString} from "../utils/helpers";
import Loading from "./Loading";

import styles from './table.scss';
import Tooltip from './tooltip';


export const NumberCell = ({value}) => <span>{format.number(value, 0)}</span>;

export const PercentCell = ({value}) => <span className={styles.percent}>{format.percent(value)}</span>;

export const TableLayout = ({ Table, Pagination, Filter }) => (
  <div>
    <Filter />

    <div className="table-responsive">
      <Table />
    </div>

    <Pagination />
  </div>
);




// enhance cells with row data
// thanks to http://griddlegriddle.github.io/Griddle/examples/getDataFromRowIntoCell/
export const rowDataSelector = (state, { griddleKey }) => {
  return state
    .get('data')
    .find(rowMap => rowMap.get('griddleKey') === griddleKey)
    .toJSON();
};





export class FetchDataTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data
    };
  }

  componentDidMount() {
    if (!this.props.data) {
      this.fetchData();
    }
  }

  render () {
    if (this.state.error) {
      return <div className="no-data">No data available.</div>;
    } else if (!this.state.data) {
      return <Loading />
    } else {
      return <Griddle data={this.state.data}
                      plugins={[plugins.LocalPlugin]}
                      pageProperties={this.pageProperties()}
                      components={{
                        Layout: TableLayout
                      }}
                      sortProperties={this.sortProperties()}
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
        {this.rowDefinition()}
      </Griddle>
    }
  }

  pageProperties() {
    return {pageSize: 20};
  }

  sortProperties() {
    return [
      { id: 'crossref', sortAscending: false },
    ];
  }

  rowDefinition() {
    return <RowDefinition />;
  }

  fetchData() {
    throw new Error('not implemented');
  }
}

export const TableHeaderTip = ({tooltip}) => <Tooltip title={tooltip}>
  <i className={`glyphicon glyphicon-question-sign ${styles.headerIcon}`} />
</Tooltip>;


export const TooltipHeading = ({title, tooltip, icon}) =>{
  return <a className={styles.header} href="javascript:void(0)">
    {title}
    <TableHeaderTip tooltip={tooltip} />
    {icon && <span className={styles.headerCaret}>{icon}</span>}
  </a>;
};

// Higher order component used to create a custom table header with the given tooltip
export const CreateTooltipHeader = (tooltip) => (props) => <TooltipHeading {...props} tooltip={tooltip} />;


