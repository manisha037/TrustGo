import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react-native';

const Payment = ({ navigation, route }) => {
  const { amount = "₹81" } = route.params || {};

  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <ChevronLeft size={24} color="#000" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Bill total: {amount}</Text>
    </View>
  );

  const renderPaymentOption = ({ icon, title, subtitle, action, isNew }) => (
    <TouchableOpacity style={styles.paymentOption}>
      <View style={styles.paymentOptionLeft}>
        <Image source={icon} style={styles.paymentIcon} />
        <View>
          <Text style={styles.paymentTitle}>{title}</Text>
          {subtitle && <Text style={styles.paymentSubtitle}>{subtitle}</Text>}
        </View>
      </View>
      <View style={styles.paymentOptionRight}>
        {isNew && <View style={styles.newTag}><Text style={styles.newTagText}>NEW</Text></View>}
        {action ? (
          <Text style={styles.actionText}>{action}</Text>
        ) : (
          <ChevronRight size={20} color="#666" />
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      
      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recommended</Text>
          {renderPaymentOption({
            icon: require('../assets/gpay.png'),
            title: 'Google Pay UPI'
          })}
          {renderPaymentOption({
            icon: require('../assets/paytm.png'),
            title: 'Paytm UPI'
          })}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cards</Text>
          {renderPaymentOption({
            icon: require('../assets/card.png'),
            title: 'Add credit or debit cards',
            action: 'ADD'
          })}
          {renderPaymentOption({
            icon: require('../assets/pluxee.png'),
            title: 'Pluxee'
          })}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pay by any UPI app</Text>
          {renderPaymentOption({
            icon: require('../assets/upi.png'),
            title: 'Add new UPI ID',
            action: 'ADD'
          })}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Wallets</Text>
          {renderPaymentOption({
            icon: require('../assets/zomato.png'),
            title: 'Zomato Money',
            subtitle: 'Balance: ₹0'
          })}
          {renderPaymentOption({
            icon: require('../assets/amazon.png'),
            title: 'Amazon Pay Balance',
            subtitle: 'Link your Amazon Pay Balance wallet',
            action: 'LINK',
            isNew: true
          })}
          {renderPaymentOption({
            icon: require('../assets/mobikwik.png'),
            title: 'Mobikwik',
            subtitle: 'Link your Mobikwik wallet',
            action: 'LINK'
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 16,
  },
  content: {
    flex: 1,
  },
  section: {
    padding: 16,
    borderBottomWidth: 8,
    borderBottomColor: '#f5f5f5',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  paymentOptionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentIcon: {
    width: 40,
    height: 40,
    marginRight: 12,
    borderRadius: 8,
  },
  paymentTitle: {
    fontSize: 16,
    marginBottom: 2,
  },
  paymentSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  paymentOptionRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    color: '#00A862',
    fontSize: 14,
    fontWeight: '500',
  },
  newTag: {
    backgroundColor: '#00A862',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginRight: 8,
  },
  newTagText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
});

export default Payment;