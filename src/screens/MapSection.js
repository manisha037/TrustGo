import React, { useEffect, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import Animated, {
  useAnimatedValue,
  withTiming,
  withRepeat,
  useAnimatedStyle,
  interpolate,
} from 'react-native-reanimated';

const GOOGLE_MAPS_KEY = 'AIzaSyAW78zsaXGjwTbWx6xc043M1ciz3azVseM'; // Replace with your key

const MapSection = () => {
  const mapRef = useRef(null);
  const carAnimation = useAnimatedValue(0);
  
  // Example coordinates - replace with your actual pickup/drop coordinates
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const origin = {
    latitude: 19.0760,
    longitude: 72.8777, // Mumbai coordinates
  };
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const destination = {
    latitude: 19.0870,
    longitude: 72.8880, // Nearby location
  };

  useEffect(() => {
    // Start car animation
    carAnimation.value = withRepeat(
      withTiming(1, {
        duration: 30000, // 30 seconds for one complete journey
      }),
      -1, // infinite repetition
      true // reverse on repeat
    );

    // Fit map to show both markers
    mapRef.current?.fitToCoordinates(
      [origin, destination],
      {
        edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
        animated: true,
      }
    );
  }, [carAnimation, destination, origin]);

  // Animate car position along the route
  const carStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(
            carAnimation.value,
            [0, 1],
            [origin.longitude, destination.longitude]
          ),
        },
        {
          translateY: interpolate(
            carAnimation.value,
            [0, 1],
            [origin.latitude, destination.latitude]
          ),
        },
      ],
    };
  });

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: origin.latitude,
          longitude: origin.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {/* Origin Marker */}
        <Marker
          coordinate={origin}
          title="Pickup"
          pinColor="green"
        />

        {/* Destination Marker */}
        <Marker
          coordinate={destination}
          title="Drop"
          pinColor="red"
        />

        {/* Route Line */}
        <MapViewDirections
          origin={origin}
          destination={destination}
          apikey={GOOGLE_MAPS_KEY}
          strokeWidth={3}
          strokeColor="#45b3a0"
          optimizeWaypoints={true}
        />

        {/* Moving Car */}
        <Animated.View style={[styles.carContainer, carStyle]}>
          <View style={styles.car}>
            <View style={styles.carIcon} />
          </View>
        </Animated.View>
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 300,
    width: '100%',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  carContainer: {
    position: 'absolute',
    height: 20,
    width: 20,
  },
  car: {
    backgroundColor: '#45b3a0',
    padding: 5,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  carIcon: {
    width: 10,
    height: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
});

export default MapSection;