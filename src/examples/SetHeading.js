import React from 'react';
import VTMapGL from '@vtmap/vtmap-react-native-sdk';

import sheet from '../styles/sheet';

import BaseExamplePropTypes from './common/BaseExamplePropTypes';
import TabBarPage from './common/TabBarPage';

class SetHeading extends React.Component {
  static propTypes = {
    ...BaseExamplePropTypes,
  };

  constructor(props) {
    super(props);

    this.state = {
      heading: 0,
      zoomLevel: 16,
      animationDuration: 150,
    };

    this._bearingOptions = [
      {label: '0', data: 0},
      {label: '90', data: 90},
      {label: '180', data: 180},
    ];

    this.onHeadingChange = this.onHeadingChange.bind(this);
  }

  componentDidMount() {
    VTMapGL.locationManager.start();
  }

  componentWillUnmount() {
    VTMapGL.locationManager.stop();
  }

  onHeadingChange(index, heading) {
    this.setState({heading});
  }

  render() {
    return (
      <TabBarPage
        {...this.props}
        options={this._bearingOptions}
        onOptionPress={this.onHeadingChange}>
        <VTMapGL.MapView
          ref={ref => (this.map = ref)}
          style={sheet.matchParent}>
          <VTMapGL.Camera {...this.state} followUserLocation />
          <VTMapGL.UserLocation />
        </VTMapGL.MapView>
      </TabBarPage>
    );
  }
}

export default SetHeading;
