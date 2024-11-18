import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const TableExample = () => {
  const tableData = [
    { id: 1, name: 'Alice', age: 25 },
    { id: 2, name: 'Bob', age: 30 },
    { id: 3, name: 'Charlie', age: 35 },
    { id: 4, name: 'Diana', age: 28 },
  ];

  return (
    <ScrollView>
      <View style={styles.table}>
        {/* Header Row */}
        <View style={[styles.row, styles.headerRow]}>
          <Text style={[styles.cell, styles.headerCell]}>ID</Text>
          <Text style={[styles.cell, styles.headerCell]}>Name</Text>
          <Text style={[styles.cell, styles.headerCell]}>Age</Text>
        </View>

        {/* Data Rows */}
        {tableData.map((item) => (
          <View key={item.id} style={styles.row}>
            <Text style={styles.cell}>{item.id}</Text>
            <Text style={styles.cell}>{item.name}</Text>
            <Text style={styles.cell}>{item.age}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  table: {
    margin: 10,
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
    padding: 10,
    textAlign: 'center',
  },
  headerCell: {
    fontWeight: 'bold',
  },
});

export default TableExample;
