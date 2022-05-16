import React from 'react';
import VTMapGL from '@vtmap/vtmap-react-native-sdk';
import bboxPolygon from '@turf/bbox-polygon';

import sheet from '../styles/sheet';

import Page from './common/Page';

const boundsStyle = {
  fillColor: 'rgba(255, 255, 255, 0.1)',
  fillOutlineColor: 'white',
};

const bounds = {
  ne: [-4.265762, 51.054738],
  sw: [-5.760365, 49.947256],
};

const {ne, sw} = bounds;
const polygon = bboxPolygon([sw[0], sw[1], ne[0], ne[1]]);

const RestrictMapBounds = props => (
  <Page {...props}>
    <VTMapGL.MapView
      style={sheet.matchParent}
      styleURL={VTMapGL.StyleURL.Satellite}>
      <VTMapGL.Camera
        maxBounds={bounds}
        zoomLevel={15}
        centerCoordinate={[-4.744276, 50.361239]}
      />
      <VTMapGL.ShapeSource id="bounds" shape={polygon}>
        <VTMapGL.FillLayer id="boundsFill" style={boundsStyle} />
      </VTMapGL.ShapeSource>
    </VTMapGL.MapView>
  </Page>
);

export default RestrictMapBounds;
