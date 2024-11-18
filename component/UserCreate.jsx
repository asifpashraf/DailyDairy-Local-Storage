import { View, Text, TextInput, Button } from 'react-native';
import React, { useState } from 'react';
import axios from 'axios';

const UserCreate = () => {
  const [nameInput, setNameInput] = useState('');
  const [numberInput, setNumberInput] = useState('');
  const [confirmNumber, setConfrimNumber] = useState('');
  const [users, setUsers] = useState([]);

  // Function to validate and add users
  const addCustomer = async () => {
    // Check if phone numbers match and fields are not empty
    if (numberInput.trim() !== '' && numberInput === confirmNumber) {
      if (nameInput.trim() !== '') {
        try {
          // Send data to the backend
          await axios.post('http://192.168.1.37:3000/api/data', {
            name: nameInput.trim(),
            number: numberInput.trim(),
          });
  
          // Add the new user to the local users list (optional, for display)
          setUsers((prevUsers) => [
            { name: nameInput.trim(), number: numberInput.trim() },
            ...prevUsers,
          ]);
  
          // Clear input fields
          setNameInput('');
          setNumberInput('');
          setConfrimNumber('');
  
          // Notify success
          alert(`User ${nameInput} successfully created!`);
        } catch (error) {
          alert('Failed to add user. Please try again.');
        }
      } else {
        alert('Please fill in all fields.');
      }
    } else {
      alert('Phone number mismatch or no number entered.');
    }
  };
  

  return (
    <View>
      <Text>Add Customer</Text>
      <TextInput
        keyboardType="text"
        placeholder="User Name"
        value={nameInput}
        onChangeText={(text) => setNameInput(text)}
      />
      <TextInput
        keyboardType="phone-pad"
        placeholder="Phone Number"
        value={numberInput}
        onChangeText={(text) => setNumberInput(text)}
      />
      <TextInput
        keyboardType="phone-pad"
        placeholder="Confirm Number"
        value={confirmNumber}
        onChangeText={(text) => setConfrimNumber(text)}
      />
      <Button title="Add Customer" onPress={addCustomer} />
    
      {/* <Text>Customer List:</Text> */}
      {/* {users.map((user, index) => (
        <Text key={index}>
          {user.name} - {user.number}
        </Text>
      ))} */}
    </View>
  );
};

export default UserCreate;
