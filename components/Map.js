import React, { useEffect, useRef } from 'react';
import { StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useDispatch, useSelector } from 'react-redux';
import MapViewDirections from 'react-native-maps-directions';

import tw from 'twrnc';

import {
  selectDestination,
  selectOrigin,
  setTravelTimeInformation,
} from '../slices/navSlice';

import { GOOGLE_MAPS_API_KEY } from '@env';

const LATLNG_DELTA = 0.005;

const Map = () => {
  const dispatch = useDispatch();
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const mapRef = useRef(null);

  useEffect(() => {
    if (!origin || !destination) return;
    if (mapRef.current) {
      mapRef.current.fitToSuppliedMarkers(['origin', 'destination'], {
        edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
      });
    }
  }, [origin, destination]);

  useEffect(() => {
    if (!origin || !destination) return;
    const getTravelTime = async () => {
      const URL = `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${origin.description}&destinations=${destination.description}&key=${GOOGLE_MAPS_API_KEY}`;
      fetch(URL)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          dispatch(setTravelTimeInformation(data.rows[0].elements[0]));
        });
    };
    getTravelTime();
  }, [origin, destination, GOOGLE_MAPS_API_KEY]);

  return (
    <MapView
      ref={mapRef}
      style={tw`flex-1`}
      mapType='mutedStandard'
      initialRegion={{
        latitude: origin?.location?.lat || 37.78825,
        longitude: origin?.location?.lng || -122.4324,
        latitudeDelta: LATLNG_DELTA,
        longitudeDelta: LATLNG_DELTA,
      }}
    >
      {origin && destination && (
        <MapViewDirections
          apikey={GOOGLE_MAPS_API_KEY}
          origin={origin.description}
          destination={destination.description}
          strokeWidth={3}
          strokeColor='#1da1f2'
        />
      )}
      {origin?.location && (
        <Marker
          coordinate={{
            latitude: origin?.location?.lat,
            longitude: origin?.location?.lng,
          }}
          title='Origin'
          description={origin?.description}
          identifier='origin'
        />
      )}
      {destination?.location && (
        <Marker
          coordinate={{
            latitude: destination?.location?.lat,
            longitude: destination?.location?.lng,
          }}
          title='Destination'
          description={destination?.description}
          identifier='destination'
        />
      )}
    </MapView>
  );
};

export default Map;

const styles = StyleSheet.create({});
