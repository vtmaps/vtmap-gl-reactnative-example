import React from 'react';
import VTMapGL from '@vtmap/vtmap-react-native-sdk';

import sheet from '../styles/sheet';
import radar0 from '../assets/radar.png';
import radar1 from '../assets/radar1.png';
import radar2 from '../assets/radar2.png';

import Page from './common/Page';
import BaseExamplePropTypes from './common/BaseExamplePropTypes';

const frames = [radar0, radar1, radar2];

class ImageOverlay extends React.Component {
  static propTypes = {
    ...BaseExamplePropTypes,
  };

  constructor(props) {
    super(props);

    this.state = {
      radarFrameIndex: 0,
    };

    this._timeout = null;
  }

  componentDidMount() {
    this.heartbeat();
  }

  heartbeat() {
    this._timeout = setTimeout(() => {
      requestAnimationFrame(() => {
        let nextFrame = this.state.radarFrameIndex + 1;

        if (nextFrame > 2) {
          nextFrame = 0;
        }

        this.setState({radarFrameIndex: nextFrame});
        this.heartbeat();
      });
    }, 500);
  }

  componentWillUnmount() {
    if (this._timeout) {
      clearTimeout(this._timeout);
    }
  }

  render() {
    const coordQuad = [
      [-80.425, 46.437], // top left
      [-71.516, 46.437], // top right
      [-71.516, 37.936], // bottom right
      [-80.425, 37.936], // bottom left
    ];

    return (
      <Page {...this.props}>
        <VTMapGL.MapView
          ref={ref => (this.map = ref)}
          style={sheet.matchParent}
          styleURL={VTMapGL.StyleURL.TrafficDay}>
          <VTMapGL.Camera
            zoomLevel={5.2}
            centerCoordinate={[-75.789, 41.874]}
          />

          <VTMapGL.Animated.ImageSource
            key="d"
            id="radarSource"
            coordinates={coordQuad}
            url={frames[this.state.radarFrameIndex]}>
            <VTMapGL.RasterLayer id="radarLayer" />
          </VTMapGL.Animated.ImageSource>
        </VTMapGL.MapView>
      </Page>
    );
  }
}

export default ImageOverlay;
