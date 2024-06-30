import React, { useEffect, useLayoutEffect, useState, useRef } from 'react';
import { TouchableOpacity, View, Text, StyleSheet, Alert, Animated, ImageBackground, ScrollView, Image } from 'react-native';
import { DetallesPlanta } from '../api/DetallesPlanta'; // adjust the path as needed


const DetallePlanta = ({ route, navigation }) => {
  const { idPlanta } = route.params;
  const scrollY = useRef(new Animated.Value(0)).current; // Add this line
  const [plantasReferenciadas, setPlantasReferenciadas] = useState([]);
  const plantasBeneficiosas = plantasReferenciadas.filter(planta => planta.estado === 'beneficiosa');
  const plantasPerjudiciales = plantasReferenciadas.filter(planta => planta.estado === 'perjudicial');

  const [planta, setPlanta] = useState('');
  useLayoutEffect(() => {
    if (planta.plantaOriginal) {
      navigation.setOptions({
        headerTitle: () => (
          <View style={{ marginHorizontal: 10 }}>
            <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold', }}>
              {planta.plantaOriginal.nombrePlanta}
            </Text>
          </View>
        ),
        headerTintColor: 'white',
        headerTransparent: true,
        headerBackground: () => ( // Add this block
          <Animated.View
            style={{
              ...StyleSheet.absoluteFill,
              backgroundColor: '#000',
              opacity: scrollY.interpolate({
                inputRange: [0, 100],
                outputRange: [0, 0.8],
                extrapolate: 'clamp',
              }),
            }}
          />
        ),
      });
    }
  }, [planta, navigation, scrollY]); // Add scrollY here


  useEffect(() => {
    const getPlanta = async () => {
      const data = await DetallesPlanta(idPlanta);
      if (data) {
        setPlanta(data);
        setPlantasReferenciadas(data.plantasReferenciadas);
      } else {
        Alert.alert('Error', 'Something went wrong while fetching the plant data');
      }
    };


    getPlanta();
  }, [idPlanta]);



  if (!planta) {
    return <Text>Loading...</Text>;
  }

  const cleanText = (text) => {
    return text
      .trim() // remove spaces at the start and end
      .replace(/\s+/g, ' ') // replace multiple spaces with a single space
      .replace(/\.([^ ])/g, '.\n$1'); // add a newline after a period if it's not already there
  };

  const handleImageError = () => {
    Alert.alert('Error', 'Something went wrong while loading the image');
  };
  return (
    <Animated.ScrollView style={styles.container}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        { useNativeDriver: false }
      )}
      scrollEventThrottle={16}
    >
      <ImageBackground source={{ uri: planta.plantaOriginal.img }} style={styles.image} onError={handleImageError} >
        <View style={styles.imageOverlay} />
      </ImageBackground>
      <View style={styles.textContainer}>
        <Text style={styles.fieldTitle}>Identificacion:</Text>
        <Text style={styles.description}>{cleanText(planta.plantaOriginal.identificacion)}</Text>
        <View style={{ borderTopWidth: 1, borderTopColor: 'green' }}>
          <Text style={styles.fieldTitle}>Nombre Comun:</Text>
          <Text style={styles.description}>{cleanText(planta.plantaOriginal.nombrePlanta)}</Text>
        </View>
        <View style={{ borderTopWidth: 1, borderTopColor: 'green' }}>
          <Text style={styles.fieldTitle}>Nombre Cientifico:</Text>
          <Text style={styles.description}>{cleanText(planta.plantaOriginal.nombreCientifico)}</Text>
        </View>
        <View style={{ borderTopWidth: 1, borderTopColor: 'green' }}>
          <Text style={styles.fieldTitle}>Siembra:</Text>
          <Text style={styles.description}>{cleanText(planta.plantaOriginal.siembra)}</Text>
        </View>
        <Text style={styles.fieldTitle}>Temporada de Siembra:</Text>
        <Text style={styles.description}>{cleanText(planta.plantaOriginal.temporadaSiembra)}</Text>
        <Text style={styles.fieldTitle}>Profundidad de Siembra:</Text>
        <Text style={styles.description}>{cleanText(planta.plantaOriginal.ProfundSiembra)}</Text>
        <Text style={styles.fieldTitle}>Distancia entre Plantas:</Text>
        <Text style={styles.description}>{cleanText(planta.plantaOriginal.distanciaPlantas)}</Text>
        <View style={{ borderTopWidth: 1, borderTopColor: 'green' }}>
          <Text style={styles.fieldTitle}>Rotaciones:</Text>
          <Text style={styles.description}>{cleanText(planta.plantaOriginal.rotaciones)}</Text>
        </View>
        <Text style={styles.fieldTitle}>Clima y Temperatura:</Text>
        <Text style={styles.description}>{cleanText(planta.plantaOriginal.climaTemperatura)}</Text>
        <Text style={styles.fieldTitle}>Riego:</Text>
        <Text style={styles.description}>{cleanText(planta.plantaOriginal.riego)}</Text>
        <Text style={styles.fieldTitle}>Riego Estimado:</Text>
        <Text style={styles.description}>{cleanText(planta.plantaOriginal.riegoEstimado)}</Text>
        {plantasReferenciadas.length > 0 && <Text style={styles.asociaciones}>Asociaciones:</Text>}
        {plantasReferenciadas.length > 4 && <Text style={styles.scrollIndicator}>Desliza a la derecha para ver más plantas </Text>}
        {plantasBeneficiosas.length > 0 && <Text style={styles.fieldTitle}>Beneficiosas:</Text>}
        <ScrollView horizontal>
          {plantasBeneficiosas.map((planta) => (
            <TouchableOpacity onPress={() => navigation.navigate('DetallePlanta', { idPlanta: planta.idPlanta })}>
              <View style={styles.card1}>
                <Image source={{ uri: planta.img }} style={styles.benef} />
                <Text style={styles.text}>{planta.nombrePlanta}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {plantasPerjudiciales.length > 0 && <Text style={styles.fieldTitle}>Perjudiciales:</Text>}
        <ScrollView horizontal>
          {plantasPerjudiciales.map((planta) => (
            <TouchableOpacity onPress={() => navigation.navigate('DetallePlanta', { idPlanta: planta.idPlanta })}>
              <View style={styles.card2}>
                <Image source={{ uri: planta.img }} style={styles.benef} />
                <Text style={styles.text}>{planta.nombrePlanta}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </Animated.ScrollView >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  card1: {
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
    alignItems: 'center',
  },
  card2: {
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
    alignItems: 'center',
  },
  fieldTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C1001',
  },
  text: {
    fontSize: 16,
    color: '#2C1001',
  },
  asociaciones: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'green',
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  iconrow: {
    textAlign: 'center',
  },
  benef: {
    width: 70,
    height: 70,
    borderRadius: 25,
    borderColor: 'green',
    borderWidth: 1,
    margin: 10,

  },
  textContainer: {
    padding: 20,
    textAlign: 'left',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
  },
  imageBackground: {
    width: '100%',
    height: 200,
  },
  imageOverlay: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    height: '100%',
  },
  scrollIndicator: {
    fontSize: 16,
    color: '#888',
    marginBottom: 10,
    fontStyle: 'italic',
  },
});

export default DetallePlanta;