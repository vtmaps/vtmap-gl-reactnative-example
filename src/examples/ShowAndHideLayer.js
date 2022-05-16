import React from 'react';
import { Text } from 'react-native';
import VTMapGL from '@vtmap/vtmap-react-native-sdk';

import BaseExamplePropTypes from './common/BaseExamplePropTypes';
import Page from './common/Page';
import Bubble from './common/Bubble';
import { SF_OFFICE_COORDINATE } from '../utils';

const defaultCamera = {
  centerCoordinate: SF_OFFICE_COORDINATE,
  zoomLevel: 16,
};

class ShowAndHideLayer extends React.Component {
  static propTypes = {
    ...BaseExamplePropTypes,
  };

  state = {
    show: true,
  };

  onPress = () => {
    this.setState({
      show: !this.state.show,
    });
  };

  render() {
    const visibility = this.state.show ? 'visible' : 'none';
    return (
      <Page {...this.props}>
        <VTMapGL.MapView
          ref={c => (this._map = c)}
          onPress={this.onPress}
          style={{ flex: 1 }}>
          <VTMapGL.Camera defaultSettings={defaultCamera} />
          <VTMapGL.FillLayer id="building" style={{ visibility }} />
          {/* <VTMapGL.LineLayer id="building-outline" style={{ visibility }} /> */}
        </VTMapGL.MapView>
        <Bubble onPress={this.onPress}>
          <Text>{this.state.show ? 'Hide Buildings' : 'Show Buildings'}</Text>
        </Bubble>
      </Page>
    );
  }
}

export default ShowAndHideLayer;
