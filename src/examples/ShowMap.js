import React from 'react';
import {Alert} from 'react-native';
import VTMapGL from '@vtmap/vtmap-react-native-sdk';

import sheet from '../styles/sheet';
import {onSortOptions} from '../utils';

import BaseExamplePropTypes from './common/BaseExamplePropTypes';
import TabBarPage from './common/TabBarPage';

class ShowMap extends React.Component {
  static propTypes = {
    ...BaseExamplePropTypes,
  };

  constructor(props) {
    super(props);

    this._mapOptions = Object.keys(VTMapGL.StyleURL)
      .map(key => {
        return {
          label: key,
          data: VTMapGL.StyleURL[key],
        };
      })
      .sort(onSortOptions);

    this.state = {
      styleURL: this._mapOptions[0].data,
    };

    this.onMapChange = this.onMapChange.bind(this);
    this.onUserMarkerPress = this.onUserMarkerPress.bind(this);
  }

  componentDidMount() {
    VTMapGL.locationManager.start();
  }

  componentWillUnmount() {
    VTMapGL.locationManager.stop();
  }

  onMapChange(index, styleURL) {
    this.setState({styleURL});
  }

  onUserMarkerPress() {
    Alert.alert('You pressed on the user location annotation');
  }

  render() {
    return (
      <TabBarPage
        {...this.props}
        scrollable
        options={this._mapOptions}
        onOptionPress={this.onMapChange}>
        <VTMapGL.MapView
          styleURL={this.state.styleURL}
          style={sheet.matchParent}>
          <VTMapGL.Camera followZoomLevel={12} followUserLocation />

          <VTMapGL.UserLocation onPress={this.onUserMarkerPress} />
        </VTMapGL.MapView>
      </TabBarPage>
    );
  }
}

export default ShowMap;
