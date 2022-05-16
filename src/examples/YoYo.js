import React from 'react';
import VTMapGL from '@vtmap/vtmap-react-native-sdk';

import sheet from '../styles/sheet';
import colors from '../styles/colors';
import { SF_OFFICE_COORDINATE } from '../utils';

import Page from './common/Page';
import BaseExamplePropTypes from './common/BaseExamplePropTypes';

const layerStyles = {
  background: {
    backgroundColor: colors.primary.blue,
  },
  water: {
    fillColor: [
      'interpolate',
      ['exponential', 1],
      ['zoom'],
      1,
      colors.secondary.green,
      8,
      colors.secondary.orange,
      10,
      colors.secondary.red,
      18,
      colors.secondary.yellow,
    ],
  },
};

class YoYo extends React.Component {
  static propTypes = {
    ...BaseExamplePropTypes,
  };

  constructor(props) {
    super(props);

    this.state = {
      zoomLevel: 2,
    };
  }

  componentDidMount() {
    this.cameraLoop();
  }

  cameraLoop() {
    requestAnimationFrame(async () => {
      const nextZoomLevel = this.state.zoomLevel === 12 ? 2 : 12;
      this.setState({ zoomLevel: nextZoomLevel });
      // setTimeout(() => this.cameraLoop(), 2000);
    });
  }

  render() {
    return (
      <Page {...this.props}>
        <VTMapGL.MapView
          ref={ref => (this.map = ref)}
          style={sheet.matchParent}
          styleURL={VTMapGL.StyleURL.TrafficDay}>
          <VTMapGL.Camera
            zoomLevel={this.state.zoomLevel}
            centerCoordinate={SF_OFFICE_COORDINATE}
          />

          <VTMapGL.VectorSource id="VTMap_Trans">
            {/* <VTMapGL.BackgroundLayer
              id="background"
              style={layerStyles.background}
            /> */}
            <VTMapGL.FillLayer id="building" style={layerStyles.water} />
          </VTMapGL.VectorSource>
        </VTMapGL.MapView>
      </Page>
    );
  }
}

export default YoYo;
