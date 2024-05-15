import React from 'react';
import { Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import image1 from '../img/dondeComenzar.png';
import iconImage from '../img/placeholder.png';
import image2 from '../img/solucionesEcologicas.jpg';
import homeIcon from '../icons/home.png';
import plantasIcon from '../icons/leaf.png';
import chatForm from '../icons/chat.png';
import calend from '../icons/calendario.png';
import fertilizante from '../icons/fertilizante.png';
import cameraIcon from '../icons/camera.png';
import { identifyPlant } from '../api/cameraPlants';
import * as ImagePicker from 'expo-image-picker';

function Pantalla() {
  const navigation = useNavigation();
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.text}>Donde Comenzar?</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Screen1')}>
        <Image source={image1} style={styles.image} />
        <Image source={iconImage} style={styles.icon} />
      </TouchableOpacity>
      <Text style={styles.text}>Soluciones ecologicas?</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Screen2')}>
        <Image source={image2} style={styles.image} />
      </TouchableOpacity>
    </ScrollView>
  );
}

function App() {
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
      identifyPlant(result.assets[0].uri);
    }
  };

  return <MyTabs selectImage={selectImage} />;
}




const Tab = createBottomTabNavigator();

function MyTabs({ selectImage }) {

  const navigation = useNavigation();
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
            <Image source={homeIcon} style={{
              width: size, height: size,
              tintColor: focused ? '#02907D' : '#ffff'
            }} />
          ),
        }}
      />
      <Tab.Screen name="Plantas"
        component={Pantalla}
        options={{
          tabBarIcon: ({ focused, size }) => (
            <Image source={plantasIcon} style={{
              width: size, height: size,
              tintColor: focused ? '#02907D' : '#ffff'
            }} />
          ), tabBarButton: (props) => (
            <TouchableOpacity
              {...props}
              onPress={() => navigation.navigate('Plantas')}
            />
          ),
        }}
      />
      <Tab.Screen name="Form"
        component={Pantalla}
        options={{
          tabBarIcon: ({ focused, size }) => (
            <Image source={chatForm} style={{
              width: size, height: size,
              tintColor: focused ? '#02907D' : '#ffff'
            }} />
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
              onPress={selectImage} // Añade la función selectImage aquí
              style={{
                position: 'absolute',
                top: '-100%', // Ajusta esto para mover el botón hacia arriba o hacia abajo
                left: '50%', // Centra el botón horizontalmente
                transform: [{ translateX: -wp("7.5%") }], // Desplaza el botón a la izquierda en la mitad de su ancho para centrarlo correctamente
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 35,
                width: wp("15%"), // Esto hace que el botón sea redondo
                height: wp("15%"), // Esto hace que el botón sea redondo
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
        }}
      />
    </Tab.Navigator>
  );
}

export default App;


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