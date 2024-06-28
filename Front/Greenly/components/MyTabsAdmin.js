// MyTabs.js
import React from 'react';
import { Image, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import plantas from '../icons/leaf.png';
import Chat from '../icons/chat.png';
import Admin from '../screens/Admin';
import ForoAdmin from '../screens/ForoAdmin';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

export function MyTabsAdmin() {
  const navigation = useNavigation();
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
      <Image source={Chat} style={{
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