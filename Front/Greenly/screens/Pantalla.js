import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import image1 from '../img/dondeComenzar.png'; // Reemplaza esto con la ruta a tu imagen
import iconImage from '../img/placeholder.png'; // Reemplaza esto con la ruta a tu imagen

export default function Pantalla() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
        <Text style={styles.text}>Donde Comenzar?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('OtraPantalla')}>
          <Image source={image1} style={styles.image} />
          <Image source={iconImage} style={styles.icon} />
        </TouchableOpacity>
        {/* Repite el código anterior para las otras dos imágenes */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#02907D',
  },
  text: {
    fontSize: hp('3%'), // Usa hp para hacer el tamaño de la fuente responsivo
    textAlign: 'center',
    marginBottom: hp('2%'),
    color: "#2C1001", // Aumenta este valor para mover el texto más arriba
  },
  image: {
    width: wp('95%'), // Usa wp para hacer el ancho de la imagen responsivo
    height: wp('50%'), // Usa wp para hacer la altura de la imagen responsivo
    borderRadius: wp('2%'), // Usa wp para hacer el borderRadius responsivo
    marginBottom: hp('55%'), // Añade esto para mover la imagen más arriba
    padding: wp('2%'), // Añade esto para darle espacio alrededor de la imagen
    borderWidth: 4, // Añade esto para ver el borde de la imagen
    borderColor: 'black', // Añade esto para ver el borde de la imagen
  },
  icon: {
    position: 'absolute',
    left: 0,
    top: '50%',
    width: wp('10%'), // Ajusta estos valores para cambiar el tamaño del icono
    height: wp('10%'),
  },
});