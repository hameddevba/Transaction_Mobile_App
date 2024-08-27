import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const App = () => {
  const [data, setData] = useState([]);



  const fetchData = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
      const result = await response.json();
      setData([result]); // Wrapping result in an array as FlatList expects an array
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
   fetchData();
 }, []);

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.info}>Username: {item.username}</Text>
      <Text style={styles.info}>Email: {item.email}</Text>
      <Text style={styles.info}>Phone: {item.phone}</Text>
      <Text style={styles.info}>Website: {item.website}</Text>
      <Text style={styles.info}>Company: {item.company.name}</Text>
      <Text style={styles.info}>Address: {`${item.address.suite}, ${item.address.street}, ${item.address.city}, ${item.address.zipcode}`}</Text>
      <Text style={styles.info}>Geo: {`Lat: ${item.address.geo.lat}, Lng: ${item.address.geo.lng}`}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  itemContainer: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    borderRadius: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  info: {
    fontSize: 16,
    marginTop: 5,
  },
});

export default App;
