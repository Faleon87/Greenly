import React from 'react';
import { Text, StyleSheet, Image, TouchableOpacity, ScrollView , View} from 'react-native';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import image1 from '../img/dondeComenzar.png';
import iconImage from '../img/placeholder.png';
import image2 from '../img/solucionesEcologicas.jpg';


function Pantalla() {
  
  return (
    <View style={styles.container}>
      <ScrollView>
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