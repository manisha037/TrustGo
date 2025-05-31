import React, { useState } from 'react';
import { View, Text, ScrollView, FlatList, StyleSheet, TouchableOpacity, Image, SafeAreaView, TextInput } from 'react-native';
import { Search } from 'lucide-react-native';

const TransactionHistory = () => {
  const [selectedMonth, setSelectedMonth] = useState('January');

  const months = [
    'November 2021', 'December 2021', 'January', 'February'
  ];

 
  const transactions = {
    January: [
      { id: '1', date: '09 JANUARY', name: 'Esther Howard', amount: '$15.00', account: 'Account ending in 2183', image: require('../assets/doctor.png') },
      { id: '2', date: '09 JANUARY', name: 'Bessie Cooper', amount: '$15.00', account: 'Account ending in 2183', image: require('../assets/doctor1.png') },
      { id: '3', date: '08 JANUARY', name: 'Dianne Russell', amount: '$15.00', account: 'Account ending in 2183', image: require('../assets/doctor.png') },
      { id: '4', date: '07 JANUARY', name: 'Robert Fox', amount: '$15.00', account: 'Account ending in 2183', image: require('../assets/doctor1.png') },
      { id: '5', date: '06 JANUARY', name: 'Cameron Willan', amount: '$15.00', account: 'Account ending in 2183', image: require('../assets/doctor.png') },
    ],
    February: [
      { id: '6', date: '15 FEBRUARY', name: 'John Doe', amount: '$20.00', account: 'Account ending in 2183', image: require('../assets/doctor.png') },
      { id: '7', date: '12 FEBRUARY', name: 'Jane Smith', amount: '$25.00', account: 'Account ending in 2183', image: require('../assets/doctor1.png') },
      { id: '8', date: '13 JANUARY', name: 'Dianne Russell', amount: '$15.00', account: 'Account ending in 2183', image: require('../assets/doctor.png') },
      { id: '9', date: '14 JANUARY', name: 'Robert Fox', amount: '$15.00', account: 'Account ending in 2183', image: require('../assets/doctor1.png') },
      { id: '10', date: '15 JANUARY', name: 'Cameron Willan', amount: '$15.00', account: 'Account ending in 2183', image: require('../assets/doctor1.png') },
    ],
    'December 2021': [
      { id: '11', date: '16 FEBRUARY', name: 'John Doe', amount: '$20.00', account: 'Account ending in 2183', image: require('../assets/doctor1.png') },
      { id: '12', date: '17 FEBRUARY', name: 'Jane Smith', amount: '$25.00', account: 'Account ending in 2183', image: require('../assets/doctor.png') },
      { id: '13', date: '18 JANUARY', name: 'Dianne Russell', amount: '$15.00', account: 'Account ending in 2183', image: require('../assets/doctor1.png') },
      { id: '14', date: '19 JANUARY', name: 'Robert Fox', amount: '$15.00', account: 'Account ending in 2183', image: require('../assets/doctor.png') },
      { id: '15', date: '20 JANUARY', name: 'Cameron Willan', amount: '$15.00', account: 'Account ending in 2183', image: require('../assets/doctor1.png') },
    ],
    'November 2021': [
      { id: '16', date: '16 FEBRUARY', name: 'John Doe', amount: '$20.00', account: 'Account ending in 2183', image: require('../assets/doctor.png') },
      { id: '17', date: '17 FEBRUARY', name: 'Jane Smith', amount: '$25.00', account: 'Account ending in 2183', image: require('../assets/doctor1.png') },
      { id: '18', date: '18 JANUARY', name: 'Dianne Russell', amount: '$15.00', account: 'Account ending in 2183', image: require('../assets/doctor1.png') },
      { id: '19', date: '19 JANUARY', name: 'Robert Fox', amount: '$15.00', account: 'Account ending in 2183', image: require('../assets/doctor1.png') },
      { id: '20', date: '20 JANUARY', name: 'Cameron Willan', amount: '$15.00', account: 'Account ending in 2183', image: require('../assets/doctor.png') },
    ],
  };

  // Group transactions by date for display
  const groupTransactionsByDate = (transactions) => {
    const groupedData = {};
    
    transactions.forEach(transaction => {
      if (!groupedData[transaction.date]) {
        groupedData[transaction.date] = [];
      }
      groupedData[transaction.date].push(transaction);
    });
    
    // Convert to array format for FlatList
    const result = [];
    Object.keys(groupedData).forEach(date => {
      result.push({
        date,
        transactions: groupedData[date]
      });
    });
    
    return result;
  };

  const renderTransactionItem = ({ item }) => (
    <View style={styles.transactionItem}>
      <Image source={item.image} style={styles.transactionImage} />
      <View style={styles.transactionDetails}>
        <Text style={styles.transactionName}>{item.name}</Text>
        <Text style={styles.transactionAccount}>{item.account}</Text>
      </View>
      <Text style={styles.transactionAmount}>{item.amount}</Text>
    </View>
  );

  const renderDateSection = ({ item }) => (
    <View>
      <Text style={styles.dateHeader}>{item.date}</Text>
      {item.transactions.map(transaction => renderTransactionItem({ item: transaction }))}
    </View>
  );

  const groupedTransactions = groupTransactionsByDate(transactions[selectedMonth] || []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.header}>Transaction History</Text>
        
        <View style={styles.searchContainer}>
          <Search size={20} color="white" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for payees"
            placeholderTextColor="white"
          />
        </View>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.monthScroll}>
          {months.map((month) => (
            <TouchableOpacity
              key={month}
              style={[
                styles.monthButton,
                selectedMonth === month && styles.selectedMonth
              ]}
              onPress={() => setSelectedMonth(month)}
            >
              <Text 
                style={[
                  styles.monthText,
                  selectedMonth === month && styles.selectedMonthText
                ]}
              >
                {month}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <FlatList
          data={groupedTransactions}
          keyExtractor={(item) => item.date}
          renderItem={renderDateSection}
          showsVerticalScrollIndicator={false}
          style={styles.transactionList}
        />
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
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#222',
    borderRadius: 8,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 45,
    color: 'white',
    fontSize: 16,
  },
 // In your StyleSheet:
monthScroll: {
  marginBottom: 0, // Remove bottom margin
},
dateHeader: {
  fontSize: 14,
  color: '#999',
  marginTop: 0, // Reduce this from 15 to 0
  paddingTop: 15, // Add padding instead if you need spacing between date headers
},
transactionList: {
 
  marginTop: 0, // Ensure no additional margins
},
monthButton: {
  paddingHorizontal: 15,
  marginRight: 15,
  borderRadius: 5,
  height: 32, // Add consistent height for all buttons
  justifyContent: 'center', // Center text vertically
  alignItems: 'center', // Center text horizontally
},
  selectedMonth: {
    backgroundColor: '#FFEB3B',
   
  },
  monthText: {
    fontSize: 16,
    color: 'white',
  },
  selectedMonthText: {
    color: 'black',
    fontWeight: 'bold',
  },
 
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  transactionImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 19,
  },
  
  transactionName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF0000',
    marginLeft : 90, 
  },
  transactionAccount: {
    fontSize: 12,
    color: 'gray',
  },
});

export default TransactionHistory;