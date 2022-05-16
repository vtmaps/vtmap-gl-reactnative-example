import React from 'react';
import { Text } from 'react-native';
import VTMapGL from '@vtmap/vtmap-react-native-sdk';

import BaseExamplePropTypes from './common/BaseExamplePropTypes';
import Page from './common/Page';
import Bubble from './common/Bubble';
import { SF_OFFICE_COORDINATE } from '../utils';

const defaultCamera = {
  centerCoordinate: SF_OFFICE_COORDINATE,
  zoomLevel: 17.4,
};

class ChangeLayerColor extends React.Component {
  static propTypes = {
    ...BaseExamplePropTypes,
  };

  state = {
    fillColor: '',
  };

  onPress = () => {
    const fillColor = `#${Math.random()
      .toString(16)
      .substr(-6)}`;
    this.setState({ fillColor });
  };

  render() {
    const { fillColor } = this.state;
    return (
      <Page {...this.props}>
        <VTMapGL.MapView
          ref={c => (this._map = c)}
          onPress={this.onPress}
          style={{ flex: 1 }}>
          <VTMapGL.Camera defaultSettings={defaultCamera} />
          {!!fillColor && <VTMapGL.FillLayer id="building" style={{ fillColor }} />}
        </VTMapGL.MapView>
        <Bubble onPress={this.onPress}>
          <Text>Paint Water</Text>
        </Bubble>
      </Page>
    );
  }
}

export default ChangeLayerColor;
