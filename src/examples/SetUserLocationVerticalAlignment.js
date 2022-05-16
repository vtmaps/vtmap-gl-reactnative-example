import React from 'react';
import VTMapGL from '@vtmap/vtmap-react-native-sdk';

import sheet from '../styles/sheet';
import {onSortOptions} from '../utils';

import BaseExamplePropTypes from './common/BaseExamplePropTypes';
import TabBarPage from './common/TabBarPage';

class SetUserLocationVerticalAlignment extends React.Component {
  static propTypes = {
    ...BaseExamplePropTypes,
  };

  constructor(props) {
    super(props);

    this._alignmentOptions = Object.keys(VTMapGL.UserLocationVerticalAlignment)
      .map(key => {
        return {
          label: key,
          data: VTMapGL.UserLocationVerticalAlignment[key],
        };
      })
      .sort(onSortOptions);

    this.state = {
      currentAlignmentMode: this._alignmentOptions[0].data,
    };

    this.onAlignmentChange = this.onAlignmentChange.bind(this);
  }

  onAlignmentChange(index, userLocationVerticalAlignment) {
    this.setState({currentAlignmentMode: userLocationVerticalAlignment});
  }

  render() {
    return (
      <TabBarPage
        {...this.props}
        options={this._alignmentOptions}
        onOptionPress={this.onAlignmentChange}>
        <VTMapGL.MapView style={sheet.matchParent}>
          <VTMapGL.Camera followUserLocation />
          <VTMapGL.UserLocation />
        </VTMapGL.MapView>
      </TabBarPage>
    );
  }
}

export default SetUserLocationVerticalAlignment;
