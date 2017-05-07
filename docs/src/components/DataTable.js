
import React from 'react';
import $ from 'jquery';
import {fetchJournalDataMemoized} from "../utils/data";

require('datatables.net');
require('datatables-select');
require('datatables.net-dt/css/jquery.dataTables.css');

export default class DataTable extends React.Component {
  initTable (table) {
    let options = this._tableOptions();
    this.dataTable = $(table).dataTable(options).api();

    this.dataTable
      .on('select', (e, dt, type, indexes) => {
        let rowData = this.dataTable.rows(indexes).data().toArray()[0];
        this._selectJournal(rowData);
      });
  }

  // destroy the data table when the component is about to be unmounted
  componentWillUnmount () {
    this.dataTable.destroy();
  }

  componentDidUpdate() {
    this.redraw();
  }

  render() {
    return (
      <div className="table-responsive">
        <table className="table table-bordered display" ref={ (table) => this.initTable(table) } width="100%">
        </table>
      </div>
    );
  }

  // redraws the data table, if it has ajax configuration it will make the request again
  redraw () {
    this.dataTable.draw();
  }

  _selectJournal(journal) {
    this.props.journalSelected && this.props.journalSelected(journal);
  }

  _tableOptions() {
    return $.extend({}, this.props.options, {
      "bInfo": false,
      "paging": false,
      "bDestroy": true,
      responsive: true,
      "bLengthChange": false, // hide page length select
      ajax: async (data, callback, settings) => {
        let rows = await fetchJournalDataMemoized();
        callback({data: rows});
      },
      "bInfo": true,
      "paging": true,
      aoColumns: [
        {bVisible: false, data: 'scopus_id'},
        {sWidth: '50%', sTitle: 'Title', data: 'title_name'},
        {sTitle: 'scihub', data: 'scihub'},
        {sTitle: 'crossref', data: 'crossref'},
        {sTitle: 'coverage', data: 'coverage'},
      ],
      order: [[1, "asc"]],
      search: {regex: true},
      select: true,
      pageLength: 20,
    });
  }

}

