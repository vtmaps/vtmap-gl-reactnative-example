import React from 'react';
import VTMapGL from '@vtmap/vtmap-react-native-sdk';

import sheet from '../styles/sheet';

import BaseExamplePropTypes from './common/BaseExamplePropTypes';
import Page from './common/Page';

const styles = {
  circles: {
    circleRadius: [
      'interpolate',
      ['exponential', 1.75],
      ['zoom'],
      12,
      2,
      22,
      180,
    ],

    circleColor: [
      'match',
      ['get', 'ethnicity'],
      'White',
      '#fbb03b',
      'Black',
      '#223b53',
      'Hispanic',
      '#e55e5e',
      'Asian',
      '#3bb2d0',
      /* other */ '#ccc',
    ],
  },
};

class DataDrivenCircleColors extends React.PureComponent {
  static propTypes = {
    ...BaseExamplePropTypes,
  };

  render() {
    return (
      <Page {...this.props}>
        <VTMapGL.MapView
          styleURL={VTMapGL.StyleURL.TrafficDay}
          style={sheet.matchParent}>
          <VTMapGL.Camera
            zoomLevel={10}
            pitch={45}
            centerCoordinate={[-122.400021, 37.789085]}
          />

          <VTMapGL.VectorSource
            id="population"
            url={'mapbox://examples.8fgz4egr'}>
            <VTMapGL.CircleLayer
              id="sf2010CircleFill"
              sourceLayerID="sf2010"
              style={styles.circles}
            />
          </VTMapGL.VectorSource>
        </VTMapGL.MapView>
      </Page>
    );
  }
}

export default DataDrivenCircleColors;
