import React from "react";
import { View, Text, Image, StyleSheet, Platform } from 'react-native';
import { navigationRef } from "./NavigationService";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import Home from "../components/Home";
import Profile from "../components/Profile";
import Colors from "../utils/Colors";

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "rgba(0,0,0,0.15)",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 12,
    shadowRadius: 20,
    elevation: 20
  },
  tabBarView: {
    alignItems: 'center',
    justifyContent: 'center',
    top: 10
  },
});

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const BottomTab = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: Colors.white,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          height: 60,
          paddingBottom: 20,
          style: styles.shadow,
          ...Platform.select({
            ios: {
              shadowColor: "rgba(0,0,0,0.15)",
              shadowOffset: {
                width: 0,
                height: -2,
              },
              shadowOpacity: 12,
              shadowRadius: 20,
            },
            android: {
              elevation: 20,
            }
          })
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          title: 'Home',
          tabBarIcon: ({ size, focused }) => {
            return (
              <View style={styles.tabBarView}>
                <Icon name="home" color={focused ? Colors.blue : Colors.secondary} size={25} />
                <Text style={{ color: focused ? Colors.blue : Colors.secondary, fontSize: 12, lineHeight: 18.2, textAlign: 'center' }}>{"Home"}</Text>
              </View>
            );
          },
          tabBarActiveTintColor: Colors.blue,
          tabBarInactiveTintColor: Colors.secondary
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          title: 'Profile',
          tabBarIcon: ({ size, focused }) => {
            return (
              <View style={styles.tabBarView}>
                <Icon name="user" color={focused ? Colors.blue : Colors.secondary} size={25} />
                <Text style={{ color: focused ? Colors.blue : Colors.secondary, fontSize: 12, lineHeight: 18.2, textAlign: 'center' }}>{"Profile"}</Text>
              </View>
            );
          },
          tabBarActiveTintColor: Colors.blue,
          tabBarInactiveTintColor: Colors.secondary
        }}
      />
    </Tab.Navigator>
  )
}

function AppNavigator() {

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        screenOptions={{
          gestureEnabled: false,
        }}
      >
        <Stack.Screen
          name="BottomTab"
          component={BottomTab}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>)
}
export default AppNavigator;