import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, Image, TouchableOpacity, ScrollView, View, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import image1 from '../img/tiendaOnline.jpeg';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import { fetchWeather } from '../api/weather';
import sunnyImage from '../img/sunny.png';
import cloudyImage from '../img/cloudy.png';
import rainyImage from '../img/rainy.png';
import snowyImage from '../img/snowy.png';
import mistyImage from '../img/misty.png';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import { Settings } from 'react-native';



function Pantalla({route}) {
  const [username, setUsername] = useState('');
  const [img, setImg] = useState('');
  const [weather, setWeather] = useState();
  const navigation = useNavigation();

  


  const weatherIconName = {
    'Sunny': sunnyImage,
    'Partly cloudy': cloudyImage,
    'Rain': rainyImage,
    'Snow': snowyImage,
    'Mist': mistyImage,
    // add more mappings as needed
  };

  useEffect(() => {
    const fetchUsername = async () => {
      const storedUsername = await AsyncStorage.getItem('nombre');
      setUsername(storedUsername);
    };

    const fetchImg = async () => {
      const storedImg = await AsyncStorage.getItem('img');
      setImg(storedImg);
    };

    const getWeather = async () => {
      try {
        const data = await fetchWeather();
        setWeather(data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchRespuesta = async () => {
      const storedRespuesta = await AsyncStorage.getItem('respuesta');
      console.log(storedRespuesta);
    };

    getWeather();
    fetchImg();
    fetchUsername();
    fetchRespuesta();
    
  }, []);

  if (!weather) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Loading...</Text>
      </View>
    );
  }

  

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Form')}>
      <Icon2 name="send" size={30} color="white" style={{
        textShadowColor: 'black',
        left: 160,
        textShadowOffset: {width: -2, height: 2},
        textShadowRadius: 3
      }} />
      </TouchableOpacity>

      <ScrollView>
        <View style={styles.header}>
          <View style={styles.welcomeContainer}>
            <Text style={styles.welcome}>Bienvenido ,</Text>
            <Text style={styles.username}>{username}</Text>
          </View>
          <Image source={img ? { uri: img } : null} style={styles.profileImage} />
          <Icon name="cog" size={30} color="#000" style={styles.settingsIcon} onPress={()=> navigation.navigate('EditProfileScreen') }   />
        </View>
        <Animatable.View
          animation="fadeInUpBig"
          duration={2000}
          style={styles.weatherCard}
        >
          <Image source={weatherIconName[weather.current.condition.text]} style={styles.weatherImage} />
          <View style={styles.weatherData}>
          <Text style={styles.cityText}>{weather.location.name}</Text>
            <Text style={styles.temperatureText}>Temperature: {weather.current.temp_c}°C</Text>
            <Text style={styles.humidityText}>Humidity: {weather.current.humidity}%</Text>
          </View>
        </Animatable.View>
        <Text style={styles.marketingText}>¡Visita Nuestra Tienda Online!</Text>
        <Image source={image1} style={styles.image} />
        <TouchableOpacity onPress={() => navigation.navigate('')}>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

export default Pantalla;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#02907D',
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingsIcon: {
    left: 10,
    color: 'black',
  },
  marketingText: {
    fontSize: 20,
    color: '#000',
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  cityText: {
    fontSize: 20,
    color: '#000',
    fontWeight: 'bold',
    marginBottom: 2,
  },
  iconForm: {
    left: 160,
    color: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 10,
  },
  welcomeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  welcome: {
    fontSize: hp('3%'),
    right : 13,
    color: "white",
  },
  username: {
    fontSize: hp('3%'),
    color: "#2C1001",
    right: 10,
    fontWeight: 'bold',
  },
  profileImage: {
    width: wp('15%'),
    height: wp('15%'),
    borderRadius: 100,
  },
  text: {
    fontSize: hp('3%'),
    textAlign: 'center',
    marginTop: hp('2%'),
    marginBottom: hp('2%'),
    color: "#2C1001",
  },
  image: {
    width: wp('80%'),
    height: wp('75%'),
    borderRadius: wp('2%'),
    marginBottom: hp('4%'),
    padding: wp('2%'),
    borderWidth: 4,
    borderColor: 'black',
    alignSelf: 'center',
  },

  weatherCard: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  weatherImage: {
    width: wp('20%'),
    height: hp('10%'),
    resizeMode: 'contain',
  },
  weatherData: {
    marginLeft: 20,
  },
  temperatureText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  humidityText: {
    fontSize: 16,
    marginTop: 10,
    color: '#000',
  },
  loadingText: {
    fontSize: 20,
    fontStyle: 'italic',
    color: '#000',
  },
  marketingText: {
    fontSize: 25,
    color: '#000',
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
  },

});