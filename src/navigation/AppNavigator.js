import React from "react";
import {StyleSheet } from 'react-native';
import { navigationRef } from "./NavigationService";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PostDetails from "../screens/PostDetails";
import UserProfile from "../screens/UserProfile";
import Home from "../screens/Home";
import Post from "../screens/Post";

const Stack = createNativeStackNavigator();

function AppNavigator() {

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        screenOptions={{
          gestureEnabled: false,
        }}
      >
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Post"
          component={Post}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="PostDetails"
          component={PostDetails}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="UserProfile"
          component={UserProfile}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>)
}
export default AppNavigator;