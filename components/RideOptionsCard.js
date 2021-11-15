import { useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/core';

import { Icon } from 'react-native-elements';

import tw from 'twrnc';

import { selectTravelTimeInformation } from '../slices/navSlice';

const data = [
  {
    id: 'UBER-X-123',
    title: 'Uber X',
    multiplier: 1,
    image: 'https://links.papareact.com/3pn',
  },
  {
    id: 'UBER-XL-456',
    title: 'Uber XL',
    multiplier: 1.2,
    image: 'https://links.papareact.com/5w8',
  },
  {
    id: 'UBER-LUX-789',
    title: 'Uber LUX',
    multiplier: 1.75,
    image: 'https://links.papareact.com/7pf',
  },
];

const SURGE_CHARGE_RATE = 1.5;

const RideOptionsCard = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState(null);
  const travelInformation = useSelector(selectTravelTimeInformation);

  return (
    <SafeAreaView style={tw`bg-white flex-grow`}>
      <View>
        <TouchableOpacity
          style={tw`absolute top-3 left-5 padding-3 rounded-full`}
          onPress={() => navigation.navigate('NavigateCard')}
        >
          <Icon name='chevron-left' type='font-awesome' />
        </TouchableOpacity>
        <Text style={tw`text-center py-5 text-xl`}>
          Select a Ride - {travelInformation?.distance?.text}
        </Text>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item: { id, title, multiplier, image }, item }) => (
          <TouchableOpacity
            style={tw`flex-row items-center justify-between px-10 ${
              id === selected.id && 'bg-gray-200 border-2'
            }`}
            onPress={() => setSelected(item)}
          >
            <Image
              style={{ width: 100, height: 100, resizeMode: 'contain' }}
              source={{ uri: image }}
            />
            <View style={tw`-ml-6`}>
              <Text style={tw`text-xl font-semibold`}>{title}</Text>
              <Text>{travelInformation?.duration?.text}</Text>
            </View>
            <Text style={tw`text-xl`}>
              {new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
              }).format(
                (travelInformation?.duration?.value *
                  multiplier *
                  SURGE_CHARGE_RATE) /
                  100
              )}
            </Text>
          </TouchableOpacity>
        )}
      />
      <View style={tw`mt-auto border-t border-gray-200`}>
        <TouchableOpacity
          style={tw`bg-black py-3 m-3 rounded-full ${
            !selected && 'bg-gray-300'
          }`}
          disabled={!selected}
        >
          <Text style={tw`text-center text-white text-xl`}>
            Choose {selected?.title}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RideOptionsCard;

const styles = StyleSheet.create({});
