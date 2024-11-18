import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';

const Sample = () => {
    const [sales, setSales] = useState([]);
    const [qty, setQty] = useState('');
    const [ppl, setPpl] = useState('');

    const fetchSales = async () => {
        try {
            const response = await axios.get('http://192.168.1.37:3000/api/data');
            setSales(response.data);
        } catch (error) {
            console.error('Error fetching sales:', error);
        }
    };

    const addSale = async () => {
        try {
            const newSale = { qty: parseInt(qty), ppl: parseInt(ppl) };
            await axios.post('http://192.168.1.37:3000/api/sales', newSale);
            fetchSales();
            setQty('');
            setPpl('');
        } catch (error) {
            console.error('Error adding sale:', error);
        }
    };

    useEffect(() => {
        fetchSales();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sales Data</Text>
            <FlatList
                data={sales}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <View style={styles.saleItem}>
                        <Text>Qty: {item.qty}</Text>
                        <Text>PPL: {item.ppl}</Text>
                        <Text>Date: {new Date(item.date).toLocaleDateString()}</Text>
                    </View>
                )}
            />
            <View style={styles.form}>
                <TextInput
                    style={styles.input}
                    placeholder="Quantity"
                    keyboardType="numeric"
                    value={qty}
                    onChangeText={setQty}
                />
                <TextInput
                    style={styles.input}
                    placeholder="People"
                    keyboardType="numeric"
                    value={ppl}
                    onChangeText={setPpl}
                />
                <Button title="Add Sale" onPress={addSale} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#f8f9fa' },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
    saleItem: { padding: 15, marginBottom: 10, backgroundColor: '#fff', borderRadius: 5, elevation: 2 },
    form: { marginTop: 20 },
    input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10, marginBottom: 10 },
});

export default Sample;
