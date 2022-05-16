import React from 'react';
import VTMapGL from '@vtmap/vtmap-react-native-sdk';
import {View, StyleSheet} from 'react-native';
import {Button} from 'react-native-elements';
import {lineString as makeLineString} from '@turf/helpers';

import RouteSimulator from '../utils/RouteSimulator';
import {directionsClient} from '../VTMapClient';
import sheet from '../styles/sheet';
import {SF_OFFICE_COORDINATE} from '../utils';

import BaseExamplePropTypes from './common/BaseExamplePropTypes';
import Page from './common/Page';
import PulseCircleLayer from './common/PulseCircleLayer';

import {point} from '@turf/helpers';

const SF_ZOO_COORDINATE = [-122.505412, 37.737463];

const styles = StyleSheet.create({
  buttonCnt: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: 16,
    left: 0,
    right: 0,
  },
  button: {
    borderRadius: 3,
    backgroundColor: 'blue',
  },
});

const layerStyles = {
  origin: {
    circleRadius: 5,
    circleColor: 'white',
  },
  destination: {
    circleRadius: 5,
    circleColor: 'white',
  },
  route: {
    lineColor: 'white',
    lineCap: VTMapGL.LineJoin.Round,
    lineWidth: 3,
    lineOpacity: 0.84,
  },
  progress: {
    lineColor: '#314ccd',
    lineWidth: 3,
  },
};

class DriveTheLine extends React.Component {
  static propTypes = {
    ...BaseExamplePropTypes,
  };

  constructor(props) {
    super(props);

    this.state = {
      route: null,
      currentPoint: null,
      routeSimulator: null,
    };

    this.onStart = this.onStart.bind(this);
  }

  onStart() {
    const routeSimulator = new RouteSimulator(this.state.route);
    routeSimulator.addListener(currentPoint => this.setState({currentPoint}));
    routeSimulator.start();
    this.setState({routeSimulator});
  }

  async componentDidMount() {
    const reqOptions = {
      waypoints: [
        {coordinates: SF_OFFICE_COORDINATE},
        {coordinates: SF_ZOO_COORDINATE},
      ],
      profile: 'walking',
      geometries: 'geojson',
    };

    const res = await directionsClient.getDirections(reqOptions).send();

    this.setState({
      route: makeLineString(res.body.routes[0].geometry.coordinates),
    });
  }

  componentWillUnmount() {
    if (this.state.routeSimulator) {
      this.state.routeSimulator.stop();
    }
  }

  renderRoute() {
    if (!this.state.route) {
      return null;
    }

    return (
      <VTMapGL.ShapeSource id="routeSource" shape={this.state.route}>
        <VTMapGL.LineLayer
          id="routeFill"
          style={layerStyles.route}
          belowLayerID="originInnerCircle"
        />
      </VTMapGL.ShapeSource>
    );
  }

  renderCurrentPoint() {
    if (!this.state.currentPoint) {
      return;
    }
    return (
      <PulseCircleLayer
        shape={this.state.currentPoint}
        aboveLayerID="destinationInnerCircle"
      />
    );
  }

  renderProgressLine() {
    if (!this.state.currentPoint) {
      return null;
    }

    const {nearestIndex} = this.state.currentPoint.properties;
    const coords = this.state.route.geometry.coordinates.filter(
      (c, i) => i <= nearestIndex,
    );
    coords.push(this.state.currentPoint.geometry.coordinates);

    if (coords.length < 2) {
      return null;
    }

    const lineString = makeLineString(coords);
    return (
      <VTMapGL.Animated.ShapeSource id="progressSource" shape={lineString}>
        <VTMapGL.Animated.LineLayer
          id="progressFill"
          style={layerStyles.progress}
          aboveLayerID="routeFill"
        />
      </VTMapGL.Animated.ShapeSource>
    );
  }

  renderOrigin() {
    let backgroundColor = 'white';

    if (this.state.currentPoint) {
      backgroundColor = '#314ccd';
    }

    const style = [layerStyles.origin, {circleColor: backgroundColor}];

    return (
      <VTMapGL.ShapeSource
        id="origin"
        shape={point(SF_OFFICE_COORDINATE)}>
        <VTMapGL.Animated.CircleLayer id="originInnerCircle" style={style} />
      </VTMapGL.ShapeSource>
    );
  }

  renderActions() {
    if (this.state.routeSimulator) {
      return null;
    }
    return (
      <View style={styles.buttonCnt}>
        <Button
          raised
          title="Start"
          onPress={this.onStart}
          style={styles.button}
          disabled={!this.state.route}
        />
      </View>
    );
  }

  render() {
    return (
      <Page {...this.props}>
        <VTMapGL.MapView
          ref={c => (this._map = c)}
          style={sheet.matchParent}
          styleURL={VTMapGL.StyleURL.TrafficDay}>
          <VTMapGL.Camera
            zoomLevel={11}
            centerCoordinate={[-122.452652, 37.762963]}
          />

          {this.renderOrigin()}

          {this.renderRoute()}
          {this.renderCurrentPoint()}
          {this.renderProgressLine()}

          <VTMapGL.ShapeSource
            id="destination"
            shape={point(SF_ZOO_COORDINATE)}>
            <VTMapGL.CircleLayer
              id="destinationInnerCircle"
              style={layerStyles.destination}
            />
          </VTMapGL.ShapeSource>
        </VTMapGL.MapView>

        {this.renderActions()}
      </Page>
    );
  }
}

export default DriveTheLine;
