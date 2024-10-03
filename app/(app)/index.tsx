import React, { useState, useEffect } from 'react';
import { Layout, Text, Input, Button, RadioGroup, Radio, Select, SelectItem } from '@ui-kitten/components';
import { StyleSheet, ScrollView, KeyboardAvoidingView, Alert } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { router } from 'expo-router'

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import { data_trans } from '../../utils/dataTrans';
import { formatDateTime } from '../../utils/timeConvert';
import { data } from '@/constants/currency';
import { Agency, DataSetsType } from '@/constants/types/types';
import { fetchURL } from '@/constants/fetchUrl';



function Component() {


   const [dataSubmited, setDataSubmited] = useState(data_trans)

   const [dataSets, setDataSets] = useState<DataSetsType>({
      lastName: '',
      firstName: '',
      phoneNumber: '',
      address: '',
      amount:'0',
      amountPayed:'0',
      selectedMountCurrency:'CFA',
      selectedPayedMountCurrency:"MRO",
      selectedAgence:null,
   });

   //store the fetched data from the database 
   const [dataAgency, setDataAgency] =useState<Agency[]>([]);


   


   const handleDataFetching = () => {

      const newDataSubmited = {
         ...dataSubmited,
         benef: {
            ...dataSubmited.benef,
            bnpre: dataSets.lastName ,
            bnnom: dataSets.firstName,
            bntel: dataSets.phoneNumber,
            bnadd: dataSets.address,
            bnagcode: parseInt(dataSets.selectedAgence ?? '0'),
         },
         trdatcr : formatDateTime(),
         tragen: parseInt(dataSets.selectedAgence ?? '0'),
         tragbn: parseInt(dataSets.selectedAgence ?? '0'),
         trmone: parseFloat(dataSets.amount),
         trnetpay: parseFloat(dataSets.amountPayed),
         trdevpay: dataSets.selectedPayedMountCurrency,
         trdev: dataSets.selectedPayedMountCurrency,
         trdeven: dataSets.selectedMountCurrency,
      };
   
      setDataSubmited(newDataSubmited);
   
      
      const formData = new FormData();
      formData.append('data', JSON.stringify(newDataSubmited));
   
      const url = `${fetchURL}/api/trans/changetrans`;
      const options = {
            method: 'POST',
            headers: {
              'Authorization': '', // You can add your token here if needed
            },
            body: formData,
      };
   
      fetch(url, options)
         .then(response => response.text())
         .then(data =>{
            const jsonData = JSON.stringify(data)
            // console.log(jsonData)
         })
         .catch(error => console.error('Error:', error));
   
      setDataSets({
         lastName: '',
         firstName: '',
         phoneNumber: '',
         address: '',
         amount: '0',
         amountPayed: '0',
         selectedMountCurrency: 'CFA',
         selectedPayedMountCurrency: "MRO",
         selectedAgence: null,
      });
   };



    const getAllAgency = async () => {
      try {
         const response = await fetch(`${fetchURL}/api/agences`,
            {
               method: 'GET',
               headers: {
                 'Authorization': '', // You can add your token here if needed
                 'Content-Type': 'application/json'
               },
         });
         const json = await response.json();
         setDataAgency(json);
      } catch (error) {
         console.error(error);
      }
   };


   const handleInputChange = (name:any, value:any) => {
      setDataSets({
        ...dataSets,
        [name]: value,
      });
   };

   const handleSubmit = ()=>{
      if(
         dataSets.phoneNumber != '' &&
         dataSets.amount !='0' &&
         dataSets.amountPayed != '0'
      ){
      handleDataFetching();
      router.navigate(`/trans?num=${dataSubmited.envoyeur.entel}&bntel=${dataSets.phoneNumber}`);
      }else{
         Alert.alert("Veillez inserez des donnees valide")
      }
      
   }


  useEffect(() => {
   getAllAgency();
  }, []);

  return (
  
      <KeyboardAwareScrollView>
         <Layout style={styles.card} level="2">
         <Text category="h2" style={styles.title}>
          Tranasaction
         </Text>
         {/* <Text appearance="hint" style={styles.description}>
            Transfer funds to your beneficiary securely.
         </Text> */}
         <Layout style={styles.content}>
            <Layout style={styles.inputContainer}>
               <Text category="label" style={styles.inputLabel}>Nom</Text>
               <Input placeholder="Entrer le nom du benefiecier" value={dataSets.lastName} onChangeText={(value) => handleInputChange('lastName', value)} />
            </Layout>
            <Layout style={styles.inputContainer}>
               <Text category="label" style={styles.inputLabel}>Prenom</Text>
               <Input placeholder="Entre le prenom du beneficier" value={dataSets.firstName} onChangeText={(value) => handleInputChange('firstName', value)}/>
            </Layout>
            <Layout style={styles.inputContainer}>
               <Text category="label" style={styles.inputLabel}>Addresse</Text>
               <Input placeholder="Entre l'addresse du beneficier" value={dataSets.address} onChangeText={(value) => handleInputChange('address', value)} />
            </Layout>
            <Layout style={styles.inputContainer}>
               <Text category="label" style={styles.inputLabel}>Numero telephoner</Text>
               <Input placeholder="numero telephone benficier" keyboardType="phone-pad" value={dataSets.phoneNumber} onChangeText={(value) => handleInputChange('phoneNumber', value)} />
            </Layout>
            <Layout style={styles.inputContainer}>
               <Text category="label" style={styles.inputLabel}>Mountant d'envoie </Text>
               <Layout style={{flexDirection:'row'}}>
                  <Input placeholder="0.00" keyboardType="numeric" style={{width:'75%'}} value={dataSets.amount}  onChangeText={(value) => handleInputChange('amount', value)} />
                  <Dropdown
                     style={styles.dropdown2}
                     placeholderStyle={styles.placeholderStyle}
                     selectedTextStyle={styles.selectedTextStyle}
                     inputSearchStyle={styles.inputSearchStyle}
                     iconStyle={styles.iconStyle}
                     data={data}
                     maxHeight={300}
                     labelField="label"
                     valueField="id"
                     placeholder={dataSets.selectedMountCurrency}
                     value={dataSets.selectedMountCurrency}
                     onChange={(item) => {
                        handleInputChange('selectedMountCurrency',item.label);
                     }}
                  />
               </Layout>
            </Layout>
            <Layout style={styles.inputContainer}>
               <Text category="label" style={styles.inputLabel}>Mountant payee</Text>
               <Layout style={{flexDirection:'row'}}>
                  <Input placeholder="0.00" keyboardType="numeric" style={{width:'75%'}} value={dataSets.amountPayed} onChangeText={(value) => handleInputChange('amountPayed', value)} />
                  <Dropdown
                     style={styles.dropdown2}
                     placeholderStyle={styles.placeholderStyle}
                     selectedTextStyle={styles.selectedTextStyle}
                     iconStyle={styles.iconStyle}
                     data={data}
                     maxHeight={300}
                     labelField="label"
                     valueField="id"
                     placeholder={dataSets.selectedPayedMountCurrency}
                     value={dataSets.selectedPayedMountCurrency}
                     onChange={(item) => {
                        handleInputChange('selectedPayedMountCurrency',item.label);
                     }}
                  />
               </Layout>
            </Layout>
            <Layout style={styles.inputContainer}>
               <Text category="label" style={styles.inputLabel}>Agence</Text>
               <Dropdown
                  style={styles.dropdown}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  iconStyle={styles.iconStyle}
                  data={dataAgency}
                  search
                  maxHeight={500}
                  labelField="agLib"
                  valueField="agCode"
                  searchPlaceholder="Search..."
                  value={dataSets.selectedAgence}
                  onChange={(item) => {
                     handleInputChange('selectedAgence',item.agCode);;
                  }}
               />
            </Layout>
         </Layout>
            <Button 
               style={styles.button}
               onPress={handleSubmit}>
               Send
            </Button>
         </Layout>
      </KeyboardAwareScrollView>

  );
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   width: '100%',
   // overflow:'scroll'

   
  },
  card: {
   flex:1,
   //  borderRadius: 8,
    padding: 16,
   //  maxWidth: 400,
    width: '100%',
    overflow:'visible'
    
  },
  title: {
    margin: 4,
    textAlign:'left',
    textTransform:'uppercase',
    paddingTop:8,
    paddingBottom:8,
   //  backgroundColor:'blak
  },
  description: {
    marginBottom: 16,
  },
  content: {
    marginBottom: 24,
    padding: 22,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel:{
   fontSize:16,
   marginBottom:5
  },
  radioGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    marginTop: 24,
  },
  dropdown: {
    height: 40,
    borderWidth: 1,
    borderColor: '#E4E9F2',
    backgroundColor:'#F7F9FC',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: '100%',
  },
  dropdown2: {
   height: 40,
   borderWidth: 1,
   borderColor: '#E4E9F2',
   backgroundColor:'#F7F9FC',
   borderRadius: 5,
   padding: 15,
   marginLeft:2,
   marginBottom: 10,
   width: '25%',
 },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 15,
  },
  selectedTextStyle: {
    fontSize: 15,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 15,
  },
});

export default Component;
