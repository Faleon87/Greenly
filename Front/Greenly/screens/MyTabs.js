// MyTabs.js
import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import homeIcon from '../icons/home.png';
import plantasIcon from '../icons/leaf.png';
import chatForm from '../icons/chat.png';
import calend from '../icons/calendario.png';
import fertilizante from '../icons/fertilizante.png';
import cameraIcon from '../icons/camera.png';
import Pantalla from '../screens/Pantalla';
import Plantas from '../screens/Plantas';
import { identifyPlant } from '../api/cameraPlants';
import * as ImagePicker from 'expo-image-picker';

 // Asegúrate de que la ruta al archivo Pantalla.js sea correcta


export function MyTabs() {
  const navigation = useNavigation();

  const selectImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      alert('Necesitamos permisos para acceder a tus fotos.');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (result && !result.cancelled) {
      if(result.assets[0] && result.assets[0].uri){
        identifyPlant(result.assets[0].uri);
      }
    }
  };

const Tab = createBottomTabNavigator();
  
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
  name="Home"
  component={Pantalla}
  options={{
    tabBarIcon: ({ focused, size }) => (
      <Image source={homeIcon} style={{
        width: size, height: size,
        tintColor: focused ? '#02907D' : '#ffff'
      }} />
    ),
    tabBarButton: (props) => (
      <TouchableOpacity {...props} />
    ),
  }}
/>
      <Tab.Screen name="Plantas" component={Plantas}
        options={{
          tabBarIcon: ({ focused, size }) => (
            <Image source={plantasIcon} style={{
              width: size, height: size,
              tintColor: focused ? '#02907D' : '#ffff'
            }} />
          ), tabBarButton: (props) => (
            <TouchableOpacity
              {...props}
            />
          ),
        }}
      />
      <Tab.Screen name="Form" component={Pantalla}
        options={{
          tabBarIcon: ({ focused, size }) => (
            <Image source={chatForm} style={{
              width: size, height: size,
              tintColor: focused ? '#02907D' : '#ffff'
            }} />
          ),
          tabBarButton: (props) => (
            <TouchableOpacity
              {...props}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Camera"
        component={Pantalla}
        options={{
          tabBarIcon: ({ focused, size }) => (
            <Image source={cameraIcon} style={{
              width: size, height: size,
              tintColor: focused ? '#02907D' : '#ffff'
            }} />
          ),
          tabBarButton: (props) => (
            <TouchableOpacity
              {...props}
              onPress={selectImage}
              style={{
                position: 'absolute',
                top: '-100%',
                left: '50%',
                transform: [{ translateX: -wp("7.5%") }],
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 35,
                width: wp("15%"),
                height: wp("15%"),
                backgroundColor: '#2C1001',
              }}
            >
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen name="Calendar"
      component={Pantalla}
        options={{
          tabBarIcon: ({ focused, size }) => (
            <Image source={calend} style={{
              width: size, height: size,
              tintColor: focused ? '#02907D' : '#ffff'
            }} />
          ),
          tabBarButton: (props) => (
            <TouchableOpacity
              {...props}
            />
          ),
        }}
      />
      <Tab.Screen name="Fertilizante"
      component={Pantalla}
        options={{
          tabBarIcon: ({ focused, size }) => (
            <Image source={fertilizante} style={{
              width: size, height: size,
              tintColor: focused ? '#02907D' : '#ffff'
            }} />
          ),
          tabBarButton: (props) => (
            <TouchableOpacity
              {...props}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default MyTabs;