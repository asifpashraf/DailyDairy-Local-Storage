import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ViewData = () => {
  const [customerData, setCustomerData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [phoneFilter, setPhoneFilter] = useState('');
  const [totalAmount, setTotalAmount] = useState(0);  // Add state for total amount

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

  // Calculate total amount whenever filteredData changes
  useEffect(() => {
    const total = filteredData.reduce((acc, item) => acc + item.total, 0);
    setTotalAmount(total);
  }, [filteredData]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.table}>
        <TextInput
          style={styles.input}
          placeholder="Filter by phone number"
          placeholderTextColor="#888"
          keyboardType="number-pad"
          value={phoneFilter}
          onChangeText={(text) => handleFilter(text)}
        />
        <View style={[styles.row, styles.headerRow]}>
          <Text style={[styles.cell, styles.headerCell]}>Phone</Text>
          <Text style={[styles.cell, styles.headerCell]}>Name</Text>
          {/* <Text style={[styles.cell, styles.headerCell]}>Quantity</Text> */}
          {/* <Text style={[styles.cell, styles.headerCell]}>Price/Ltr</Text> */}
          <Text style={[styles.cell, styles.headerCell]}>Total</Text>
        </View>

        {filteredData.map((item) => (
          <View key={item.id} style={styles.row}>
            <Text style={styles.phonecell}>{item.phone}</Text>
            <Text style={styles.cell}>{item.name}</Text>
            {/* <Text style={styles.cell}>{item.quantity}</Text> */}
            {/* <Text style={styles.cell}>{item.pricePerLtr}</Text> */}
            <Text style={styles.cell}>{item.total}</Text>
          </View>
        ))}
      </View>

      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total Amount: ₹{totalAmount.toFixed(2)}</Text>
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
  table: {
    margin: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headerRow: {
    backgroundColor: '#f4f4f4',
  },
  cell: {
    flex: 1,
    padding: 5,
    textAlign: 'center',
  },
  headerCell: {
    fontWeight: 'bold',
  },
  totalContainer: {
    marginTop: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#F9F9F9',
    borderRadius: 8,
    marginBottom: 10,
  },
  totalText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
});
