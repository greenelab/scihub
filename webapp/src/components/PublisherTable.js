
import React from 'react';
import {fetchPublishersDataMemoized} from "../utils/data";
import Griddle, { plugins, RowDefinition, ColumnDefinition } from 'griddle-react';

import {
  CreateTooltipHeader, NumberCell, PercentCell, rowDataSelector,
  TableLayout
} from "./Table";
import {FetchDataTable, TooltipHeading} from "./Table";

export default class PublishersTable extends FetchDataTable {
  render () {
    return <div>
      <h2 className="section-title">Publisher Coverage Table</h2>
      <p className="section-description">The following table shows Sci-Hub's article coverage, as of March 2017, for each scholarly publisher.</p>

      {super.render()}
    </div>
  }

  sortProperties() {
    return [
      { id: 'crossref', sortAscending: false },
    ];
  }

  rowDefinition() {
    return <RowDefinition>
      <ColumnDefinition id="category" title="Publisher" width="70%"
                        customHeadingComponent={CreateTooltipHeader('The publisher as extracted from Scopus.')} />
      <ColumnDefinition id="journals" title="Journals" customComponent={NumberCell}
                        customHeadingComponent={CreateTooltipHeader('The number of journals from the publisher.')} />
      <ColumnDefinition id="scihub" title="Sci-Hub" customComponent={NumberCell}
                        customHeadingComponent={CreateTooltipHeader('The total number of the publisher\'s articles which are in Sci-Hub\'s database.')} />
      <ColumnDefinition id="crossref" title="Crossref" customComponent={NumberCell}
                        customHeadingComponent={CreateTooltipHeader('The total number of articles in journals from the publisher, as extracted from Crossref.')} />
      <ColumnDefinition id="coverage" title="Coverage" customComponent={PercentCell}
                        customHeadingComponent={CreateTooltipHeader('The number of articles in Sci-Hub divided by the total number of articles.')} />
    </RowDefinition>;
  }

  async fetchData() {
    let data = await fetchPublishersDataMemoized();
    this.setState({data});
  }
}

