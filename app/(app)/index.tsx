import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { router } from 'expo-router'
import { Dropdown } from 'react-native-element-dropdown';



const ResearchScreen = () => {

  const [number, setNumber] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
//   const [defaultSelected, setDefaultSelected] = useState(null)
  const [dataItem, setDataItem] = useState([])
  const [isFocus, setIsFocus] = useState(false);
  
  const handleSearch = () => {
    // TODO: Implement login logic
    console.log('Login with:', number, selectedItem);
    if(number !="" && selectedItem != null){
      router.navigate(`/trans?num=${number}&agen=${selectedItem}`);
    }

    setNumber('');
    setSelectedItem(null)
   //  setDefaultSelected(null);
  };


   const getAllAgency = async () => {
      try {
        const response = await fetch(
         'http://192.168.100.100:9999/api/agences',
        );
         const json = await response.json();
         setDataItem(json)
      } catch (error) {
        console.error(error);
      }
    };

   useEffect(()=>{
      // getAllAgency();
   },[])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Research Transaction</Text>
      <TextInput
         style={styles.input}
         placeholder="Numero"
         value={number}
         onChangeText={setNumber}
      />

     <Dropdown
         style={styles.dropdown}
         placeholderStyle={styles.placeholderStyle}
         selectedTextStyle={styles.selectedTextStyle}
         inputSearchStyle={styles.inputSearchStyle}
         iconStyle={styles.iconStyle}
         data={dataItem}
         search
         maxHeight={300}
         labelField= "agLib"
         valueField="agCode"
         placeholder={!isFocus ? 'Select item' : '...'}
         onFocus={() => setIsFocus(true)}
         onBlur={() => setIsFocus(false)}
         searchPlaceholder="Search..."
         value={selectedItem}
         onChange={(item:any) => {
            setSelectedItem(item.agCode);
      }}
    />
      <TouchableOpacity 
         style={styles.button}
         onPress={handleSearch}
      >
        <Text style={styles.buttonText}>Recherche Transaction</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center',
   padding: 20,
    backgroundColor:'#fff'
  },
  title: {
   fontSize: 32,
   fontWeight: '700',
   marginBottom: 20,
   color: '#333',
   textTransform: 'uppercase',
 },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius:10,
    padding: 10,
    marginBottom: 10,
    width: '80%',
  },
  button: {
   backgroundColor: "#01a5fc",
   borderRadius: 10,
   padding: 10,
   alignItems: "center",
   marginTop: "2.5%",
   width: '80%',
 },
 buttonText: {
   color: '#fff',
   fontWeight: 'bold',
   fontSize: 18,
 },
 dropdown: {
   margin: 16,
   height: 50,
   borderWidth: 1,
   borderColor: 'black',
   borderRadius:10,
   padding: 10,
   marginBottom: 10,
   width: '80%',
 },
 icon: {
   marginRight: 5,
 },
 placeholderStyle: {
   fontSize: 16,
 },
 selectedTextStyle: {
   fontSize: 16,
 },
 iconStyle: {
   width: 20,
   height: 20,
 },
 inputSearchStyle: {
   height: 40,
   fontSize: 16,
 },
});

export default ResearchScreen;
