import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import axios from 'axios';

const MilkDelivery = () => {
  const [phone, setPhone] = useState('');
  const [price, setPrice] = useState('');
  const [qty, setQty] = useState('');
  const [total, setTotal] = useState(0);
  const [salesData, setSalesData] = useState([]);

  const sendData = async () => {
    const currentTotal = price * qty;
    setTotal(currentTotal);
    setSalesData((prevSalesData) => [
      { phone, qty, ppl: price, total: currentTotal },
      ...prevSalesData
    ]);

    try {
      await axios.post('http://192.168.1.37:3000/api/sales', {
        qty: qty,
        ppl: price
      });
      alert('Data successfully added');
    } catch (error) {
      alert('Failed to add user data');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Milk Delivery</Text>
      <TextInput 
        style={styles.input} 
        placeholder='Customer Phone Number' 
        keyboardType='phone-pad' 
        value={phone}
        onChangeText={(value) => setPhone(value)}
      />
      <TextInput 
        style={styles.input} 
        placeholder='Price per Liter' 
        keyboardType='number-pad' 
        value={price.toString()} 
        onChangeText={(value) => setPrice(Number(value))}
      />
      <TextInput 
        style={styles.input} 
        placeholder='Quantity' 
        keyboardType='number-pad' 
        value={qty.toString()} 
        onChangeText={(value) => setQty(Number(value))}
      />
      <Text style={styles.totalText}>Total: ₹{price * qty}</Text>
      <Button 
        title='Make a Sale' 
        onPress={sendData} 
        color="#4CAF50" 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5d9',
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    width: 220,
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
    paddingLeft: 15,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  totalText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4CAF50',
    marginVertical: 10,
  },
});

export default MilkDelivery;
