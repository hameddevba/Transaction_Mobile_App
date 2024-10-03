import { Text, StyleSheet, Button } from 'react-native';
import { Redirect, Slot, Stack } from 'expo-router';
import { useSession } from '../authConfig/autContext';
import { Drawer } from 'expo-router/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';


function CustomDrawerContent({ navigation }:{navigation :any}) {
   return (
     <Button
       title="Go somewhere"
       onPress={() => {
         // Navigate using the `navigation` prop that you received
         navigation.navigate('SomeScreen');
       }}
     />
   );
 }

export default function AppLayout() {
   
  const { session, isLoading, signOut } = useSession();

  
  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (!session) {
   
      // signOut()
      return <Redirect href="/login" />;
  }

  // This layout can be deferred because it's not the root layout.
  return (
   // <SafeAreaView style={{ flex: 1 }}>
   //    <Slot />
   // </SafeAreaView>
   <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
      
      screenOptions={{
         drawerType:  'slide',
         drawerHideStatusBarOnOpen:true

       }}
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
            drawerItemStyle: { display: 'none' },
            drawerLabel: 'Transaction',
            title: 'TRANSACTION',
            headerShadowVisible:true
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
 