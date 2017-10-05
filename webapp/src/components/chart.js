
import React from 'react';
import Loading from "./Loading";
import VegaLite from '../vega';

import styles from './chart.scss';

export class FetchDataChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this._updateDimensions = () => this.updateDimensions();
  }

  componentWillUnmount () {
    window.removeEventListener("resize", this._updateDimensions);
  }

  async componentDidMount() {
    window.addEventListener("resize", this._updateDimensions);

    try {
      let data = await this.props.fetchData();
      this.setState({ data: { values: data } });
    } catch (e) {
      this.setState({error: true})
    }
  }

  render () {
    if (this.state.error) {
      return <div className="no-data">No data available.</div>;
    } else if (!this.state.data) {
      return <div ref={(c)=>this.loaderWrapper = c}><Loading /></div>;
    } else {
      let spec = {
        width: this.state.width || this.loaderWrapper.offsetWidth,
        ...this.props.spec,
      };

      return <div ref={(c)=>this.loaderWrapper = c}>
          <VegaLite
                         className={styles.vegaChart} renderer="svg" {...this.props}
                         spec={ spec }
                         data={this.state.data}
                         enableHover={true} />
        </div>;
    }
  }

  updateDimensions() {
    // when the window is resized, re-render the graphs with the correct width
    setTimeout(()=> {
      if (this.loaderWrapper) {
        this.setState({width: this.loaderWrapper.offsetWidth});
      }
    }, 0);
  }
}

