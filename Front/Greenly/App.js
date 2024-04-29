// App.js
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import LoginScreen from './screens/LoginScreen';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const Stack = createStackNavigator();

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
    justifyContent: 'center',
  },
  imageContainer: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 0.5,
    alignItems: 'center',
  },
  secondImage: {
    width: wp('50%'),
    height: hp('20%'),
  },
  welcomeText: {
    fontSize: hp('3%'),
    fontWeight: 'bold',
    color: 'white',
  },
  greenlyText: {
    fontSize: hp('3%'),
    fontWeight: 'bold',
    color: '#2C1001',
  },
  button: {
    borderRadius: 5,
    marginTop: hp('2%'),
  },
  buttonLogin: {
    color: 'white',
    backgroundColor: '#2C1001',
    width: wp('50%'),
    fontSize: hp('2%'),
    borderRadius: 5,
    paddingVertical: hp('1%'),
    paddingHorizontal: wp('2%'),
    textAlign: 'center',
  },
  buttonRegister: {
    color: 'white',
    backgroundColor: '#2C1001',
    width: wp('50%'),
    fontSize: hp('2%'),
    borderRadius: 5,
    paddingVertical: hp('1%'),
    paddingHorizontal: wp('2%'),
    textAlign: 'center',
  },
});