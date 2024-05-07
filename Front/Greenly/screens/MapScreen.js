import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import image1 from '../img/dondeComenzar.png'; // Reemplaza esto con la ruta a tu imagen
import iconImage from '../img/placeholder.png'; // Reemplaza esto con la ruta a tu imagen

export default function Pantalla() { // Cambia el nombre de la función
  const navigation = useNavigation(); // Usa useNavigation para obtener la función de navegación
  return (
    <View style={styles.container}>
        <Text style={styles.text}>Donde Comenzar?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Maps')}>
          <Image source={image1} style={styles.image} />
          <Image source={iconImage} style={styles.icon} />
        </TouchableOpacity>
        {/* Repite el código anterior para las otras dos imágenes */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Usa flex para que el contenedor ocupe toda la pantalla
    justifyContent: 'center', // Alinea el contenido verticalmente
    alignItems: 'center',// Alinea el contenido horizontalmente
    backgroundColor: '#02907D', // Cambia este valor para cambiar el color de fondo
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
    left: 70, // Ajusta estos valores para cambiar la posición del icono
    top:  70, // Ajusta estos valores para cambiar la posición del icono
    width: wp('10%'), // Ajusta estos valores para cambiar el tamaño del icono
    height: wp('10%'),
  },

});