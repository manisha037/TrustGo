import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Modal,
  ScrollView,
  Dimensions,
} from 'react-native';
import { useSelector } from 'react-redux';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { Phone, MessageSquare, MapPin, AlertTriangle } from 'lucide-react-native';
import {
  selectOrigin,
  selectDestination,
  selectDriverDetails,
  selectSelectedRideType,
  selectSelectedPaymentMode,
} from '../slices/navSlice';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const MAP_HEIGHT = SCREEN_HEIGHT * 0.4;

const DriverInfo = ({ navigation }) => {
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const driverDetails = useSelector(selectDriverDetails);
  const rideType = useSelector(selectSelectedRideType);
  const selectedPayment = useSelector(selectSelectedPaymentMode);

  const renderMap = () => (
    <View style={styles.mapContainer}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: origin?.location?.lat || 19.0760,
          longitude: origin?.location?.lng || 72.8777,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {origin && (
          <Marker
            coordinate={{
              latitude: origin.location.lat,
              longitude: origin.location.lng,
            }}
          />
        )}
        {destination && (
          <Marker
            coordinate={{
              latitude: destination.location.lat,
              longitude: destination.location.lng,
            }}
          />
        )}
      </MapView>
      <TouchableOpacity 
        style={styles.emergencyButton}
        onPress={() => setShowEmergencyModal(true)}
      >
        <AlertTriangle color="#fff" size={24} />
        <Text style={styles.emergencyText}>Emergency</Text>
      </TouchableOpacity>
    </View>
  );

  const renderEmergencyModal = () => (
    <Modal
      visible={showEmergencyModal}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setShowEmergencyModal(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Do you need help?</Text>
          
          <TouchableOpacity style={styles.emergencyOption}>
            <View style={styles.emergencyOptionTextContainer}>
              <Text style={styles.emergencyOptionTitle}>Call TrustGo Safety Line</Text>
              <Text style={styles.emergencyOptionDescription}>
                Get help from the TrustGo safety team
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.emergencyOption}>
            <View style={styles.emergencyOptionTextContainer}>
              <Text style={styles.emergencyOptionTitle}>Get help from Police</Text>
              <Text style={styles.emergencyOptionDescription}>
                Contact local law enforcement
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.emergencyOption}>
            <View style={styles.emergencyOptionTextContainer}>
              <Text style={styles.emergencyOptionTitle}>Report a crash</Text>
              <Text style={styles.emergencyOptionDescription}>
                Report an accident or collision
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.closeButton}
            onPress={() => setShowEmergencyModal(false)}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  const renderArrivalTime = () => (
    <View style={styles.arrivalContainer}>
      <Text style={styles.arrivalText}>The Driver will arrive in</Text>
      <Text style={styles.timeText}>05:21 Mins</Text>
    </View>
  );

  const renderDriverCard = () => (
    <View style={styles.driverCard}>
      <Text style={styles.vehicleNumber}>DL9SCQ5446</Text>
      <View style={styles.vehicleDetails}>
        <Text style={styles.vehicleName}>Audi V, White</Text>
        <Image 
          source={require('../assets/sedan.png')} 
          style={styles.carImage}
          resizeMode="contain"
        />
      </View>
      <View style={styles.vehicleType}>
        <Text style={styles.vehicleTypeText}>Sedan</Text>
      </View>
    </View>
  );

  const renderDriverProfile = () => (
    <View style={styles.driverProfile}>
      <TouchableOpacity 
        style={styles.driverInfo}
        onPress={() => navigation.navigate('DriverDetails')}
      >
        <Image
          source={require('../assets/doctor.png')} 
          style={styles.driverImage}
        />
        <View style={styles.driverDetails}>
          <Text style={styles.driverName}>Ashoka Bhatia</Text>
          <Text style={styles.driverRating}>⭐ 4.5</Text>
          <TouchableOpacity 
      style={styles.detailssButton}
      onPress={() => navigation.navigate('DriverDetails')}
    >
      <Text style={styles.detailssButtonText}>See Driver Details</Text>
    </TouchableOpacity>
        </View>
      </TouchableOpacity>
      <View style={styles.contactButtons}>
        <TouchableOpacity style={styles.iconButton}>
          <Phone size={24} color="#000000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <MessageSquare size={24} color="#000000" />
          <View style={styles.badge}>
            <Text style={styles.badgeText}>2</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderLocationInfo = () => (
    <View style={styles.locationInfo}>
      <View style={styles.locationContainer}>
        <View style={styles.locationIconContainer}>
          <MapPin size={24} color="#FFD700" />
          <View style={styles.dottedLineContainer}>
            <View style={styles.dottedLine} />
          </View>
        </View>
        <View style={styles.locationText}>
          <Text style={styles.locationLabel}>Pickup location</Text>
          <Text style={styles.locationValue}>Your Current Location</Text>
        </View>
      </View>
      
      <View style={styles.locationContainer}>
        <View style={styles.locationIconContainer}>
          <MapPin size={24} color="#FFD700" />
        </View>
        <View style={styles.locationText}>
          <Text style={styles.locationLabel}>Dropoff Location</Text>
          <Text style={styles.locationValue}>C-125 Jeewan Park Uttam Nagar, New Delhi</Text>
        </View>
      </View>
    </View>
  );

  const renderSeeDriverDetailsButton = () => (
    <TouchableOpacity
      style={styles.detailsButton}
      onPress={() => navigation.navigate('TripFeedback')}
    >
      <Text style={styles.detailsButtonText}>Share Feedback</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {renderMap()}
        {renderArrivalTime()}
        {renderDriverCard()}
        {renderDriverProfile()}
        {renderLocationInfo()}
        {renderSeeDriverDetailsButton()}
      </ScrollView>
      {renderEmergencyModal()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  scrollView: {
    flex: 1,
  },
  mapContainer: {
    height: MAP_HEIGHT,
    width: '100%',
  },
  map: {
    flex: 1,
  },
  emergencyButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'red',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 30,
    elevation: 5,
  },
  emergencyText: {
    color: '#fff',
    marginLeft: 8,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  arrivalContainer: {
    backgroundColor: '#FFD700',
    padding: 15,
    marginHorizontal: 15,
    marginTop: 15,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  arrivalText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
  },
  timeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
  driverCard: {
    backgroundColor: '#1A1A1A',
    padding: 15,
    margin: 15,
    borderRadius: 12,
  },
  vehicleNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  vehicleDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  vehicleName: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  carImage: {
    width: 120,
    height: 60,
  },
  vehicleType: {
    backgroundColor: '#FFD700',
    alignSelf: 'flex-start',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 15,
    marginTop: 10,
  },
  vehicleTypeText: {
    color: '#000000',
    fontWeight: '500',
  },
  driverProfile: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  driverInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  driverImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  driverDetails: {
    gap: 2,
  },
  driverName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  driverRating: {
    fontSize: 14,
    color: '#FFD700',
  },
  driverTag: {
    fontSize: 12,
    color: '#999999',
  },
  contactButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  iconButton: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 25,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  locationInfo: {
    padding: 15,
    marginTop: 10,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  locationIconContainer: {
    width: 24,
    alignItems: 'center',
    marginRight: 12,
  },
  dottedLineContainer: {
    position: 'absolute',
    left: 11,
    top: 30,
    height: 40,
    zIndex: -1,
  },
  dottedLine: {
    width: 2,
    height: '100%',
    backgroundColor: 'transparent',
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: '#FFD700',
  },
  locationText: {
    flex: 1,
    marginLeft: 4,
  },
  locationLabel: {
    fontSize: 14,
    color: '#999999',
    marginBottom: 4,
  },
  locationValue: {
    fontSize: 16,
    color: '#FFFFFF',
    flexWrap: 'wrap',
  },
  detailsButton: {
    backgroundColor: '#FFD700',
    padding: 15,
    margin: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  detailsButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  detailssButton: {
    backgroundColor: '#FFD700',
    padding: 5,
    margin: 5,
    borderRadius: 20,
    alignItems: 'center',
    marginRight: 2,
  },
  detailssButtonText: {
    color: '#000000',
    fontSize: 12,
    fontWeight: 'bold',
  },
  // Modal styles
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  emergencyOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 8,
    marginBottom: 10,
  },
  emergencyOptionTextContainer: {
    flex: 1,
  },
  emergencyOptionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'red',
  },
  emergencyOptionDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  closeButton: {
    marginTop: 10,
    padding: 15,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  closeButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default DriverInfo;