// borrowed from https://github.com/kristw/react-vega/blob/master/src/Vega.jsx

import React, {PropTypes} from 'react';
import * as vega from 'vega';

import {vega as vegaTooltip} from 'vega-tooltip';

import 'vega-tooltip/build/vega-tooltip.css';

export default class Vega extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    spec: PropTypes.object.isRequired,
    width: PropTypes.number,
    height: PropTypes.number,
    padding: PropTypes.object,
    viewport: PropTypes.array,
    renderer: PropTypes.string,
    data: PropTypes.object,
    updateOptions: PropTypes.object,
  };

  componentDidMount() {
    this.createVis(this.props.spec);
  }

  componentWillUnmount() {
    this.clearListeners();
  }

  componentDidUpdate(prevProps) {
    if (this.props.spec !== prevProps.spec) {
      this.clearView();
      this.createVis(this.props.spec);
    }
  }

  createVis(spec) {
    if (spec) {
      const props = this.props;
      let vis = this.vis = new vega.View(vega.parse(spec));

      if (props.renderer) {
        vis.renderer(props.renderer);
      }

      vis
        .initialize(this.element)
        .hover()
        .run();

      if (this.props.tooltip) {
        vegaTooltip(vis, this.props.tooltip);
      }
    } else {
      this.clearListeners();
      this.vis = null;
    }
    return this;
  }

  // Remove listeners from the signals
  clearListeners() {
    return this;
  }

  clearView() {
    if (this.view) {
      this.view.finalize();
      this.view = null;
    }
    return this;
  }

  render() {
    return (
      // Create the container Vega draws inside
      <div ref={c => { this.element = c; }} className={this.props.className}
           style={this.props.style} />
    );
  }

}

