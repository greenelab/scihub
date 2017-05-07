
import React from 'react';
import $ from 'jquery';
import dt from 'datatables.net';


class DataTableBase extends React.Component {
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
      ajax: (data, callback, settings) => callback(this.loadData()),
      aoColumns: [
        {bVisible: false},
        {sWidth: '50%', sTitle: 'Title'},
        {sTitle: 'scihub'},
        {sTitle: 'crossref'},
        {sTitle: 'coverage'}
      ],
      order: [[2, "desc"]],
      search: {regex: true}
    });
  }

  componentDidUpdate() {
    this.redraw();
  }

  render() {
    return (
      <div className="table-responsive" style={this.props.style}>
        <table className="table table-bordered display" ref={ (table) => this.initTable(table) } width="100%">
          <thead>
          <tr>
          </tr>
          </thead>
        </table>
      </div>
    );
  }

  loadData() {
    return {
      data: [
        [
          12001,	'Journal of the Experimental Analysis of Behavior',	2562,	4400,	0.58227
        ], [
          12001,	'Foo',	2562,	4400,	0.58227
        ],
      ]
    };
  }

}

