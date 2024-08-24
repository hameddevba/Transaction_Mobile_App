import { Text } from 'react-native';
import { Redirect, Stack } from 'expo-router';
import { useSession } from '../authConfig/autContext';
import { Drawer } from 'expo-router/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as SecureStore from 'expo-secure-store';

export default function AppLayout() {
   
  const { session, isLoading } = useSession();

  // You can keep the splash screen open, or render a loading screen like we do here.
  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  // Only require authentication within the (app) group's layout as users
  // need to be able to access the (auth) group and sign in again.
  if (!session) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    
   //  const getMovies = async () => {
   //    await SecureStore.deleteItemAsync(session)
   //  };

   //  getMovies();
   // console.log(session);
  
   //  return <Redirect href="/login" />;
  }

  // This layout can be deferred because it's not the root layout.
  return (
   // <Stack
   //    screenOptions={{
   //    headerStyle: {
   //       backgroundColor: '#f4511e',
   //    },
   //    headerTintColor: '#fff',
   //    headerTitleStyle: {
   //       fontWeight: 'bold',
   //    },
   //    }}>
   //    {/* Optionally configure static options outside the route.*/}
   //    <Stack.Screen name="index" options={{}} />
   // </Stack>
   <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer />
    </GestureHandlerRootView>
  );
}
