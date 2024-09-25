import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Modal, Pressable, Alert} from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function TransactionCard() {
   const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
         <View style={styles.card}>
            <View style={styles.header}>
               <Text style={styles.title}>Transaction Details</Text>
            </View>
            <View style={styles.content}>
               <View style={styles.userSection}>
                  <View style={styles.user}>
                  <Image
                     source={{ uri: 'http://192.168.100.100:9999/api/trans/image/1141336' }}
                     style={styles.avatar}
                  />
                  <View>
                     <Text style={styles.name}>John Doe</Text>
                     <Text style={styles.role}>Sender</Text>
                  </View>
                  </View>
                  <Feather name="arrow-right" size={24} color="#6b7280" />
                  <View style={[styles.user, styles.alignRight]}>
                  <View>
                     <Text style={styles.name}>Jane Smith</Text>
                     <Text style={styles.role}>Receiver</Text>
                  </View>
                  <Image
                     source={{ uri: 'http://192.168.100.100:9999/api/trans/image/1141336' }}
                     style={styles.avatar}
                  />
                  </View>
               </View>
               
               <View style={styles.amountSection}>
                  <View>
                  <Text style={styles.amountLabel}>Sent</Text>
                  <View style={styles.amountContainer}>
                     <Feather name="dollar-sign" size={18} color="#10b981" />
                     <Text style={styles.amount}>100.00</Text>
                  </View>
                  </View>
                  <View style={styles.alignRight}>
                  <Text style={styles.amountLabel}>Received</Text>
                  <View style={styles.amountContainer}>
                     <Feather name="user" size={18} color="#3b82f6" />
                     <Text style={styles.amount}>92.34</Text>
                  </View>
                  </View>
               </View>
               
               <Image
                  source={{ uri: 'http://192.168.100.100:9999/api/trans/image/1141336' }}
                  style={styles.evidenceImage}
               />
               
               <View style={styles.footer}>
                  <View style={styles.badge}>
                  <Text style={styles.badgeText}>Transaction ID: #123456</Text>
                  </View>
                  <Text style={styles.timestamp}>2023-04-15 14:30 UTC</Text>
               </View>
            </View>
         </View>
      </Modal>
      <Pressable
            style={[styles.button, styles.buttonOpen]}
            onPress={() => setModalVisible(true)}>
            <Text style={styles.textStyle}>Show Modal</Text>
         </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
  },
  content: {
    padding: 16,
  },
  userSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  user: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  role: {
    fontSize: 14,
    color: '#6b7280',
  },
  alignRight: {
    alignItems: 'flex-end',
  },
  amountSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  amountLabel: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  amount: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 4,
    color: '#111827',
  },
  evidenceImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  badge: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 16,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  badgeText: {
    fontSize: 12,
    color: '#6b7280',
  },
  timestamp: {
    fontSize: 12,
    color: '#6b7280',
  },
  button: {
   borderRadius: 20,
   padding: 10,
   elevation: 2,
 },
 buttonOpen: {
   backgroundColor: '#F194FF',
 },
 buttonClose: {
   backgroundColor: '#2196F3',
 },
 textStyle: {
   color: 'black',
   fontWeight: 'bold',
   textAlign: 'center',
 },
});