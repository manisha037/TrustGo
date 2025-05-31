import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  TextInput,
  Pressable,
  Alert,
} from 'react-native';
import { useSelector } from 'react-redux';
import { selectDriverDetails } from '../slices/navSlice';
import { X } from 'lucide-react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

const TripFeedback = ({ navigation }) => {
  const driverDetails = useSelector(selectDriverDetails);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');

  const handleStarPress = (selectedRating) => {
    setRating(selectedRating);
  };

  const handleSubmit = () => {
    if (rating === 0) {
      Alert.alert('Please Rate', 'Please select a rating before submitting');
      return;
    }
    if (feedback.trim().length === 0) {
      Alert.alert('Add Feedback', 'Please provide some feedback about your experience');
      return;
    }
    Alert.alert('Thank You', 'Your feedback has been submitted.');
    navigation.navigate('SearchLocationScreen');
  };

  const renderStars = () => {
    return [1, 2, 3, 4, 5].map((star) => (
      <Pressable
        key={star}
        onPress={() => handleStarPress(star)}
        style={styles.starContainer}
      >
        <Text
          style={[styles.star, { color: star <= rating ? '#FFD700' : '#E0E0E0' }]}
        >
          ★
        </Text>
      </Pressable>
    ));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mapContainer}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{ latitude: 51.5074, longitude: -0.1278, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }}
        />
      </View>
      <View style={styles.bottomSheet}>
        <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
          <X size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.arrivalText}>You Arrived</Text>
        <View style={styles.driverContainer}>
          <Image source={require('../assets/doctor.png')} style={styles.driverImage} />
          <View style={styles.driverDetails}>
            <Text style={styles.driverName}>Cameron Williamson</Text>
            <Text style={styles.driverRating}>⭐ 5.0 (235 ratings)</Text>
          </View>
          <TouchableOpacity style={styles.profileButton}>
            <Text style={styles.profileButtonText}>Profile</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.ratingTitle}>How was your trip?</Text>
        <Text style={styles.ratingSubtitle}>Your feedback will help us improve driving experience better.</Text>
        <View style={styles.starsContainer}>{renderStars()}</View>
        <View style={styles.feedbackContainer}>
          <Text style={styles.feedbackLabel}>FEEDBACK</Text>
          <TextInput
            style={styles.feedbackInput}
            placeholder="Write here..."
            multiline
            value={feedback}
            onChangeText={setFeedback}
          />
        </View>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>SUBMIT</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  mapContainer: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  bottomSheet: {
    backgroundColor: 'black',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 20,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  closeButton: {
    position: 'absolute',
    right: 20,
    top: 20,
    zIndex: 1,
  },
  arrivalText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: 10,
    color: "white",
  },
  driverContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  driverImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  driverDetails: {
    flex: 1,
    marginLeft: 10,
    color: "white",
  },
  driverName: {
    fontSize: 16,
    fontWeight: '600',
    color: "white",
  },
  driverRating: {
   
    marginTop: 4,
    color: "white",
  },
  profileButton: {
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  profileButtonText: {
    fontSize: 14,
    color: "white",
  },
  ratingTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: "white",
  },
  ratingSubtitle: {
    fontSize: 14,
   color: "white",
    textAlign: 'center',
    marginBottom: 16,
   
    

    

  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
  },
  star: {
    fontSize: 36,
  },
  feedbackContainer: {
    marginBottom: 16,
  },
  feedbackLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
    color: "white",
  },
  feedbackInput: {
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    padding: 12,
    height: 80,
    color: "white",
  },
  submitButton: {
    backgroundColor: 'hsla(51, 100%, 50%, 1)',
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TripFeedback;