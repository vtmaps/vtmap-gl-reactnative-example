import React from 'react';
import {Text} from 'react-native';
import VTMapGL from '@vtmap/vtmap-react-native-sdk';

import sheet from '../styles/sheet';
import nycJSON from '../assets/nyc_geojson.json';

import BaseExamplePropTypes from './common/BaseExamplePropTypes';
import Page from './common/Page';
import Bubble from './common/Bubble';

const styles = {
  neighborhoods: {
    fillAntialias: true,
    fillColor: 'blue',
    fillOutlineColor: 'black',
    fillOpacity: 0.84,
  },
  selectedNeighborhood: {
    fillAntialias: true,
    fillColor: 'green',
    fillOpacity: 0.84,
  },
};

class QueryAtPoint extends React.Component {
  static propTypes = {
    ...BaseExamplePropTypes,
  };

  constructor(props) {
    super(props);
    this.state = this.emptyState;
    this.onPress = this.onPress.bind(this);
  }

  get emptyState() {
    return {selectedGeoJSON: null, selectedCommunityDistrict: -1};
  }

  async onPress(e) {
    const {screenPointX, screenPointY} = e.properties;

    const featureCollection = await this._map.queryRenderedFeaturesAtPoint(
      [screenPointX, screenPointY],
      null,
      ['nycFill'],
    );

    if (featureCollection.features.length) {
      this.setState({
        selectedGeoJSON: featureCollection,
        selectedCommunityDistrict:
          featureCollection.features[0].properties.communityDistrict,
      });
    } else {
      this.setState(this.emptyState);
    }
  }

  render() {
    return (
      <Page {...this.props}>
        <VTMapGL.MapView
          ref={c => (this._map = c)}
          onPress={this.onPress}
          style={sheet.matchParent}
          styleURL={VTMapGL.StyleURL.TrafficDay}>
          <VTMapGL.Camera
            zoomLevel={9}
            centerCoordinate={[-73.970895, 40.723279]}
          />

          <VTMapGL.ShapeSource id="nyc" shape={nycJSON}>
            <VTMapGL.FillLayer id="nycFill" style={styles.neighborhoods} />
          </VTMapGL.ShapeSource>

          {this.state.selectedGeoJSON ? (
            <VTMapGL.ShapeSource
              id="selectedNYC"
              shape={this.state.selectedGeoJSON}>
              <VTMapGL.FillLayer
                id="selectedNYCFill"
                style={styles.selectedNeighborhood}
              />
            </VTMapGL.ShapeSource>
          ) : null}
        </VTMapGL.MapView>

        <Bubble>
          <Text>Press on a feature to highlight it.</Text>
        </Bubble>
      </Page>
    );
  }
}

export default QueryAtPoint;
