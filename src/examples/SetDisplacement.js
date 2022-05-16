import React from 'react';
import VTMapGL from '@vtmap/vtmap-react-native-sdk';

import sheet from '../styles/sheet';

import BaseExamplePropTypes from './common/BaseExamplePropTypes';
import TabBarPage from './common/TabBarPage';

const DISPLACEMENT = [0, 5, 10];
const OPTIONS = [{label: '0 meter'}, {label: '5 meter'}, {label: '10 meter'}];

class SetDisplacement extends React.Component {
  static propTypes = {
    ...BaseExamplePropTypes,
  };

  state = {minDisplacement: DISPLACEMENT[0]};

  componentDidMount() {
    VTMapGL.locationManager.start();
  }

  componentWillUnmount() {
    VTMapGL.locationManager.stop();
  }

  onDisplacementChange = index => {
    this.setState({minDisplacement: DISPLACEMENT[index]});
  };

  render() {
    return (
      <TabBarPage
        {...this.props}
        options={OPTIONS}
        onOptionPress={this.onDisplacementChange}>
        <VTMapGL.MapView style={sheet.matchParent}>
          <VTMapGL.Camera
            followZoomLevel={16}
            followUserMode="compass"
            followUserLocation
          />

          <VTMapGL.UserLocation minDisplacement={this.state.minDisplacement} />
        </VTMapGL.MapView>
      </TabBarPage>
    );
  }
}

export default SetDisplacement;
