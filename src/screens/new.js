import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Modal,
  Animated,
  ScrollView,
  Dimensions,
} from 'react-native';
import { useSelector } from 'react-redux';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { Menu, MapPin, CheckCircle, Navigation, Phone, MessageSquare, CreditCard, AlertTriangle } from 'lucide-react-native';
import {
  selectOrigin,
  selectDestination,
  selectTravelTimeInformation,
  selectSelectedRideType,
  selectDriverDetails,
} from '../slices/navSlice';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const MAP_HEIGHT = SCREEN_HEIGHT * 0.6;
const TRIP_DURATION = 1800; // 30 minutes in seconds

const DriverInfo = ({ navigation }) => {
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);
  const [mapMinimized, setMapMinimized] = useState(false);
  const [scrollOffset] = useState(new Animated.Value(0));
  const [timeRemaining, setTimeRemaining] = useState(TRIP_DURATION);

  // Redux selectors
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const travelTimeInformation = useSelector(selectTravelTimeInformation);
  const selectedRideType = useSelector(selectSelectedRideType);
  const driverDetails = useSelector(selectDriverDetails);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const progressPercentage = (timeRemaining / TRIP_DURATION) * 100;

  const renderProgressBar = () => (
    <View style={styles.progressBarContainer}>
      <Animated.View 
        style={[
          styles.progressBar,
          { width: `${progressPercentage}%` }
        ]} 
      />
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

  const renderMap = () => (
    <Animated.View style={[styles.mapContainer, mapMinimized && styles.minimizedMap]}>
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
        style={styles.mapEmergencyButton}
        onPress={() => setShowEmergencyModal(true)}
      >
        <AlertTriangle color="#fff" size={24} />
      </TouchableOpacity>
      <View style={styles.eta}>
        <Text style={styles.etaText}>Reaching destination in</Text>
        <Text style={styles.etaTime}>
          {travelTimeInformation?.duration?.text || `${Math.ceil(timeRemaining / 60)} min`}
        </Text>
        {renderProgressBar()}
      </View>
    </Animated.View>
  );

  const renderDriverInfo = () => (
    <View style={styles.driverContainer}>
      <View style={styles.driverHeader}>
        <Image source={{ uri: driverDetails?.image }} style={styles.driverImage} />
        <View style={styles.driverDetails}>
          <Text style={styles.driverName}>{driverDetails?.name}</Text>
          <Text style={styles.vehicleInfo}>{driverDetails?.vehicle}</Text>
          <Text style={styles.vehicleNumber}>{driverDetails?.vehicleNumber}</Text>
          <View style={styles.rating}>
            <Text>★ {driverDetails?.rating}</Text>
          </View>
        </View>
        <View style={styles.contactButtons}>
          <TouchableOpacity style={styles.iconButton}>
            <Phone size={20} color="#45b3a0" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <MessageSquare size={20} color="#45b3a0" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderTripRoute = () => (
    <View style={styles.tripRoute}>
      <View style={styles.locationContainer}>
        <MapPin size={24} color="#45b3a0" />
        <Text style={styles.locationText}>{origin?.description}</Text>
      </View>
      <View style={styles.routeLine} />
      <View style={styles.locationContainer}>
        <Navigation size={24} color="#45b3a0" />
        <Text style={styles.locationText}>{destination?.description}</Text>
      </View>
      <TouchableOpacity style={styles.changeDestination}>
        <Text style={styles.changeDestinationText}>Change Destination</Text>
      </TouchableOpacity>
    </View>
  );

  const renderPaymentSection = () => (
    <View style={styles.paymentSection}>
      <Text style={styles.paymentTitle}>Payment</Text>
      <View style={styles.paymentDetails}>
        <View style={styles.paymentMethodContainer}>
          <CreditCard size={20} color="#000" />
          <Text style={styles.paymentMethod}>Cash</Text>
        </View>
        <Text style={styles.paymentAmount}>
          ₹ {travelTimeInformation?.price || "---"}
        </Text>
      </View>
      <TouchableOpacity style={styles.switchPayment}>
        <Text style={styles.switchPaymentText}>Switch</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollOffset } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        {renderMap()}
        {renderDriverInfo()}
        {renderTripRoute()}
        
        <View style={styles.bottomContainer}>
          {renderPaymentSection()}
          
          <View style={styles.bottomButtons}>
            <TouchableOpacity 
              style={styles.endTripButton}
              onPress={() => navigation.navigate('TripFeedback')}
            >
              <Text style={styles.endTripButtonText}>END MY TRIP</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      {renderEmergencyModal()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  mapContainer: {
    height: MAP_HEIGHT,
    overflow: 'hidden',
  },
  minimizedMap: {
    height: SCREEN_HEIGHT * 0.3,
  },
  map: {
    flex: 1,
  },
  emergencyOption: {
    flexDirection: 'row',
    
    alignItems: 'center',
    padding: 15,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 8,
    marginBottom: 10,
    gap: 15,
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
  mapEmergencyButton: {
    position: 'absolute',
    top: 400,
    right: 20,
    backgroundColor: '#FF4444',
    padding: 12,
    borderRadius: 30,
    elevation: 5,
  },
  progressBarContainer: {
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 2,
    marginTop: 8,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#fff',
  },
  eta: {
    position: 'absolute',
    top: 40,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(0,0,0,0.8)',
    padding: 15,
    borderRadius: 8,
  },
  etaText: {
    color: '#fff',
    fontSize: 16,
  },
  etaTime: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  driverContainer: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  driverHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  driverImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  driverDetails: {
    flex: 1,
    marginLeft: 15,
  },
  driverName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  vehicleInfo: {
    fontSize: 14,
    color: '#666',
  },
  vehicleNumber: {
    fontSize: 14,
    color: '#666',
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  contactButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  iconButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#45b3a0',
    borderRadius: 8,
  },
  paymentMethodContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  tripRoute: {
    padding: 20,
    backgroundColor: '#fff',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  routeLine: {
    width: 2,
    height: 30,
    backgroundColor: '#45b3a0',
    marginLeft: 12,
  },
  locationText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
  },
  changeDestination: {
    marginTop: 10,
  },
  changeDestinationText: {
    color: '#45b3a0',
    fontSize: 14,
  },
  bottomContainer: {
    padding: 20,
  },
  paymentSection: {
    marginBottom: 20,
  },
  paymentTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  paymentDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  paymentMethod: {
    fontSize: 16,
  },
  paymentAmount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  switchPayment: {
    marginTop: 5,
  },
  switchPaymentText: {
    color: '#45b3a0',
  },
  bottomButtons: {
    flexDirection: 'row',
  },
  endTripButton: {
    flex: 1,
    backgroundColor: '#45b3a0',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  endTripButtonText: {
    color: '#fff',
    fontSize: 16,
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
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  ratingStars: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 20,
  },
  starIcon: {
    fontSize: 32,
    color: '#FFD700',
  },
  submitRating: {
    backgroundColor: '#45b3a0',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitRatingText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DriverInfo;