import React from 'react';
import { Text } from 'react-native';
import VTMapGL from '@vtmap/vtmap-react-native-sdk';

import BaseExamplePropTypes from './common/BaseExamplePropTypes';
import Page from './common/Page';
import Bubble from './common/Bubble';
import { SF_OFFICE_COORDINATE } from '../utils';

const defaultCamera = {
  centerCoordinate: SF_OFFICE_COORDINATE,
  zoomLevel: 13,
};

class SourceLayerVisibility extends React.Component {
  static propTypes = {
    ...BaseExamplePropTypes,
  };

  state = {
    show: true,
  };

  onPress = () => {
    this.setState(
      {
        show: !this.state.show,
      },
      () => {
        this._map.setSourceVisibility(this.state.show, 'composite', 'road');
      },
    );
  };

  render() {
    return (
      <Page {...this.props}>
        <VTMapGL.MapView
          ref={c => (this._map = c)}
          onPress={this.onPress}
          style={{ flex: 1 }}>
          <VTMapGL.Camera defaultSettings={defaultCamera} />
        </VTMapGL.MapView>
        <Bubble onPress={this.onPress}>
          <Text>{`${this.state.show ? 'Hide' : 'Show'
            } 'Roads' source layer`}</Text>
        </Bubble>
      </Page>
    );
  }
}

export default SourceLayerVisibility;
