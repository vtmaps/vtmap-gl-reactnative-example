import React from 'react';
import {View, StyleSheet} from 'react-native';
import VTMapGL from '@vtmap/vtmap-react-native-sdk';
import {Slider} from 'react-native-elements';

import sheet from '../styles/sheet';
import colors from '../styles/colors';
import {SF_OFFICE_COORDINATE} from '../utils';

import Page from './common/Page';
import BaseExamplePropTypes from './common/BaseExamplePropTypes';

const styles = StyleSheet.create({
  slider: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
    maxHeight: 60,
    paddingHorizontal: 24,
  },
});

class WatercolorRasterTiles extends React.Component {
  static propTypes = {
    ...BaseExamplePropTypes,
  };

  constructor(props) {
    super(props);

    this.state = {
      opacity: 1,
    };

    this.onOpacityChange = this.onOpacityChange.bind(this);
  }

  onOpacityChange(value) {
    this.setState({opacity: value});
  }

  render() {
    const rasterSourceProps = {
      id: 'stamenWatercolorSource',
      tileUrlTemplates: [
        'https://stamen-tiles.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg',
      ],
      tileSize: 256,
    };

    return (
      <Page {...this.props}>
        <VTMapGL.MapView style={sheet.matchParent}>
          <VTMapGL.Camera
            zoomLevel={16}
            centerCoordinate={SF_OFFICE_COORDINATE}
          />

          <VTMapGL.RasterSource {...rasterSourceProps}>
            <VTMapGL.RasterLayer
              id="stamenWatercolorLayer"
              sourceID="stamenWatercolorSource"
              style={{rasterOpacity: this.state.opacity}}
            />
          </VTMapGL.RasterSource>
        </VTMapGL.MapView>

        <View style={styles.slider}>
          <Slider
            value={this.state.opacity}
            onValueChange={this.onOpacityChange}
            thumbTintColor={colors.primary.blue}
            thumbTouchSize={{width: 44, height: 44}}
            maximumTrackTintColor={colors.secondary.purpleLight}
            minimumTrackTintColor={colors.secondary.purpleDark}
          />
        </View>
      </Page>
    );
  }
}

export default WatercolorRasterTiles;
