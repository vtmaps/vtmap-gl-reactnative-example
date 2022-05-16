import React from 'react';
import VTMapGL from '@vtmap/vtmap-react-native-sdk';

import sheet from '../styles/sheet';
import gridPattern from '../assets/grid_pattern.png';
import smileyFaceGeoJSON from '../assets/smiley_face.json';

import BaseExamplePropTypes from './common/BaseExamplePropTypes';
import Page from './common/Page';

const layerStyles = {
  background: {
    backgroundPattern: gridPattern,
  },
  smileyFace: {
    fillAntialias: true,
    fillColor: 'white',
    fillOutlineColor: 'rgba(255, 255, 255, 0.84)',
  },
};

class GeoJSONSource extends React.Component {
  static propTypes = {
    ...BaseExamplePropTypes,
  };

  render() {
    return (
      <Page {...this.props}>
        <VTMapGL.MapView
          ref={ref => (this.map = ref)}
          style={sheet.matchParent}
          styleURL={VTMapGL.StyleURL.TrafficDay}>
          <VTMapGL.Camera
            zoomLevel={2}
            centerCoordinate={[-35.15165038, 40.6235728]}
          />

          <VTMapGL.VectorSource>
            <VTMapGL.BackgroundLayer
              id="background"
              style={layerStyles.background}
            />
          </VTMapGL.VectorSource>

          <VTMapGL.ShapeSource id="smileyFaceSource" shape={smileyFaceGeoJSON}>
            <VTMapGL.FillLayer
              id="smileyFaceFill"
              style={layerStyles.smileyFace}
            />
          </VTMapGL.ShapeSource>
        </VTMapGL.MapView>
      </Page>
    );
  }
}

export default GeoJSONSource;
