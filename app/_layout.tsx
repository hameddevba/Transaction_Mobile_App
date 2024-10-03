import { Slot } from 'expo-router';
import { SessionProvider } from './authConfig/autContext';
import React from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout, Text } from '@ui-kitten/components';
import 'expo-dev-client';


export default function Root() {
  // Set up the auth context and render our layout inside of it.
  return (
   <ApplicationProvider {...eva} theme={eva.light}>
    <SessionProvider>
      <Slot />
    </SessionProvider>
   </ApplicationProvider>

  );
}
