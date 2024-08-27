import { Text, StyleSheet } from 'react-native';
import { Redirect, Slot, Stack } from 'expo-router';
import { useSession } from '../authConfig/autContext';
import { Drawer } from 'expo-router/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as SecureStore from 'expo-secure-store';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AppLayout() {
   
  const { session, isLoading, signOut } = useSession();

  
  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (!session) {
   
      // signOut()
      //return <Redirect href="/login" />;
  }

  // This layout can be deferred because it's not the root layout.
  return (
   <SafeAreaView style={{ flex: 1 }}>
      <Slot />
   </SafeAreaView>
   // <GestureHandlerRootView style={{ flex: 1 }}>
   //    <Drawer />
   //  </GestureHandlerRootView>

  );
}


const styles = StyleSheet.create({
   container: {
     flex: 1,
   },
 });
 