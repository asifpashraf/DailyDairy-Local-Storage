import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ViewData = () => {
  const [customerData, setCustomerData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [phoneFilter, setPhoneFilter] = useState('');

  // Load data from AsyncStorage when the component mounts
  useEffect(() => {
    const loadData = async () => {
      try {
        const storedData = await AsyncStorage.getItem('customerData');
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          setCustomerData(parsedData);
          setFilteredData(parsedData); // Initialize filtered data with all data
        }
      } catch (error) {
        console.error('Failed to load data:', error);
        Alert.alert('Error', 'Failed to load data from storage.');
      }
    };
    loadData();
  }, []);

  // Filter data by phone number
  const handleFilter = (phone) => {
    setPhoneFilter(phone);
    if (!phone) {
      // If no input, show all data
      setFilteredData(customerData);
    } else {
      const filtered = customerData.filter((entry) => entry.phone.includes(phone));
      setFilteredData(filtered);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.header}>Stored Customer Data</Text>

        <TextInput
          style={styles.input}
          placeholder="Filter by phone number"
          placeholderTextColor="#888"
          keyboardType="number-pad"
          value={phoneFilter}
          onChangeText={(text) => handleFilter(text)}
        />

        {filteredData.length > 0 ? (
          <FlatList
            data={filteredData}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Text style={styles.cardText}>Name: {item.name}</Text>
                <Text style={styles.cardText}>Phone: {item.phone}</Text>
                <Text style={styles.cardText}>Price/Ltr: ₹{item.pricePerLtr}</Text>
                <Text style={styles.cardText}>Quantity: {item.quantity}</Text>
                <Text style={styles.cardText}>Total: ₹{item.total.toFixed(2)}</Text>
                <Text style={styles.cardText}>Date: {item.date}</Text>
              </View>
            )}
          />
        ) : (
          <Text style={styles.noDataText}>No data found for the given phone number.</Text>
        )}
      </View>
    </SafeAreaView>
  );
};

export default ViewData;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#F9F9F9',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DDD',
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 14,
    color: '#333',
    marginBottom: 15,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  cardText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
  noDataText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    marginTop: 20,
  },
});
