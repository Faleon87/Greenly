import React, { useLayoutEffect } from 'react';
import { Image, TouchableOpacity, View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import logo from '../img/Logo.png';
import plantas from '../icons/leaf.png';
import carrito from '../icons/carrito.png';
import Tienda from '../screens/Tienda';
import Carrito from '../screens/Carrito';

const Tab = createBottomTabNavigator();

const TabTienda = ({ navigation }) => {

  const setHeaderTitle = (title) => {
    navigation.setOptions({
      headerTitle: () => (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black'}}>{title}</Text>
          <Image source={logo} style={{ width: 50, height: 50, marginLeft: 20, marginBottom: 10 }} />
        </View>
      ),
    });
  };

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
        listeners={{
          focus: () => setHeaderTitle('Tienda de Greenly'),
        }}
      />
      <Tab.Screen
        name="Carrito"
        component={Carrito}
        options={{
          tabBarIcon: ({ focused, size }) => (
            <Image source={carrito} style={{
              width: size, height: size,
              tintColor: focused ? '#02907D' : '#ffff'
            }} />
          ),
          tabBarButton: (props) => (
            <TouchableOpacity {...props} />
          ),
        }}
        listeners={{
          focus: () => setHeaderTitle('Carrito'),
        }}
      />
    </Tab.Navigator>
  );
}

export default TabTienda;