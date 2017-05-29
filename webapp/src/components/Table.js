
import React from 'react';
import Griddle, {plugins} from 'griddle-react';
import {format} from "../utils/helpers";


function VoidLink(props) {
  return <a >{props.displayName || props.columnName}</a>;
}

export default function Table(props) {
  let columnMetadata = props.columnMetadata;
  if (props.columnMetadata) {
    for (let metadata of columnMetadata) {
      if (!metadata.customHeaderComponent && (metadata.sortable === undefined || metadata.sortable!==false)) {
        metadata.customHeaderComponent = VoidLink;
      }
    }
  }

  return <Griddle { ...props }
    columnMetadata={columnMetadata}
    sortDescendingComponent={<span className="caret"></span>}
    sortAscendingComponent={<span className="dropup"><span className="caret"/></span>}
    useGriddleStyles={ false } />;
}

export const LocalTable =(props) => <Table {...props} plugins={[plugins.LocalPlugin]} />;




