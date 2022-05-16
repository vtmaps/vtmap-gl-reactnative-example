import React from 'react';
import {Text} from 'react-native';
import VTMapGL from '@vtmap/vtmap-react-native-sdk';

import sheet from '../styles/sheet';
import {onSortOptions} from '../utils';

import BaseExamplePropTypes from './common/BaseExamplePropTypes';
import TabBarPage from './common/TabBarPage';
import Bubble from './common/Bubble';

class SetUserTrackingModes extends React.Component {
  static propTypes = {
    ...BaseExamplePropTypes,
  };

  constructor(props) {
    super(props);

    // eslint-disable-next-line fp/no-mutating-methods
    this._trackingOptions = Object.keys(VTMapGL.UserTrackingModes)
      .map(key => {
        return {
          label: key,
          data: VTMapGL.UserTrackingModes[key],
        };
      })
      .concat([
        {
          label: 'None',
          data: 'none',
        },
      ])
      .sort(onSortOptions);

    this.state = {
      showUserLocation: true,
      userSelectedUserTrackingMode: this._trackingOptions[3].data,
      currentTrackingMode: this._trackingOptions[3].data,
      showsUserHeadingIndicator: false,
    };

    this.onTrackingChange = this.onTrackingChange.bind(this);
    this.onUserTrackingModeChange = this.onUserTrackingModeChange.bind(this);
    this.onToggleUserLocation = this.onToggleUserLocation.bind(this);
    this.onToggleHeadingIndicator = this.onToggleHeadingIndicator.bind(this);
  }

  onTrackingChange(index, userTrackingMode) {
    this.setState({
      userSelectedUserTrackingMode: userTrackingMode,
      currentTrackingMode: userTrackingMode,
    });
  }

  onUserTrackingModeChange(e) {
    const {followUserMode} = e.nativeEvent.payload;
    this.setState({currentTrackingMode: followUserMode || 'none'});
  }

  onToggleUserLocation() {
    this.setState({showUserLocation: !this.state.showUserLocation});
  }

  onToggleHeadingIndicator() {
    this.setState({
      showsUserHeadingIndicator: !this.state.showsUserHeadingIndicator,
    });
  }

  get userTrackingModeText() {
    switch (this.state.currentTrackingMode) {
      case VTMapGL.UserTrackingModes.Follow:
        return 'Follow';
      case VTMapGL.UserTrackingModes.FollowWithCourse:
        return 'FollowWithCourse';
      case VTMapGL.UserTrackingModes.FollowWithHeading:
        return 'FollowWithHeading';
      default:
        return 'None';
    }
  }

  render() {
    return (
      <TabBarPage
        {...this.props}
        scrollable
        initialIndex={3}
        options={this._trackingOptions}
        onOptionPress={this.onTrackingChange}>
        <VTMapGL.MapView style={sheet.matchParent}>
          <VTMapGL.UserLocation
            visible={this.state.showUserLocation}
            showsUserHeadingIndicator={this.state.showsUserHeadingIndicator}
          />

          <VTMapGL.Camera
            defaultSettings={{
              centerCoordinate: [-111.8678, 40.2866],
              zoomLevel: 0,
            }}
            followUserLocation={
              this.state.userSelectedUserTrackingMode !== 'none'
            }
            followUserMode={
              this.state.userSelectedUserTrackingMode !== 'none'
                ? this.state.userSelectedUserTrackingMode
                : 'normal'
            }
            onUserTrackingModeChange={this.onUserTrackingModeChange}
          />
        </VTMapGL.MapView>

        <Bubble style={{bottom: 80}}>
          <Text>User Tracking Mode: {this.userTrackingModeText}</Text>
        </Bubble>

        <Bubble onPress={this.onToggleUserLocation} style={{bottom: 150}}>
          <Text>
            Toggle User Location:{' '}
            {this.state.showUserLocation ? 'true' : 'false'}
          </Text>
        </Bubble>

        <Bubble onPress={this.onToggleHeadingIndicator} style={{bottom: 220}}>
          <Text>
            Toggle user heading indicator:{' '}
            {this.state.showsUserHeadingIndicator ? 'true' : 'false'}
          </Text>
        </Bubble>
      </TabBarPage>
    );
  }
}

export default SetUserTrackingModes;
