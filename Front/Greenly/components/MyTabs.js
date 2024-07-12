import React, { useLayoutEffect } from 'react';
import { Image, TouchableOpacity, View, Text, Alert } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import homeIcon from '../icons/home.png';
import plantasIcon from '../icons/leaf.png';
import plagasIcon from '../icons/plagas.png';
import calend from '../icons/calendario.png';
import fertilizante from '../icons/fertilizante.png';
import cameraIcon from '../icons/camera.png';
import Pantalla from '../screens/Pantalla';
import Plantas from '../screens/Plantas';
import Plagas from '../screens/Plagas';
import { identifyPlant } from '../api/cameraPlants';
import * as ImagePicker from 'expo-image-picker';
import Calendar from '../screens/ScreenCalendar';
import Fertilizantes from '../screens/Fertilizantes';
import { useNavigation } from '@react-navigation/native';
import logo from '../img/Logo.png';

export function MyTabs() {
  const navigation = useNavigation();

  const setHeaderTitle = (title) => {
    navigation.setOptions({
      headerTitle: () => (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ fontSize: 25,  color: '#F0F0F0' }}>{title}</Text>
        </View>
      ),
    });
  };

  const selectImage = async () => {
    const { status: libraryStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();

    if (libraryStatus !== 'granted' || cameraStatus !== 'granted') {
      alert('Necesitamos permisos para acceder a la cámara y a la galería');
      return;
    }

    const useCamera = await askUserCameraOrLibrary();

    let result;
    if (useCamera) {
      result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
    } else {
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
    }

    if (result && !result.canceled) {
      if (result.assets[0] && result.assets[0].uri) {
        identifyPlant(result.assets[0].uri);
      }
    }
  };

  const askUserCameraOrLibrary = async () => {
    return new Promise((resolve) => {
      Alert.alert(
        'Seleccionar imagen',
        '¿Quieres usar la cámara o la biblioteca de imágenes?',
        [
          {
            text: 'Cámara',
            onPress: () => resolve(true),
          },
          {
            text: 'Biblioteca',
            onPress: () => resolve(false),
          },
        ],
        { cancelable: false },
      );
    });
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
        listeners={{
          focus: () => setHeaderTitle(''),
        }}
      />
      <Tab.Screen
        name="Plantas"
        component={Plantas}
        options={{
          tabBarIcon: ({ focused, size }) => (
            <Image source={plantasIcon} style={{
              width: size, height: size,
              tintColor: focused ? '#02907D' : '#ffff'
            }} />
          ),
          tabBarButton: (props) => (
            <TouchableOpacity {...props} />
          ),
        }}
        listeners={{
          focus: () => setHeaderTitle('Plantas'),
        }}
      />
      <Tab.Screen
        name="Plagas"
        component={Plagas}
        options={{
          tabBarIcon: ({ focused, size }) => (
            <Image source={plagasIcon} style={{
              width: size, height: size,
              tintColor: focused ? '#02907D' : '#ffff'
            }} />
          ),
          tabBarButton: (props) => (
            <TouchableOpacity {...props} />
          ),
        }}
        listeners={{
          focus: () => setHeaderTitle('Plagas'),
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
        listeners={{
          focus: () => setHeaderTitle('Camera'),
        }}
      />
      <Tab.Screen
        name="Fertilizante"
        component={Fertilizantes}
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
        listeners={{
          focus: () => setHeaderTitle('Fertilizante'),
        }}
      />
      <Tab.Screen
        name="Calendar"
        component={Calendar}
        options={{
          tabBarIcon: ({ focused, size }) => (
            <Image source={calend} style={{
              width: size, height: size,
              tintColor: focused ? '#02907D' : '#ffff'
            }} />
          ),
          tabBarButton: (props) => (
            <TouchableOpacity {...props} />
          ),
        }}
        listeners={{
          focus: () => setHeaderTitle('Calendario'),
        }}
      />
    </Tab.Navigator>
  );
}

export default MyTabs;