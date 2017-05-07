
import React from 'react';
import $ from 'jquery';
import dt from 'datatables.net';
import {fetchJournalData} from "../utils/data";


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
      ajax: async (data, callback, settings) => {
        let rows = await fetchJournalData();
        callback({data: rows});
      },
      "paging": true,
      aoColumns: [
        {bVisible: false, data: 'scopus_id'},
        {sWidth: '50%', sTitle: 'Title', data: 'title_name'},
        {sTitle: 'scihub', data: 'scihub'},
        {sTitle: 'crossref', data: 'crossref'},
        {sTitle: 'coverage', data: 'coverage'},
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

}

