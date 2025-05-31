import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {MapPin, ChevronRight, Navigation} from 'lucide-react-native';
import {useNavigation} from '@react-navigation/native';

const CustomDrawer = props => {
  const navigation = useNavigation();

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{flex: 1, backgroundColor: '#000'}}>
      <View style={styles.profileContainer}>
        <Image
          source={{uri: 'https://randomuser.me/api/portraits/women/44.jpg'}}
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>Neha Gupta</Text>
        <Text style={styles.profileInfo}>Account ending in 2183</Text>
      </View>

      <View style={styles.tripPointContainer}>
        <Text style={styles.tripPointTitle}>Trip Point</Text>
        <Text style={styles.tripPointDescription}>
          More trips earn more points, and book a free trip
        </Text>
      </View>

      <DrawerItem
        label="Account Setting"
        labelStyle={styles.drawerLabel}
        icon={() => <Text style={styles.emoji}>👤</Text>}
        left={() => (
          <TouchableOpacity>
            <ChevronRight size={24} color="white" />
          </TouchableOpacity>
        )}
      />
      <DrawerItem
        label="Notification Setting"
        labelStyle={styles.drawerLabel}
        icon={() => <Text style={styles.emoji}>🔔</Text>}
      />
      <DrawerItem
        label="Trip History"
        labelStyle={styles.drawerLabel}
        icon={() => <Text style={styles.emoji}>🕒</Text>}
        onPress={() => navigation.navigate('TripHistory')}
      />
      <DrawerItem
  label="Transaction History"
  labelStyle={styles.drawerLabel}
  icon={() => <Text style={styles.emoji}>🧾</Text>}
  onPress={() => navigation.navigate('TransactionHistory')}
/>
      <DrawerItem
        label="Payment Service"
        labelStyle={styles.drawerLabel}
        icon={() => <Text style={styles.emoji}>💳</Text>}
      />
      <DrawerItem
        label="Logout"
        labelStyle={styles.drawerLabel}
        icon={() => <Text style={styles.emoji}>🚪</Text>}
      />
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 10,
  },
  profileName: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  profileInfo: {
    color: 'black',
    fontSize: 12,
  },
  tripPointContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  tripPointTitle: {
    color: 'yellow',
    fontSize: 14,
    fontWeight: 'bold',
  },
  tripPointDescription: {
    color: 'gray',
    fontSize: 12,
  },
  drawerLabel: {
    color: 'white',
  },
  emoji: {
    fontSize: 20,
  },
});

export default CustomDrawer;
