import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';

const TripHistory = () => {
  const currentMonthTrips = [
    {
      id: '1',
      pickupLocation: 'Noida Sec-63A',
      dropLocation: 'C-125 Pankha Road',
      distance: '98 km',
      status: 'Completed',
      time: '12:45-02:50 PM',
      amount: '$245.00',
    },
    {
      id: '2',
      pickupLocation: 'Noida Sec-63A',
      dropLocation: 'C-125 Pankha Road',
      distance: '98 km',
      status: 'Completed',
      time: '12:45-02:50 PM',
      amount: '$245.00',
    },
  ];

  const lastMonthTrips = [
    {
      id: '3',
      pickupLocation: 'Noida Sec-63A',
      dropLocation: 'C-125 Pankha Road',
      distance: '98 km',
      status: 'Cancelled',
      time: '12:45-02:50 PM',
      amount: '$245.00',
    },
    {
      id: '4',
      pickupLocation: 'Noida Sec-63A',
      dropLocation: 'C-125 Pankha Road',
      distance: '98 km',
      status: 'Completed',
      time: '12:45-02:50 PM',
      amount: '$245.00',
    },
  ];

  const TripCard = ({ trip }) => (
    <View style={styles.tripCard}>
      <View style={styles.locationContainer}>
        <View style={styles.locationPoint}>
          <View style={styles.startPoint} />
          <View style={styles.dashedLine} />
          <View style={styles.endPoint} />
        </View>
        
        <View style={styles.locationDetails}>
          <Text style={styles.locationText}>{trip.pickupLocation}</Text>
          <Text style={styles.locationText}>{trip.dropLocation}</Text>
        </View>
        
        <Text style={styles.amountText}>{trip.amount}</Text>
      </View>
      
      <View style={styles.separator} />
      
      <View style={styles.tripDetailsContainer}>
        <Text style={styles.distanceText}>{trip.distance}</Text>
        <Text style={[styles.statusText, 
          trip.status === 'Completed' ? styles.completedStatus : styles.cancelledStatus]}>
          {trip.status}
        </Text>
        <Text style={styles.timeText}>{trip.time}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.header}>Trip History</Text>
        
        <ScrollView>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>This Month</Text>
            {currentMonthTrips.map(trip => (
              <TripCard key={trip.id} trip={trip} />
            ))}
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Last Month</Text>
            {lastMonthTrips.map(trip => (
              <TripCard key={trip.id} trip={trip} />
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'black',
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'black',
  },
  header: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 15,
  },
  tripCard: {
    backgroundColor: '#333',
    borderRadius: 10,
    marginBottom: 15,
    padding: 15,
  },
  locationContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  locationPoint: {
    width: 20,
    alignItems: 'center',
    marginRight: 10,
  },
  startPoint: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FFD700',
  },
  dashedLine: {
    height: 25,
    width: 2,
    backgroundColor: '#FFD700',
    marginVertical: 2,
  },
  endPoint: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FFD700',
  },
  locationDetails: {
    flex: 1,
    justifyContent: 'space-between',
    height: 50,
  },
  locationText: {
    color: 'white',
    fontSize: 16,
  },
  amountText: {
    color: '#FFD700',
    fontSize: 16,
    fontWeight: 'bold',
  },
  separator: {
    height: 1,
    backgroundColor: '#444',
    marginBottom: 15,
  },
  tripDetailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  distanceText: {
    color: 'white',
    fontSize: 14,
  },
  statusText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  completedStatus: {
    color: '#00C853',
  },
  cancelledStatus: {
    color: '#FF5252',
  },
  timeText: {
    color: 'white',
    fontSize: 14,
  },
});

export default TripHistory;