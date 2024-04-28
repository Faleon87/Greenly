// App.js
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import LoginScreen from './screens/LoginScreen'; // Importar LoginScreen

const Stack = createStackNavigator();

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.secondImage}
          source={require('./img/Logo.png')}
          resizeMode="contain" // Asegura que la imagen se escala de manera uniforme
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.welcomeText}>Bienvenido a </Text>
        <Text style={styles.greenlyText}>Greenly</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.buttonLogin}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => { }}>
          <Text style={styles.buttonRegister}>Register</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#02907D',
    alignItems: 'center',
    justifyContent: 'flex-start', // Align items to the start of the container
  },
  imageContainer: {
    flex: 1, // Take up 1 part of the available space
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1, // Take up 1 part of the available space
    alignItems: 'center',
  },
  secondImage: {
    width: wp('50%'), // 50% of screen width
  },
  welcomeText: {
    fontSize: wp('10%'), // Adjust font size based on screen width
    fontWeight: 'bold',
    color: 'white', // Change text color
  },
  greenlyText: {
    fontSize: wp('10%'), // Adjust font size based on screen width
    fontWeight: 'bold',
    color: '#2C1001', // Change text color
  },
  button: {
    borderRadius: 5,
    marginTop: 10,
  },
  buttonLogin: {
    color: 'white',
    backgroundColor: '#2C1001',
    width: wp('50%'), // 50% of screen width
    fontSize: wp('5%'), // Adjust font size based on screen width
    borderRadius: 5,
    paddingVertical: 10, // Add vertical padding
    paddingHorizontal: 10, // Add horizontal padding
    textAlign: 'center',
  },
  buttonRegister: {
    color: 'white',
    backgroundColor: '#2C1001',
    width: wp('50%'), // 50% of screen width
    fontSize: wp('5%'), // Adjust font size based on screen width
    borderRadius: 5,
    paddingVertical: 10, // Add vertical padding
    paddingHorizontal: 10, // Add horizontal padding
    textAlign: 'center',
  },
});