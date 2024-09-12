import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router, useLocalSearchParams } from 'expo-router';
import { convertDate } from '../utils/timeConvert';



const TransactionItem = ({ item }:{item:any}) => (


  <ScrollView horizontal contentContainerStyle={styles.horizontalScrollContent}>
    <View style={styles.transactionItem}>
      <View style={styles.transactionCodeRow}>
        <Ionicons name="barcode" size={16} color="#8e8e93" />
        <Text style={styles.transactionCodeText}>Transaction Code: {item.trcode}</Text>
      </View>
      <View style={styles.userRow}>
        <View style={styles.userInfo}>
          <Ionicons name="person" size={20} color="#4a90e2" />
          <View>
            <Text style={styles.userName}>Envoyeur</Text>
            <Text style={styles.userName}>{item.envoyeur.enpre} (Code: {item.envoyeur.encode})</Text>
            <Text style={styles.userPhone}>{item.envoyeur.entel}</Text>
          </View>
        </View>
        <Ionicons name="arrow-forward" size={20} color="#8e8e93" />
        <View style={styles.userInfo}>
          <Ionicons name="person" size={20} color="#50c878" />
          <View>
            <Text style={styles.userName}>Beneficier</Text>
            <Text style={styles.userName}>{item.benef.bnpre} {item.benef.bnnom} (Code: {item.benef.bncode})</Text>
            <Text style={styles.userPhone}>{item.benef.bntel}</Text>
          </View>
        </View>
      </View>
      <View style={styles.amountRow}>
        <Text style={styles.amountText}>Envoyeur Montant: {item.trnetpay.toFixed(2)} {item.trdevpay}</Text>
        <Text style={styles.amountText}>Receveur Montant: {item.trmone.toFixed(2)} {item.trdeven}</Text>
      </View>
      <View style={styles.detailsRow}>
        <View style={styles.agencyInfo}>
          <Ionicons name="business" size={16} color="#8e8e93" />
          <Text style={styles.detailText}>{item.tragen}</Text>
        </View>
        <View style={styles.dateInfo}>
          <Ionicons name="calendar" size={16} color="#8e8e93" />
          <Text style={styles.detailText}>{convertDate(item.trdate)}</Text>
        </View>
      </View>
    </View>
  </ScrollView>
);

export default function Component({ navigation }:{navigation:any}) {

   const { num,bntel } = useLocalSearchParams<{ num?: string, bntel?:string }>();

   const [transData, setTransData] =useState([])

   const getAllTrans = async ()=>{
      try {
         const response = await fetch(
         //  `http://192.168.99.143:9999/api/trans/filtre/${num}/${parseInt(agen ??'0')}`,
          `http://192.168.100.100:9999/api/trans/benef/${num}`,
         );

         if (response.status != 200) {
            console.log(response);
            throw new Error(`Error! status: ${response.status}`);
         }
         
         const json = await response.json();
         setTransData(json);
         
         }catch (error) {
            console.error(error);
         }
   }

   useEffect(()=>{
      getAllTrans();
   },[num,bntel])


  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Transactions</Text>
        </View>
        <FlatList
          data={transData}
          renderItem={({ item }) => <TransactionItem item={item} />}
          keyExtractor={(item:any) => item.trcode}
          contentContainerStyle={styles.listContent}
        />
      </View>
      <TouchableOpacity 
        style={styles.backButton} 
        onPress={() => router.back()} // Navigation back action
      >
        <Ionicons name="arrow-back" size={24} color="#fff" />
        <Text style={styles.backButtonText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#f0f0f0',
  },
  card: {
    backgroundColor: 'white',
    height:"100%",
    padding: 16,
   //  shadowColor: "#000",
   //  shadowOffset: { width: 0, height: 2 },
   //  shadowOpacity: 0.1,
   //  shadowRadius: 4,
   //  elevation: 3,
  },
  cardHeader: {
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  listContent: {
    paddingBottom: 16,
  },
  transactionItem: {
   flex:1,
   borderWidth: 1,
   borderColor: '#e1e1e1',
   borderRadius: 8,
   padding: 12,
   marginBottom: 12,
   //  marginRight:"auto",
   //  marginLeft:"auto",
   // width: 380, // Ensures horizontal scrolling is necessary
  },
  horizontalScrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems:'center'
  },
  transactionCodeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  transactionCodeText: {
    marginLeft: 8,
    fontSize: 12,
    color: '#8e8e93',
  },
  userRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userName: {
    marginLeft: 8,
    fontWeight: '500',
  },
  userPhone: {
    marginLeft: 8,
    fontSize: 12,
    color: '#8e8e93',
  },
  amountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  amountText: {
    fontSize: 11,
    color: '#000',
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  agencyInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    marginLeft: 4,
    fontSize: 11,
    color: '#8e8e93',
  },
  backButton: {
   position:"absolute",
   bottom:0,
   right: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007AFF',
    padding: 5,
    borderRadius: 8,
    margin: 16,
  },
  backButtonText: {
    marginLeft: 2,
    fontSize: 12,
    color: '#fff',
    fontWeight: 'bold',
  },
});
