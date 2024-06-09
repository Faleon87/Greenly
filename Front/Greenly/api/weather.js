import * as Location from 'expo-location';
import { Alert } from 'react-native';

export const fetchWeather = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        throw new Error('Permission to access location was denied');
      }
  
      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      const response = await fetch(
        `http://api.weatherapi.com/v1/current.json?key=2114360dc98e4d93a38171450240906&q=${latitude},${longitude}`,
      );
      const data = await response.json();
      const temperature = data.current.temp_c;
      return data;
    } catch (error) {
      console.error(error);
      return {}; // return an empty object if there's an error
    }
  };