import React from 'react';
import VTMapGL from '@vtmap/vtmap-react-native-sdk';

import sheet from '../styles/sheet';
import {SF_OFFICE_COORDINATE} from '../utils';

import BaseExamplePropTypes from './common/BaseExamplePropTypes';
import Page from './common/Page';

const layerStyles = {
  singlePoint: {
    circleColor: 'green',
    circleOpacity: 0.84,
    circleStrokeWidth: 2,
    circleStrokeColor: 'white',
    circleRadius: 5,
    circlePitchAlignment: 'map',
  },

  clusteredPoints: {
    circlePitchAlignment: 'map',

    circleColor: [
      'step',
      ['get', 'point_count'],
      '#51bbd6',
      100,
      '#f1f075',
      750,
      '#f28cb1',
    ],

    circleRadius: ['step', ['get', 'point_count'], 20, 100, 30, 750, 40],

    circleOpacity: 0.84,
    circleStrokeWidth: 2,
    circleStrokeColor: 'white',
  },

  clusterCount: {
    textField: '{point_count}',
    textSize: 12,
    textPitchAlignment: 'map',
  },
};

class EarthQuakes extends React.Component {
  static propTypes = {
    ...BaseExamplePropTypes,
  };

  render() {
    return (
      <Page {...this.props}>
        <VTMapGL.MapView
          style={sheet.matchParent}
          styleURL={VTMapGL.StyleURL.TrafficDay}>
          <VTMapGL.Camera
            zoomLevel={6}
            pitch={45}
            centerCoordinate={SF_OFFICE_COORDINATE}
          />

          <VTMapGL.ShapeSource
            id="earthquakes"
            cluster
            clusterRadius={50}
            clusterMaxZoom={14}
            url="https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson">
            <VTMapGL.SymbolLayer
              id="pointCount"
              style={layerStyles.clusterCount}
            />

            <VTMapGL.CircleLayer
              id="clusteredPoints"
              belowLayerID="pointCount"
              filter={['has', 'point_count']}
              style={layerStyles.clusteredPoints}
            />

            <VTMapGL.CircleLayer
              id="singlePoint"
              filter={['!', ['has', 'point_count']]}
              style={layerStyles.singlePoint}
            />
          </VTMapGL.ShapeSource>
        </VTMapGL.MapView>
      </Page>
    );
  }
}

export default EarthQuakes;
