// borrowed from https://github.com/kristw/react-vega-lite/blob/master/src/VegaLite.jsx

import React from 'react';
import * as vl from 'vega-lite';
import Vega from './Vega';

const VegaLite = props => {
  const parsedProps = Object.assign({}, props);
  const combinedSpec = Object.assign({}, props.spec);
  if (props.data) {
    combinedSpec.data = props.data;
    delete parsedProps.data;
  }
  parsedProps.spec = vl.compile(combinedSpec).spec;

  return <Vega {...parsedProps} />;
};

VegaLite.propTypes = Vega.propTypes;

export default VegaLite;
