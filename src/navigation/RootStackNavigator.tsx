import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useApp, useTheme } from "../contexts";
import { RootStackParamList } from "./types";

// Screens
import LoginScreen from "../screens/LoginScreen";
import UserRegisterScreen from "../screens/UserRegisterScreen";
import DrawerNavigator from "./DrawerNavigator";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootStackNavigator() {
  const { user, isLoading } = useApp();
  const { theme } = useTheme();

  if (isLoading) {
    return null; // Or a loading screen
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: theme.colors.background,
          },
        }}
      >
        {!user ? (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="UserRegister" component={UserRegisterScreen} />
          </>
        ) : (
          <Stack.Screen name="MainDrawer" component={DrawerNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
