import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View, Image, Pressable, Dimensions, Platform } from 'react-native';
import LoginScreen from './screens/LoginScreen';
import Register from './screens/Register';
import MapsScreen from './screens/MapScreen';
import MyTabs from './components/MyTabs';
import MyTabsAdmin from './components/MyTabsAdmin';
import Plantas from './screens/Plantas';
import FormForo from './screens/FormForo';
import DetallePlanta from './screens/DetallePlanta';
import Fertilizante from './screens/Fertilizantes';
import EditProfileScreen from './screens/User';
import Form from './screens/Form';
import DetallePlagas from './screens/DetallePlagas';
import DetalleFertilizantes from './screens/DetalleFertilizantes';
import TabTienda from './components/TabTienda';
import PagarConTarjeta from './screens/PagarTarjeta';
import AddPlant from './screens/AddPlant';
import AddFertilizante from './screens/AddFertilizante';

const Stack = createStackNavigator();
const { width, height } = Dimensions.get('window');

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.secondImage}
          source={require('./img/Logo.png')}
          resizeMode="contain"
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.welcomeText}>Bienvenido a </Text>
        <Text style={styles.greenlyText}>Greenly</Text>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.buttonLogin}>Login</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => { navigation.navigate('Register') }}>
          <Text style={styles.buttonRegister}>Register</Text>
        </Pressable>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

function LoginScreenWithHeader({ navigation }) {
  React.useEffect(() => {
    navigation.setOptions({
      headerTitle: '', 
      headerStyle: {
        backgroundColor: 'white',
      }
    });
  }, [navigation]);

  return <LoginScreen navigation={navigation} />;
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreenWithHeader} />
        <Stack.Screen
          name="Pantalla"
          component={MyTabs}
          options={{
            headerStyle: {
              backgroundColor: '#02907D',
            },
          }}
        />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="MapsScreen" component={MapsScreen} />
        <Stack.Screen name="Admin" component={MyTabsAdmin} />
        <Stack.Screen name="Form" component={Form} />
        <Stack.Screen name="Plantas" component={Plantas} />
        <Stack.Screen name="DetallePlanta" component={DetallePlanta} />
        <Stack.Screen name="FormForo" component={FormForo} options={{
          headerStyle: {
            backgroundColor: '#02907D',
          },
          headerTitle: 'Foro',
        }} />
        <Stack.Screen name="Fertilizante" component={Fertilizante} />
        <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
        <Stack.Screen name="DetallePlagas" component={DetallePlagas} />
        <Stack.Screen name="DetalleFertilizantes" component={DetalleFertilizantes} />
        <Stack.Screen name="Tienda" component={TabTienda} />
        <Stack.Screen name="PagarConTarjeta" component={PagarConTarjeta} />
        <Stack.Screen name="AddPlant" component={AddPlant} />
        <Stack.Screen name="AddFertilizante" component={AddFertilizante} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#02907D',
    alignItems: 'center',
    justifyContent: 'center',
    padding: Platform.OS === 'web' ? '5vw' : width * 0.05, // Usa unidades relativas en la web
  },
  imageContainer: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 0.5,
    alignItems: 'center',
  },
  secondImage: {
    width: Platform.OS === 'web' ? '50vw' : width * 0.5, // Usa unidades relativas en la web
    height: Platform.OS === 'web' ? '20vh' : height * 0.2, // Usa unidades relativas en la web
  },
  welcomeText: {
    fontSize: Platform.OS === 'web' ? '4vw' : height * 0.04, // Usa unidades relativas en la web
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  greenlyText: {
    fontSize: Platform.OS === 'web' ? '4vw' : height * 0.04, // Usa unidades relativas en la web
    fontWeight: 'bold',
    color: '#2C1001',
    textAlign: 'center',
  },
  button: {
    borderRadius: 5,
    marginTop: Platform.OS === 'web' ? '2vh' : height * 0.02, // Usa unidades relativas en la web
  },
  buttonLogin: {
    backgroundColor: '#8FD053',
    color: '#2C1001',
    width: Platform.OS === 'web' ? '60vw' : width * 0.6, // Usa unidades relativas en la web
    fontSize: Platform.OS === 'web' ? '2.5vw' : height * 0.025, // Usa unidades relativas en la web
    borderRadius: 5,
    paddingVertical: Platform.OS === 'web' ? '1vh' : height * 0.01, // Usa unidades relativas en la web
    textAlign: 'center',
  },
  buttonRegister: {
    backgroundColor: '#2C1001',
    color: 'white',
    width: Platform.OS === 'web' ? '60vw' : width * 0.6, // Usa unidades relativas en la web
    fontSize: Platform.OS === 'web' ? '2.5vw' : height * 0.025, // Usa unidades relativas en la web
    borderRadius: 5,
    paddingVertical: Platform.OS === 'web' ? '1vh' : height * 0.01, // Usa unidades relativas en la web
    textAlign: 'center',
  },
  backButtonImage: {
    width: Platform.OS === 'web' ? '10vw' : width * 0.1, // Usa unidades relativas en la web
    height: Platform.OS === 'web' ? '5vh' : height * 0.05, // Usa unidades relativas en la web
    marginLeft: Platform.OS === 'web' ? '2vw' : width * 0.02, // Usa unidades relativas en la web
  },
});
