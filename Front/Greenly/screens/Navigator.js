import homeIcon from '../icons/home.png';
import plantasIcon from '../icons/leaf.png';
import chatForm from '../icons/chat.png';
import calend from '../icons/calendario.png';
import fertilizante from '../icons/fertilizante.png';
import cameraIcon from '../icons/camera.png';
import { identifyPlant } from '../api/cameraPlants';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

export function MyTabs({ selectImage }) {
    const navigation = useNavigation();
    const Tab = createBottomTabNavigator();
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
            headerStyle: { backgroundColor: '#2C1001' }, // Reemplaza '#YOUR_COLOR' con el color que desees
            headerTitle: '', // Esto quita el texto
            tabBarIcon: ({ focused, size }) => (
              <Image source={homeIcon} style={{
                width: size, height: size,
                tintColor: focused ? '#02907D' : '#ffff'
              }} />
            ),
          }}
        />
        <Tab.Screen
          name="Plantas"
          component={Pantalla}
          options={{
            tabBarIcon: ({ focused, size }) => (
              <Image source={plantasIcon} style={{
                width: size, height: size,
                tintColor: focused ? '#02907D' : '#ffff'
              }} />
            ),
            tabBarButton: (props) => (
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

  export async function selectImage() {
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
  }