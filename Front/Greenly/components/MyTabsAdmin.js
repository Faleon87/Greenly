// MyTabs.js
import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import plantas from '../icons/leaf.png';
import chat from '../icons/chat.png';
import Admin from '../screens/Admin';
import fertilizante from '../icons/fertilizante.png';
import ForoAdmin from '../screens/ForoAdmin';
import plagas from '../icons/plagas.png';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FertilizanteAdmin from '../screens/FertilizanteAdmin';
import PlagaAdmin from '../screens/PlagasAdmin';

const Tab = createBottomTabNavigator();

export function MyTabsAdmin() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#2C1001',
        },
        tabBarLabel: () => null,
      }}
    >
      <Tab.Screen
        name="PlantasAdmin"
        component={Admin}
        options={{
          tabBarIcon: ({ focused, size }) => (
            <Image source={plantas} style={{
              width: size, height: size,
              tintColor: focused ? '#02907D' : '#ffff'
            }} />
          ),
          tabBarButton: (props) => (
            <TouchableOpacity {...props} />
          ),
        }}
      />
      <Tab.Screen
        name="ForoAdmin"
        component={ForoAdmin}
        options={{
          tabBarIcon: ({ focused, size }) => (
            <Image source={chat} style={{
              width: size, height: size,
              tintColor: focused ? '#02907D' : '#ffff'
            }} />
          ),
          tabBarButton: (props) => (
            <TouchableOpacity {...props} />
          ),
        }}
      />
      <Tab.Screen
        name="FertilizanteAdmin"
        component={FertilizanteAdmin}
        options={{
          tabBarIcon: ({ focused, size }) => (
            <Image source={fertilizante} style={{
              width: size, height: size,
              tintColor: focused ? '#02907D' : '#ffff'
            }} />
          ),
          tabBarButton: (props) => (
            <TouchableOpacity {...props} />
          ),
        }}
      />
      <Tab.Screen
        name="PlagasAdmin"
        component={PlagaAdmin}
        options={{
          tabBarIcon: ({ focused, size }) => (
            <Image source={plagas} style={{
              width: size, height: size,
              tintColor: focused ? '#02907D' : '#ffff'
            }} />
          ),
          tabBarButton: (props) => (
            <TouchableOpacity {...props} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default MyTabsAdmin;