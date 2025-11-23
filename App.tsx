import React from 'react';
import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider, AppProvider } from './src/contexts';
import { RootStackNavigator } from './src/navigation';

export default function App() {
  return (
    <ThemeProvider>
      <AppProvider>
        <StatusBar style="auto" />
        <RootStackNavigator />
      </AppProvider>
    </ThemeProvider>
  );
}

