import { useNavigation } from '@react-navigation/core';
import React from 'react';
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useDispatch } from 'react-redux';
import { Icon } from 'react-native-elements';

import tw from 'twrnc';

import { GOOGLE_MAPS_API_KEY } from '@env';

import { setDestination } from '../slices/navSlice';
import NavFavourites from './NavFavourites';

const NavigateCard = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  return (
    <SafeAreaView style={tw`bg-white flex-1`}>
      <Text style={tw`text-center py-5 text-xl`}>Good morning king</Text>
      <View style={tw`border-t border-gray-200 flex-shrink`}>
        <View>
          <GooglePlacesAutocomplete
            placeholder='Where to?'
            debounce={400}
            styles={toInputBoxStyles}
            fetchDetails={true}
            enablePoweredByContainer={false}
            nearbyPlacesAPI='GooglePlacesSearch'
            query={{
              key: GOOGLE_MAPS_API_KEY,
              language: 'en',
            }}
            onPress={(data, details = null) => {
              dispatch(
                setDestination({
                  location: details.geometry.location,
                  description: data.description,
                })
              );
              navigation.navigate('RideOptionsCard');
            }}
          />
          <Button
            onPress={() => {
              dispatch(
                setDestination({
                  location: { lat: 34.052235, lng: -118.243683 },
                  description: 'Test Destination',
                })
              );
              navigation.navigate('RideOptionsCard');
            }}
            title='Testing Set Destination'
          />
        </View>
        <NavFavourites />
      </View>
      <View
        style={tw`flex-row bg-white justify-evenly py-2 mt-auto border-t border-gray-100`}
      >
        <TouchableOpacity
          style={tw`flex flex-row justify-between bg-black w-24 px-4 py-3 rounded-full`}
          onPress={() => navigation.navigate('RideOptionsCard')}
        >
          <Icon name='car' type='font-awesome' color='white' size={16} />
          <Text style={tw`text-white text-center`}>Rides</Text>
        </TouchableOpacity>
        <TouchableOpacity style={tw`flex flex-row w-24 px-4 py-3 rounded-full`}>
          <Icon
            name='fast-food-outline'
            type='ionicon'
            color='black'
            size={16}
          />
          <Text style={tw`text-center`}>Eats</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default NavigateCard;

const toInputBoxStyles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingTop: 20,
    flex: 0,
  },
  textInput: {
    backgroundColor: '#DDDDDF',
    borderRadius: 0,
    fontSize: 18,
  },
  textInputContainer: {
    paddingHorizontal: 20,
    paddingBottom: 0,
  },
});
