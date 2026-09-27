import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import LoginScreen from './src/screens/LoginScreen';
import SetLocationsScreen from './src/screens/SetLocationsScreen';
import TripReadyScreen from './src/screens/TripReadyScreen';
import RouteViewScreen from './src/screens/RouteViewScreen';

const Stack = createNativeStackNavigator();

/**
 * Root Application Component
 * 
 * Sets up:
 * 1. SafeAreaProvider for edge-to-edge layout handling on iOS and Android devices
 * 2. NavigationContainer & Native Stack Navigator with seamless screen transitions
 * 3. Waysync 4-screen flow:
 *    - Login -> SetLocations -> TripReady -> RouteView
 * 
 * STUDY NOTES FOR INTERVIEW:
 * - `createNativeStackNavigator` provides native platform transitions (iOS push/pop, Android material fade).
 * - `headerShown: false` is used because each screen renders custom Figma headers with precise brand spacing.
 */
export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerShown: false,
            animation: 'slide_from_right',
            contentStyle: { backgroundColor: '#FFFFFF' },
          }}
        >
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SetLocations" component={SetLocationsScreen} />
          <Stack.Screen name="TripReady" component={TripReadyScreen} />
          <Stack.Screen name="RouteView" component={RouteViewScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
