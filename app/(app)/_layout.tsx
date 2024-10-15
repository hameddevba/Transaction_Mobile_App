import { Text, StyleSheet, View ,Button, Pressable } from 'react-native';
import { Redirect, Slot, Stack } from 'expo-router';
import { useSession } from '../authConfig/autContext';
import { Drawer } from 'expo-router/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DrawerActions, useNavigation } from '@react-navigation/native';
// import CustomDrawerContent from '@/components/customDrawerContent';



function CustomDrawerContent(props:any) {

   const { signOut } = useSession();
 
     const {bottom} = useSafeAreaInsets();
     const navigation = useNavigation();
 
     const closeDrawer = ()=>{
         navigation.dispatch(DrawerActions.closeDrawer())
         signOut()
     }
   return (
     <View
         style={{flex: 1}}
     >
       <DrawerContentScrollView {...props} scrollEnabled={false}>
         {/* <View style={{padding: 20}}>
             <Image style={{height: 35}} resizeMode='contain' source={require('../assets/images/logo.png')} />
         </View> */}
         <DrawerItemList {...props} />
       </DrawerContentScrollView>
 
       <Pressable onPress={closeDrawer} style={{
         backgroundColor: "#01a5fc",
         borderRadius: 10,
         padding: 5,
         alignItems: "center",
         marginBottom: "5.5%",
         marginLeft:23,
         width: '80%',
         }}>
         <Text>Logout</Text>
       </Pressable>
     </View>
   )
 }

export default function AppLayout() {
   
  const { session, isLoading, signOut } = useSession();

  
  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (!session) {
   
      // signOut()
      // const data = JSON.parse(session)
      // data.id
      // console.log("the JSON :"+ data.id)
      return <Redirect href="/login" />;
  }
//   else{
//    return <Redirect href='/' />
      
//   }

  // This layout can be deferred because it's not the root layout.
  return (
   // <SafeAreaView style={{ flex: 1 }}>
   //    <Slot />
   // </SafeAreaView>
   <GestureHandlerRootView style={{ flex:1 }}>
      <Drawer
            screenOptions={{
               drawerLabelStyle: {
                  marginLeft: 20
               },
               drawerActiveBackgroundColor: 'gray',
               drawerActiveTintColor: 'black',
               // drawerInactiveTintColor: 'red'
         }}
         drawerContent={CustomDrawerContent}
         // drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        <Drawer.Screen
          name="index" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: 'Home',
            title: 'Ajouter trans',
          }}
        />
        <Drawer.Screen
        
          name="trans" // This is the name of the page and must match the url from root
          options={{
            // drawerItemStyle: { display: 'none' },
            drawerLabel: 'Transaction',
            title: 'TRANSACTION',
            // headerShadowVisible:true
          }}
        />
      </Drawer>
   </GestureHandlerRootView>

  );
}


const styles = StyleSheet.create({
   container: {
     flex: 1,
   },
 });
 