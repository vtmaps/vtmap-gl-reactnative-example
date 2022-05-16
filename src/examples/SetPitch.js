import React from 'react';
import VTMapGL from '@vtmap/vtmap-react-native-sdk';

import sheet from '../styles/sheet';

import BaseExamplePropTypes from './common/BaseExamplePropTypes';
import TabBarPage from './common/TabBarPage';

class SetPitch extends React.Component {
  static propTypes = {
    ...BaseExamplePropTypes,
  };

  constructor(props) {
    super(props);

    this.state = {
      followPitch: 15,
      zoomLevel: 16,
      duration: 300,
    };

    this._pitchOptions = [
      {label: '15', data: 15},
      {label: '45', data: 45},
      {label: '60', data: 60},
    ];

    this.onUpdatePitch = this.onUpdatePitch.bind(this);
  }

  componentDidMount() {
    VTMapGL.locationManager.start();
  }

  componentWillUnmount() {
    VTMapGL.locationManager.stop();
  }

  onUpdatePitch(index, pitch) {
    this.setState({followPitch: pitch});
  }

  render() {
    return (
      <TabBarPage
        {...this.props}
        options={this._pitchOptions}
        onOptionPress={this.onUpdatePitch}>
        <VTMapGL.MapView style={sheet.matchParent}>
          <VTMapGL.Camera {...this.state} followUserLocation />
          <VTMapGL.UserLocation />
        </VTMapGL.MapView>
      </TabBarPage>
    );
  }
}

export default SetPitch;
