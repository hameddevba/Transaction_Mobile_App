import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, TouchableOpacity, Modal, Button, ActivityIndicator } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router, useLocalSearchParams } from 'expo-router';
import { convertDate } from '../../utils/timeConvert';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import { Image } from 'expo-image';
import { fetchURL } from '@/constants/fetchUrl';
import { useSession } from '../authConfig/autContext';



 
const TransactionItem = ({ item }:{item:any}) =>{
   
   const [modalVisible, setModalVisible] = useState(false);
   const [modalImage, setModalImage] = useState(false);

   const handleViewImage = ()=>{
      setModalVisible(false);
      setModalImage(true);
   };

   const handleTakePicture = async (code:String) => {
      // Close the modal
      setModalVisible(false);
      // setModalImage(true)
      // Open the camera
      // Here you would use your camera functionality
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status === 'granted') {
        let result = await ImagePicker.launchCameraAsync({
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
        if (!result.canceled) {
         try {
            const response = await FileSystem.uploadAsync(`${fetchURL}/api/trans/image-upload/${code}`, result.assets[0].uri, {
              fieldName: 'file',
              httpMethod: 'PATCH',// The field name that the server expects
              mimeType: result.assets[0].mimeType,
              uploadType: FileSystem.FileSystemUploadType.MULTIPART,
            });
            console.log(JSON.stringify(response, null, 4));
          } catch (error) {
            console.log(error);
          };
        }
      }
    };

    const handlePickPicture = async (code:String) => {
      // Close the modal
      setModalVisible(false);
      // Use ImagePicker to pick an image from the gallery
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        base64:true,
      });

      if (!result.canceled) {
      
        try {
         const response = await FileSystem.uploadAsync(`${fetchURL}/api/trans/image-upload/${code}`, result.assets[0].uri, {
           fieldName: 'file',
           httpMethod: 'PATCH',// The field name that the server expects
           mimeType: result.assets[0].mimeType,
           uploadType: FileSystem.FileSystemUploadType.MULTIPART,
         });
         console.log(JSON.stringify(response, null, 4));
       } catch (error) {
         console.log(error);
       }

   
      }
    };

    return (
      <View>
        <ScrollView horizontal contentContainerStyle={styles.horizontalScrollContent}>
            <TouchableOpacity onPress={() => setModalVisible(true)} style={{ flex: 1 }}>
               <View style={styles.transactionItem}>
                  <View style={styles.transactionCodeRow}>
                  <Ionicons name="barcode" size={16} color="#8e8e93" />
                  <Text style={styles.transactionCodeText}>Transaction Code: {item.trcode}</Text>
                  </View>
                  <View style={styles.userRow}>
                  <View style={styles.userInfo}>
                     <Ionicons name="person" size={20} color="#50c878" />
                     <View>
                        <Text style={styles.userName}>Beneficier</Text>
                        <Text style={styles.userName}>
                        {item.benef.bnpre} {item.benef.bnnom} (Code: {item.benef.bncode})
                        </Text>
                        <Text style={styles.userPhone}>{item.benef.bntel}</Text>
                     </View>
                  </View>
                  </View>
                  <View style={styles.amountRow}>
                  <Text style={styles.amountText}>
                     Receveur Montant: {item.trmone.toFixed(2)} {item.trdeven}
                  </Text>
                  </View>
                  <View style={styles.detailsRow}>
                  <View style={styles.agencyInfo}>
                     <Ionicons name="business" size={16} color="#8e8e93" />
                     <Text style={styles.detailText}>{item.tragen}</Text>
                  </View>
                  <View style={styles.dateInfo}>
                     <Ionicons name="calendar" size={16} color="#8e8e93" />
                     <Text style={styles.detailText}>{convertDate(item.trdatcr)}</Text>
                  </View>
                  </View>
               </View>
            </TouchableOpacity>
         </ScrollView>

         <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
         >
            <View style={styles.modalContainer}>
               <View style={styles.modalContent}>
                  {item.travis !="" ?
                     <Ionicons 
                        name="eye" 
                        size={30} 
                        color="black" 
                        onPress={handleViewImage} // Create this function for viewing the image
                     />
                     :""
                  }
                  {/* Icon for taking a picture */}
                  <Ionicons 
                     name="camera" 
                     size={30} 
                     color="black" 
                     onPress={()=>handleTakePicture(item.trcode)} 
                  />

                  {/* Icon for picking a picture */}
                  <Ionicons 
                     name="image" 
                     size={30} 
                     color="black" 
                     onPress={() => handlePickPicture(item.trcode)} 
                  />

                  {/* Icon for cancel */}
                  <Ionicons 
                     name="close" 
                     size={30} 
                     color="red" 
                     onPress={() => setModalVisible(false)} 
                  />
               </View>
            </View>
         </Modal>
         <Modal
            animationType="slide"
            transparent={true}
            visible={modalImage}
            onRequestClose={() => setModalVisible(false)}
         >
            <View style={styles.modalContainer}>
               <View style={styles.modalContentImg}>
               <View style={{flexDirection:'column', width:'100%'}}>
                  <Image
                     source={{ uri: `${fetchURL}/api/trans/image/${item.trcode}` }}
                     cachePolicy='none'
                     // source={{ uri: `http://192.168.100.100:9999/api/trans/image/1141336` }}
                     style={styles.evidenceImage}
                  />
                  <Button title="Hide" onPress={()=>setModalImage(false)} />
               </View>
               </View>
            </View>
         </Modal>
      </View>

)};

export default function Component() {

   
   const { session } = useSession();
   


   const { bntel } = useLocalSearchParams();

   const [transData, setTransData] =useState([])
   const [isloading ,setIsloading]= useState(false)

   const getAllTrans = async ()=>{
      let user_id:any;

      if(session){
         user_id = JSON.parse(session)
      }
      console.log( "trans user id : "+ user_id.id);


      setIsloading(false)
      try {
         const response = await fetch(
         //  `http://192.168.99.143:9999/api/trans/filtre/${num}/${parseInt(agen ??'0')}`,
          `${fetchURL}/api/trans/env/${user_id.id}`,
          {
            method: 'GET',
            headers: {
              'Authorization': user_id.tokenType+" "+user_id.accessToken, // You can add your token here if needed
              'Content-Type': 'application/json'
            }
         }
         );

         if (response.status != 200) {
            console.log(response);
            throw new Error(`Error! status: ${response.status}`);
         }

         const json = await response.json();
         // console.log(json)
         if(json){
            setIsloading(true)
         }
         setTransData(json);

         }catch (error) {
            console.error(error);
         }
   }

   useEffect(()=>{
      getAllTrans();
      console.log(session)

   },[bntel])



  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {/* <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Transactions</Text>
        </View> */}
        {isloading ?
         <FlatList
            data={transData}
            renderItem={({ item }:{item:any}) => <TransactionItem item={item} />}
            keyExtractor={(item:any) => item.trcode}
            contentContainerStyle={styles.listContent}
         />
         :
         <View style={[styles.containerIndicator, styles.horizontal]}>
            <ActivityIndicator size="large" />
         </View>
        
        }
        
      </View>
      {
         isloading ?
         <TouchableOpacity
         style={styles.backButton}
         onPress={() => getAllTrans()} // Navigation back action
       >
         <Ionicons name="refresh" size={30} color="#fff" />
       </TouchableOpacity>
       :""
      }
     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#f0f0f0',
  },
  containerIndicator: {
   flex: 1,
   justifyContent: 'center',
 },
 horizontal: {
   flexDirection: 'row',
   justifyContent: 'space-around',
   padding: 10,
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
  modalContainer: {
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center',
   backgroundColor: 'rgba(0,0,0,0.5)',
 },
 modalContent: {
   backgroundColor: 'white',
   padding: 10,
   borderRadius: 10,
   flexDirection:'row',
   justifyContent:'space-between',
   alignItems: 'center',
   // height:80,
   width:'60%',
   shadowColor: '#000',
   shadowOffset: { width: 0, height: 2 },
   shadowOpacity: 0.25,
   shadowRadius: 4,
 },
 modalContentImg: {
   backgroundColor: 'white',
   padding: 10,
   borderRadius: 10,
   flexDirection:'row',
   justifyContent:'space-between',
   alignItems: 'center',
   // height:80,
   width:'90%',
   shadowColor: '#000',
   shadowOffset: { width: 0, height: 2 },
   shadowOpacity: 0.25,
   shadowRadius: 4,
 },
 evidenceImage: {
   width: '100%',
   height: 200,
   borderRadius: 8,
   marginBottom: 16,
 },
});
