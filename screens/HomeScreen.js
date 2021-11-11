import React from 'react';
import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import tw from 'twrnc';

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_API_KEY } from '@env';

import NavOptions from '../components/NavOptions';

const HomeScreen = () => {
  return (
    <SafeAreaView style={tw`bg-white h-full`}>
      <View style={tw`p-5`}>
        <Image
          source={{ uri: 'https://links.papareact.com/gzs' }}
          style={{
            width: 100,
            height: 100,
            resizeMode: 'contain',
          }}
        />
        <GooglePlacesAutocomplete
          styles={{ container: { flex: 0 }, textInput: { fontSize: 18 } }}
          placeholder='Where From?'
          nearbyPlacesAPI='GooglePlacesSearch'
          debounce={400}
          query={{
            key: GOOGLE_MAPS_API_KEY,
            language: 'en',
          }}
          fetchDetails={true}
          returnKeyType={'search'}
          enablePoweredByContainer={false}
          minLength={2}
          onPress={(data, details = null) => {
            console.log(data);
          }}
        />
        <NavOptions />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
