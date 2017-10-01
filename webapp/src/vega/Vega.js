// borrowed from https://github.com/kristw/react-vega/blob/master/src/Vega.jsx

import React, {PropTypes} from 'react';
import * as vega from 'vega';

export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

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

  static listenerName(signalName) {
    return `onSignal${capitalize(signalName)}`;
  }

  componentDidMount() {
    this.createVis(this.props.spec);
  }

  componentWillUnmount() {
    this.clearListeners(this.props.spec);
  }

  createVis(spec) {
    if (spec) {
      const props = this.props;
      let vis = this.vis = new vega.View(vega.parse(spec));

      if (props.renderer) {
        vis.renderer(props.renderer);
      }

      vis.initialize(this.element);

      // Attach listeners onto the signals
      if (spec.signals) {
        spec.signals.forEach(signal => {
          vis.onSignal(signal.name, (...args) => {
            const listener = this.props[Vega.listenerName(signal.name)];
            if (listener) {
              listener.apply(this, args);
            }
          });
        });
      }

      vis.run();
    } else {
      this.clearListeners(this.props.spec);
      this.vis = null;
    }
    return this;
  }

  // Remove listeners from the signals
  clearListeners(spec) {
    const vis = this.vis;
    if (vis && spec && spec.signals) {
      spec.signals.forEach(signal => vis.offSignal(signal.name));
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

