import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

const DriverDetails = ({navigation}) => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Driver Details</Text>

      {/* Driver Profile Section */}
      <View style={styles.profileSection}>
        <Image
          source={require('../assets/doctor.png')}
          style={styles.profileImage}
        />
        <Text style={styles.driverName}>Cameron Williamson</Text>
        <View style={styles.ratingContainer}>
         
          <Text style={styles.ratingText}>5.0 (235 ratings)</Text>
        </View>
      </View>

      {/* Stats Section */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.icon}>📌</Text>
          <Text style={styles.statLabel}>Distance shared</Text>
          <Text style={styles.statValue}>2,674 KM</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.icon}>🚗</Text>
          <Text style={styles.statLabel}>Rides Shared</Text>
          <Text style={styles.statValue}>410</Text>
        </View>
      </View>

      {/* Reviews Section */}
      <View style={styles.reviewsSection}>
        <Text style={styles.reviewsTitle}>Reviews (235 reviews)</Text>

        {/* Individual Review Items */}
        <ReviewItem
          name="Savannah Nguyen"
          rating={5.0}
          time="2 hrs ago"
          review="Lorem ipsum dolor sit amet consectetur. Lectus in neque dolor non. Morbi diam arcu sit iaculis. Nibh fermentum curabitur magna commodo et turpis sagittis bibendum."
        />

        <ReviewItem
          name="Kathryn Murphy"
          rating={5.0}
          time="2 hrs ago"
          review="Lorem ipsum dolor sit amet consectetur. Lectus in neque dolor non. Morbi diam arcu sit iaculis. Nibh fermentum curabitur magna commodo et turpis sagittis bibendum. Feugiut ut quis nec"
        />
      </View>

      {/* Contact Button */}
      <TouchableOpacity
        style={styles.contactButton}
        onPress={() => navigation.navigate('DriverInfo')}>
        <Text style={styles.contactButtonText}>Verified</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

// Review Item Component
const ReviewItem = ({name, rating, time, review}) => (
  <View style={styles.reviewItem}>
    <View style={styles.reviewHeader}>
      <Image
        source={require('../assets/doctor1.png')}
        style={styles.reviewerImage}
      />
      <View style={styles.reviewerInfo}>
        <Text style={styles.reviewerName}>{name}</Text>
        <View style={styles.ratingContainer}>
          <Text style={styles.driverRating}>⭐</Text>
          <Text style={styles.reviewRating}>{rating} (235 ratings)</Text>
        </View>
      </View>
      <Text style={styles.reviewTime}>{time}</Text>
    </View>
    <Text style={styles.reviewText}>{review}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    padding: 20,
  },
  icon: {
    fontSize: 16,
    size: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  driverName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    color: '#FFFFFF',
    marginLeft: 5,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30,
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    color: '#666',
    marginTop: 5,
  },
  statValue: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  reviewsSection: {
    marginBottom: 20,
  },
  reviewsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 15,
  },
  reviewItem: {
    marginBottom: 20,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  reviewerImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  reviewerInfo: {
    flex: 1,
  },
  reviewerName: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  reviewRating: {
    color: '#FFFFFF',
    marginLeft: 5,
  },
  reviewTime: {
    color: '#666',
  },
  reviewText: {
    color: '#999',
    lineHeight: 20,
  },
  contactButton: {
    backgroundColor: '#FFD700',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  contactButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DriverDetails;
