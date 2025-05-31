import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  selectOrigin,
  selectDestination,
  selectSelectedRideType,
  setDriverDetails,
} from '../slices/navSlice';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {MapPin, Star} from 'lucide-react-native';

const BookingDetail = ({navigation}) => {
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const dispatch = useDispatch();

  const driverDetails = {
    name: 'Cameron Williamson',
    rating: 5.0,
    ratingCount: 235,
    vehicleName: 'America Airlines',
    vehicleNumber: 'AK6117',
    hourlyRate: 10,
    profileImage: require('../assets/doctor.png'),
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerTitle}>Booked Details</Text>

      {/* Location Card */}
      <View style={styles.locationCard}>
        <View style={styles.locationPoint}>
          <View style={styles.greenDot} />
          <Text style={styles.locationText}>
            {origin?.description || '3891 Ranchview, California 62639'}
          </Text>
        </View>

        <View style={styles.dottedLine} />

        <View style={styles.locationPoint}>
          <View style={styles.redDot} />
          <Text style={styles.locationText}>
            {destination?.description ||
              '1901 Thornridge Cir. Shiloh, California'}
          </Text>
        </View>

        {/* Vehicle Details */}
        <View style={styles.vehicleDetails}>
          <Image
            source={require('../assets/sedan.png')}
            style={styles.vehicleImage}
          />
          <View style={styles.vehicleInfo}>
            <Text style={styles.vehicleName}>{driverDetails.vehicleName}</Text>
            <Text style={styles.vehicleNumber}>
              {driverDetails.vehicleNumber}
            </Text>
          </View>
          <Text style={styles.priceText}>
            ${driverDetails.hourlyRate}{' '}
            <Text style={styles.perHour}>/per hour</Text>
          </Text>
        </View>
      </View>

      {/* Track on Map Section */}
      <Text style={styles.sectionTitle}>Track on map</Text>
      <View style={styles.mapContainer}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
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

      {/* Driver Details */}
      <Text style={styles.sectionTitle}>Driver Details</Text>
      <View style={styles.driverCard}>
        <Image source={driverDetails.profileImage} style={styles.driverImage} />
        <View style={styles.driverInfo}>
          <Text style={styles.driverName}>{driverDetails.name}</Text>
          <View style={styles.ratingContainer}>
            <Star size={16} color="#FFD700" fill="#FFD700" />
            <Text style={styles.rating}>{driverDetails.rating}</Text>
            <Text style={styles.ratingCount}>
              ({driverDetails.ratingCount} ratings)
            </Text>
          </View>
        </View>
        <TouchableOpacity style={styles.contactButton}>
          <Text style={styles.contactButtonText}>Contact</Text>
        </TouchableOpacity>
      </View>

      {/* Payment Button */}
      <TouchableOpacity
        style={styles.paymentButton}
        onPress={() => {
          dispatch(setDriverDetails(driverDetails));
          navigation.navigate('DriverInfo');
        }}>
        <Text style={styles.paymentButtonText}>Start Ride</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
  },
  locationCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  locationPoint: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  greenDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#45b3a0',
    marginRight: 12,
  },
  redDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FF4444',
    marginRight: 12,
  },
  dottedLine: {
    width: 2,
    height: 30,
    backgroundColor: '#45b3a0',
    marginLeft: 4,
    borderStyle: 'dotted',
  },
  locationText: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  vehicleDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  vehicleImage: {
    width: 64,
    height: 35,
  },
  vehicleInfo: {
    flex: 1,
    marginLeft: 12,
  },
  vehicleName: {
    fontSize: 16,
    fontWeight: '500',
  },
  vehicleNumber: {
    fontSize: 14,
    color: '#666',
  },
  priceText: {
    fontSize: 16,
    fontWeight: '600',
  },
  perHour: {
    fontSize: 12,
    color: '#666',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 16,
    color: 'white',
  },
  mapContainer: {
    height: 200,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
  },
  map: {
    flex: 1,
  },
  driverCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 30,
    marginBottom: 10,
  },
  driverImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  driverInfo: {
    flex: 1,
    marginLeft: 12,
  },
  driverName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 4,
  },
  ratingCount: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  contactButton: {
    borderWidth: 1,
    borderColor: '#45b3a0',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  contactButtonText: {
    color: '#45b3a0',
    fontSize: 14,
    fontWeight: '500',
  },
  paymentButton: {
    backgroundColor: '#FFD700',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 'auto',
  },
  paymentButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default BookingDetail;
