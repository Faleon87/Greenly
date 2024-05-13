import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import image1 from '../img/dondeComenzar.png';
import iconImage from '../img/placeholder.png';
import image2 from '../img/solucionesEcologicas.jpg';
import homeIcon from '../icons/home.png'; // Asegúrate de reemplazar esto con la ruta correcta a tu archivo de icono

function Pantalla() {
  const navigation = useNavigation();
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.text}>Donde Comenzar?</Text>
      <TouchableOpacity onPress={() => navigation.navigate('MapsScreen')}>
        <Image source={image1} style={styles.image} />
        <Image source={iconImage} style={styles.icon} />
      </TouchableOpacity>
      <Text style={styles.text}>Soluciones ecologicas?</Text>
      <TouchableOpacity onPress={() => navigation.navigate('MapsScreen')}>
        <Image source={image2} style={styles.image} />
      </TouchableOpacity>
    </ScrollView>
  );
}

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator 
      screenOptions={{ 
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#2C1001', // Color de fondo de la barra de navegación
        },
        tabBarLabel: () => null, // Oculta los nombres de las pestañas
      }}
    >
      <Tab.Screen
        name="Home"
        component={Pantalla}
        options={{
          tabBarIcon: ({ focused, size }) => (
            <Image source={homeIcon} style={{ width: size, height: size,
              tintColor: focused ? '#02907D' : '#ffff'
            }} />
          ),
        }}
      />
      <Tab.Screen name="Settings" component={Pantalla} />
    </Tab.Navigator>
  );
}
export default MyTabs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#02907D',
  },
  text: {
    fontSize: hp('3%'),
    textAlign: 'center',
    marginTop: hp('2%'),
    marginBottom: hp('2%'),
    color: "#2C1001",
  },
  image: {
    width: wp('95%'),
    height: wp('35%'), // Reduce esto para que las imágenes sean más pequeñas
    borderRadius: wp('2%'),
    marginBottom: hp('2%'),
    padding: wp('2%'),
    borderWidth: 4,
    borderColor: 'black',
    alignSelf: 'center', // Asegura que la imagen esté centrada
  },
  icon: {
    position: 'absolute',
    left: 70,
    top: 70,
    width: wp('10%'),
    height: wp('10%'),
  },
});