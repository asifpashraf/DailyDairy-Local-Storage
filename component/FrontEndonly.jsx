import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const FrontEndonly = () => {
    const currentDate = new Date();
    const formattedDate = currentDate.toDateString();
    
    const navigation = useNavigation();
  // State variables
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [pricePerLtr, setPricePerLtr] = useState('');
  const [quantity, setQuantity] = useState('');
  const [total, setTotal] = useState(0);
  const [customerData, setCustomerData] = useState([]);

  // Load existing data from AsyncStorage on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const storedData = await AsyncStorage.getItem('customerData');
        if (storedData) {
          setCustomerData(JSON.parse(storedData));
        }
      } catch (error) {
        console.error('Failed to load data:', error);
      }
    };
    loadData();
  }, []);

  // Handle calculating the total
  const handleCalculateTotal = () => {
    const price = parseFloat(pricePerLtr) || 0;
    const qty = parseFloat(quantity) || 0;
    setTotal(price * qty);
  };

  // Handle saving the data
  const handleAddData = async () => {
    if (!name || !phone || !pricePerLtr || !quantity) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const newEntry = {
      name,
      phone,
      pricePerLtr: parseFloat(pricePerLtr),
      quantity: parseFloat(quantity),
      total,
      date: formattedDate, // Include the current date
    };

    const updatedData = [...customerData, newEntry];
    setCustomerData(updatedData);

    try {
      await AsyncStorage.setItem('customerData', JSON.stringify(updatedData));
      Alert.alert('Success', 'Customer data added successfully!');
      // Clear input fields
      setName('');
      setPhone('');
      setPricePerLtr('');
      setQuantity('');
      setTotal(0);
    } catch (error) {
      console.error('Failed to save data:', error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.dateContainer}>
          <Text style={styles.dateText}>{formattedDate}</Text>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.headerText}>Add Customer Data</Text>

          <TextInput
            style={styles.input}
            keyboardType="default"
            placeholder="Name"
            placeholderTextColor="#888"
            value={name}
            onChangeText={(text) => setName(text)}
          />
          <TextInput
            style={styles.input}
            keyboardType="number-pad"
            placeholder="Phone Number"
            placeholderTextColor="#888"
            value={phone}
            onChangeText={(text) => setPhone(text)}
          />
          <TextInput
            style={styles.input}
            keyboardType="number-pad"
            placeholder="Price Per Ltr"
            placeholderTextColor="#888"
            value={pricePerLtr}
            onChangeText={(text) => setPricePerLtr(text)}
          />
          <TextInput
            style={styles.input}
            keyboardType="number-pad"
            placeholder="Quantity"
            placeholderTextColor="#888"
            value={quantity}
            onChangeText={(text) => setQuantity(text)}
          />

          <Button title="Calculate Total" color="#FF6F61" onPress={handleCalculateTotal} style={styles.button} />

          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>Total: ₹{total.toFixed(2)}</Text>
          </View>

           <Button title="Add Data" color="#6A5ACD" onPress={handleAddData} style={styles.button} />
            <Button title="View Data" color="#4CAF50" onPress={() => navigation.navigate('View Data')} style={styles.button} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default FrontEndonly;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  dateContainer: {
    backgroundColor: 'powderblue',
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  formContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    width: '100%',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#F9F9F9',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DDD',
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 14,
    color: '#333',
  },
  totalContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  totalText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  button: {
    padding:10 
  },
});
