// MyTabs.js
import React from 'react';
import { Image, TouchableOpacity} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import plantas from '../icons/leaf.png';
import  Tienda from '../screens/Tienda';

const Tab = createBottomTabNavigator();

export function TabTienda() {
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
  name="Comprar"
  component={Tienda}
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

    
    </Tab.Navigator>
    );
}

export default TabTienda;