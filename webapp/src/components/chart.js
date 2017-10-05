
import React from 'react';
import Loading from "./Loading";
import VegaLite from '../vega';

import styles from './chart.scss';

// Renders a VegaLite chart, expects two properties: spec and data
export class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this._updateDimensions = () => this.updateDimensions();
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this._updateDimensions);
  }

  async componentDidMount() {
    window.addEventListener('resize', this._updateDimensions);
    if (this._wrapper) {
      this.setState({width: this._wrapper.offsetWidth})
    }
  }

  render () {
    if (!this.state.width) {
      return <div ref={(c)=>this._wrapper = c}><Loading /></div>;
    } else {
      let spec = {
        width: this.state.width,
        ...this.props.spec,
      };
      let data = { values: this.props.data };

      return <div ref={(c)=>this._wrapper = c}>
        <VegaLite className={styles.vegaChart} renderer="svg" {...this.props}
                  spec={ spec } data={data} enableHover={true} />
      </div>;
    }
  }

  updateDimensions() {
    // when the window size changes, re-render the graphs with the correct width
    setTimeout(()=> {
      if (this._wrapper) {
        this.setState({width: this._wrapper.offsetWidth});
      }
    }, 0);
  }
}

