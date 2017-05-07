
import React from 'react';
import $ from 'jquery';
import dt from 'datatables.net';


class DataTableBase extends React.Component {
  /*
   tableOptions() {}
   Add this method to components to specify any additional options
   * */
  initTable (table) {
    let options = $.extend({
      "bInfo": false,
      "paging": false,
      "bDestroy": true,
      responsive: true,
      "bLengthChange": false, // hide page length select
    }, this.tableOptions());

    this.dataTable = $(table).dataTable(options).api();
  }

  // redraws the data table, if it has ajax configuration it will make the request again
  redraw () {
    this.dataTable.draw();
  }

  // destroy the data table when the component is about to be unmounted
  componentWillUnmount () {
    this.dataTable.destroy();
  }
}



export default class DataTable extends DataTableBase {
  tableOptions() {
    return $.extend({}, this.props.options, {
      processing: true,
      serverSide: true,
      "lengthMenu": [[10, 20, 50], [10, 20, 50]],
      "pageLength": 10,
      "paging": true,
      "bLengthChange": true,
    });
  }

  componentDidUpdate() {
    this.redraw();
  }

  render() {
    return (
      <div className="table-responsive" style={this.props.style}>
        <table className="table table-bordered display" ref={ this.initTable }
               cellspacing="0" width="100%">
          <thead>
          <tr>
            {/*this.props.columns.map((col, index) =>
              <td className="text-center">{ col }</td>
            ) */}
          </tr>
          </thead>
        </table>
      </div>
    );
  }
}


