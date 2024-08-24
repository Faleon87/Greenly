import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, Image, TouchableOpacity, View, Platform } from 'react-native';
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
import selectImg from '../api/imagenUser';



function Pantalla({ route }) {
  const [username, setUsername] = useState('');
  const [img, setImg] = useState('');
  const [weather, setWeather] = useState();
  const navigation = useNavigation();

  const weatherIconName = {
    Sunny: sunnyImage,
    'Partly cloudy': cloudyImage,
    Rain: rainyImage,
    Snow: snowyImage,
    Mist: mistyImage,
  };

  useEffect(() => {
    const fetchUsername = async () => {
      const storedUsername = await AsyncStorage.getItem('nombre');
      setUsername(storedUsername);
    };

    const fetchImg = async () => {
      const storedImg = await AsyncStorage.getItem('idUser');
      if (storedImg) {
        const img = await selectImg(storedImg);
        setImg(img);
      }
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
      <View style={styles.header}>
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcome}>Bienvenido,</Text>
          <Text style={styles.username}>{username}</Text>
        </View>
        <Text>{console.log(img)}</Text>
        {img ? (
          <Image
            source={{ uri: `data:image/jpeg;base64,${img}` }} // Asegúrate de usar el prefijo adecuado
            style={styles.profileImage}
          />
        ) : null}
        <View style={styles.iconsContainer}>
          <Icon
            name="cog"
            size={Platform.OS === 'web' ? 40 : 30}
            style={styles.settingsIcon}
            onPress={() => navigation.navigate('EditProfileScreen')}
          />
          <TouchableOpacity onPress={() => navigation.navigate('Form')}>
            <Icon
              name="send"
              size={Platform.OS === 'web' ? 40 : 30}
              style={styles.iconForm}
            />
          </TouchableOpacity>
        </View>
      </View>
      <Animatable.View
        animation="fadeInUpBig"
        duration={2000}
        style={styles.weatherCard}
      >
        {weather && weather.current && weather.current.condition && (
          <>
            <Image
              source={weatherIconName[weather.current.condition.text]}
              style={styles.weatherImage}
            />
            <View style={styles.weatherData}>
              <Text style={styles.cityText}>{weather.location.name}</Text>
              <Text style={styles.temperatureText}>
                Temperature: {weather.current.temp_c}°C
              </Text>
              <Text style={styles.humidityText}>
                Humidity: {weather.current.humidity}%
              </Text>
            </View>
          </>
        )}
      </Animatable.View>
      <Text style={styles.marketingText}>¡Visita Nuestra Tienda Online!</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Tienda')}>
        <Image source={image1} style={styles.image} />
      </TouchableOpacity>
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
    padding: Platform.OS === 'web' ? '5vw' : wp('5%'),
  },
  settingsIcon: {
    color: 'black',
    textShadow: '-2px 2px 3px white',
    marginHorizontal: Platform.OS === 'web' ? '2vw' : wp('2%'),
  },
  iconForm: {
    color: 'white',
    textShadow: '-2px 2px 3px black',
    marginHorizontal: Platform.OS === 'web' ? '2vw' : wp('2%'),
  },
  marketingText: {
    fontSize: Platform.OS === 'web' ? '2vw' : hp('3%'),
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: Platform.OS === 'web' ? '2vh' : hp('2%'),
  },
  cityText: {
    fontSize: Platform.OS === 'web' ? '1.5vw' : hp('2.5%'),
    color: '#000',
    fontWeight: 'bold',
    marginBottom: Platform.OS === 'web' ? '1vh' : hp('1%'),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: Platform.OS === 'web' ? '1vw' : wp('2%'),
    width: '100%',
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  welcomeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  welcome: {
    fontSize: Platform.OS === 'web' ? '2vw' : hp('3%'),
    color: 'white',
  },
  username: {
    fontSize: Platform.OS === 'web' ? '2vw' : hp('3%'),
    color: '#2C1001',
    fontWeight: 'bold',
    marginLeft: Platform.OS === 'web' ? '1vw' : wp('2%'),
  },
  profileImage: {
    width: Platform.OS === 'web' ? '10vw' : wp('15%'),
    height: Platform.OS === 'web' ? '10vw' : wp('15%'),
    borderRadius: Platform.OS === 'web' ? '5vw' : wp('7.5%'),
  },
  text: {
    fontSize: Platform.OS === 'web' ? '2vw' : hp('3%'),
    textAlign: 'center',
    color: '#2C1001',
  },
  image: {
    width: Platform.OS === 'web' ? '40vw' : wp('50%'),
    height: Platform.OS === 'web' ? '25vh' : hp('30%'),
    borderRadius: Platform.OS === 'web' ? '3vw' : wp('5%'),
    borderWidth: 4,
    borderColor: 'black',
    marginVertical: Platform.OS === 'web' ? '3vh' : hp('5%'),
  },
  weatherCard: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: Platform.OS === 'web' ? '3vw' : wp('5%'),
    padding: Platform.OS === 'web' ? '2vw' : wp('3%'),
    marginVertical: Platform.OS === 'web' ? '2vh' : hp('2%'),
    alignItems: 'center',
    width: Platform.OS === 'web' ? '20vw' : wp('50%'),
    justifyContent: 'center',
  },
  weatherImage: {
    width: Platform.OS === 'web' ? '4vw' : wp('10%'),
    height: Platform.OS === 'web' ? '4vw' : wp('10%'),
    resizeMode: 'contain',
  },
  weatherData: {
    marginLeft: Platform.OS === 'web' ? '3vw' : wp('5%'),
  },
  temperatureText: {
    fontSize: Platform.OS === 'web' ? '1.5vw' : hp('2.5%'),
    fontWeight: 'bold',
    color: '#000',
  },
  humidityText: {
    fontSize: Platform.OS === 'web' ? '1.2vw' : hp('2%'),
    color: '#000',
  },
  loadingText: {
    fontSize: Platform.OS === 'web' ? '2vw' : hp('2.5%'),
    fontStyle: 'italic',
    color: '#000',
  },
});