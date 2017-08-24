
import React from 'react';
import Loading from "./Loading";
import VegaLite from 'react-vega-lite';


export class FetchDataChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    let data = await this.props.fetchData();
    this.elementWidth = this.loaderWrapper.offsetWidth;
    this.setState({ data: { values: data } });
  }

  render () {
    if (!this.state.data) {
      return <div ref={(c)=>this.loaderWrapper = c}><Loading /></div>;
    } else {
      let spec = {
        width: this.elementWidth,
        ...this.props.spec,
      };

      return <VegaLite renderer="svg" {...this.props}
                       spec={ spec }
                       data={this.state.data}
                       enableHover={true}
                       onNewView={(view)=>console.log(view)}/>
    }
  }
}

