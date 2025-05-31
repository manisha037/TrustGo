import React, {useRef, useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {useDispatch, useSelector} from 'react-redux';
import {
  selectDestination,
  selectOrigin,
  setOrigin,
  setDestination,
  setSelectedRideType,
  setSelectedPaymentMode,
} from '../slices/navSlice';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {MapPin, ChevronRight} from 'lucide-react-native';
import {useNavigation, DrawerActions} from '@react-navigation/native';

const SearchLocationScreen = () => {
  const dispatch = useDispatch();
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const mapRef = useRef(null);
  const [selectedPayment, setSelectedPayment] = useState('cash');
  const navigation = useNavigation();

  const suggestedRides = [
    {
      id: 1,
      type: 'Sedan',
      price: 25,
      image: require('../assets/sedan.png'),
      verified: true,
    },
    {
      id: 2,
      type: 'Hatchback',
      price: 20,
      image: require('../assets/pola.png'),
      verified: true,
    },
    {
      id: 3,
      type: 'SUV',
      price: 30,
      image: require('../assets/sedan.png'),
      verified: true,
    },
    {
      id: 4,
      type: 'SUV',
      price: 30,
      image: require('../assets/sedan.png'),
      verified: true,
    },
  ];

  useEffect(() => {
    if (!origin || !destination) return;

    mapRef.current?.fitToSuppliedMarkers(['origin', 'destination'], {
      edgePadding: {top: 50, right: 50, bottom: 50, left: 50},
    });
  }, [origin, destination]);

  // Debug function to verify drawer is available
  const checkAndOpenDrawer = () => {
    try {
      navigation.dispatch(DrawerActions.openDrawer());
    } catch (error) {
      console.error('Failed to open drawer:', error);
      alert('Drawer navigation not available. Make sure you accessed this screen through the drawer navigator.');
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      {/* Map Container */}
      <View style={{position: 'absolute', inset: 0}}>
        <MapView
          ref={mapRef}
          provider={PROVIDER_GOOGLE}
          style={{width: '100%', height: '100%'}}
          initialRegion={{
            latitude: origin?.location?.lat || 37.78825,
            longitude: origin?.location?.lng || -122.4324,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}>
          {origin?.location && (
            <Marker
              coordinate={{
                latitude: origin.location.lat,
                longitude: origin.location.lng,
              }}
              identifier="origin"
            />
          )}
          {destination?.location && (
            <Marker
              coordinate={{
                latitude: destination.location.lat,
                longitude: destination.location.lng,
              }}
              identifier="destination"
            />
          )}
        </MapView>
      </View>

      {/* Navigation Button */}
      <TouchableOpacity
        style={{
          position: 'absolute',
          top: 10,
          left: 10,
          padding: 10,
          borderRadius: 50,
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
        }}
        onPress={checkAndOpenDrawer}>
        <Image source={require('../assets/button.png')} />
      </TouchableOpacity>

      {/* Bottom Sheet */}
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: 'black',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          padding: 20,
        }}>
        <Text
          style={{
            color: 'white',
            fontSize: 20,
            fontWeight: 'bold',
            marginBottom: 10,
          }}>
          Hi Himanshu Bhatia
        </Text>

        {/* Google Places Autocomplete */}
        <View>
          <GooglePlacesAutocomplete
            placeholder="Enter Pickup Location"
            onPress={(data, details = null) => {
              dispatch(
                setOrigin({
                  location: details.geometry.location,
                  description: data.description,
                }),
              );
            }}
            fetchDetails={true}
            query={{
              key: 'AIzaSyAW78zsaXGjwTbWx6xc043M1ciz3azVseM',
              language: 'en',
            }}
            styles={{
              container: {marginBottom: 10},
              textInput: {
                backgroundColor: 'white',
                height: 50,
                paddingHorizontal: 10,
                borderRadius: 10,
              },
            }}
            renderLeftButton={() => (
              <MapPin
                size={20}
                color="black"
                style={{position: 'absolute', top: 15, left: 10}}
              />
            )}
          />

          <GooglePlacesAutocomplete
            placeholder="Enter Drop Location"
            onPress={(data, details = null) => {
              dispatch(
                setDestination({
                  location: details.geometry.location,
                  description: data.description,
                }),
              );
            }}
            fetchDetails={true}
            query={{
              key: 'AIzaSyAW78zsaXGjwTbWx6xc043M1ciz3azVseM',
              language: 'en',
            }}
            styles={{
              container: {marginBottom: 10},
              textInput: {
                backgroundColor: 'white',
                height: 50,
                paddingHorizontal: 10,
                borderRadius: 10,
              },
            }}
            renderLeftButton={() => (
              <MapPin
                size={20}
                color="red"
                style={{position: 'absolute', top: 15, left: 10}}
              />
            )}
          />
        </View>

        {origin && destination && (
          <>
            {/* Ride Options */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{paddingVertical: 10}}>
              {suggestedRides.map(ride => (
                <TouchableOpacity
                  key={ride.id}
                  style={{
                    backgroundColor: 'white',
                    borderRadius: 10,
                    padding: 10,
                    marginRight: 10,
                    width: 140,
                  }}
                  onPress={() => dispatch(setSelectedRideType(ride.type))}>
                  <Image
                    source={ride.image}
                    style={{
                      width: '100%',
                      height: 80,
                      borderRadius: 10,
                      marginBottom: 10,
                    }}
                    resizeMode="contain"
                  />
                  <Text style={{fontWeight: 'bold'}}>{ride.type}</Text>
                  <Text style={{color: 'gray'}}>${ride.price}/hr</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Payment Options */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: 'yellow',
                borderRadius: 10,
                overflow: 'hidden',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 20,
                  flex: 1,
                }}>
                <TouchableOpacity
                  style={{
                    flex: 1,
                    padding: 10,
                    backgroundColor:
                      selectedPayment === 'cash'
                        ? 'hsla(51, 100%, 50%, 1)'
                        : 'hsla(39, 88%, 73%, 1)',
                  }}
                  onPress={() => {
                    setSelectedPayment('cash');
                    dispatch(setSelectedPaymentMode('cash'));
                  }}>
                  <View style={{flexDirection: 'row', gap: 80}}>
                    <Text style={{textAlign: 'center', fontWeight: 'bold'}}>
                      💵 Cash
                    </Text>
                    <TouchableOpacity
                      onPress={() => navigation.navigate('Payment')}>
                      <ChevronRight size={24} color="black" />
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={{
                  flex: 1,
                  padding: 10,
                  backgroundColor:
                    selectedPayment === 'offers'
                      ? 'hsla(51, 100%, 50%, 1)'
                      : 'hsla(39, 88%, 73%, 1)',
                }}
                onPress={() => {
                  setSelectedPayment('offers');
                  dispatch(setSelectedPaymentMode('offers'));
                }}>
                <Text style={{textAlign: 'center', fontWeight: 'bold'}}>
                  % Offers
                </Text>
              </TouchableOpacity>
            </View>

            {/* Book Ride Button */}
            <TouchableOpacity
              style={{
                backgroundColor: 'gold',
                padding: 15,
                borderRadius: 10,
                marginTop: 10,
              }}
              onPress={() => {
                if (!origin || !destination) {
                  alert('Please select both pickup and drop location.');
                  return;
                }
                navigation.navigate('DriverInfo');
              }}>
              <Text
                style={{textAlign: 'center', fontWeight: 'bold', fontSize: 16}}>
                Book a ride
              </Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

export default SearchLocationScreen;