import React, {useState, useEffect} from 'react';
import { Text, StyleSheet, Image, TouchableOpacity, ScrollView, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import image1 from '../img/dondeComenzar.png';
import iconImage from '../img/placeholder.png';
import image2 from '../img/solucionesEcologicas.jpg';
import Icon from 'react-native-vector-icons/FontAwesome';

function Pantalla() {
  const [username, setUsername] = useState('');
  const [img, setImg] = useState('');

  useEffect(() => {
    const fetchUsername = async () => {
      const storedUsername = await AsyncStorage.getItem('nombre');
      setUsername(storedUsername);
    };

    const fetchImg = async () => {
      const storedImg = await AsyncStorage.getItem('img');
      setImg(storedImg);
    };

    fetchImg();
    fetchUsername();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <View style={styles.welcomeContainer}>
            <Text style={styles.welcome}>Bienvenido ,</Text>
            <Text style={styles.username}>{username}</Text>
          </View>
          <Image source={img ? { uri: img } : null} style={styles.profileImage} />
          <Icon name="cog" size={30} color="#000" style={styles.settingsIcon} />
        </View>
        <Text style={styles.text}>Donde Comenzar?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('')}>
          <Image source={image1} style={styles.image} />
          <Image source={iconImage} style={styles.icon} />
        </TouchableOpacity>
        <Text style={styles.text}>Soluciones ecologicas?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('')}>
          <Image source={image2} style={styles.image} />
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
    color: "white",
  },
  username: {
    fontSize: hp('3%'),
    color: "#2C1001",
    marginLeft: 10,
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
    width: wp('95%'),
    height: wp('35%'),
    borderRadius: wp('2%'),
    marginBottom: hp('2%'),
    padding: wp('2%'),
    borderWidth: 4,
    borderColor: 'black',
    alignSelf: 'center',
  },
  icon: {
    position: 'absolute',
    left: 70,
    top: 70,
    width: wp('10%'),
    height: wp('10%'),
  },
});