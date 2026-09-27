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
 * Sets up SafeAreaProvider, NavigationContainer, and Native Stack Navigator
 * for the 4-screen flow: Login -> SetLocations -> TripReady -> RouteView
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
