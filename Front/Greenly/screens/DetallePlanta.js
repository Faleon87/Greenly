import React, { useEffect, useLayoutEffect, useState, useRef } from 'react';
import { TouchableOpacity, View, Text, StyleSheet, Alert, Animated, ImageBackground, ScrollView, Image, Dimensions, Platform } from 'react-native';
import { DetallesPlanta } from '../api/DetallesPlanta'; // adjust the path as needed

const { width, height } = Dimensions.get('window'); // Get screen dimensions

const DetallePlanta = ({ route, navigation }) => {
  const { idPlanta } = route.params;
  const scrollY = useRef(new Animated.Value(0)).current;
  const [plantasReferenciadas, setPlantasReferenciadas] = useState([]);
  const plantasBeneficiosas = plantasReferenciadas.filter(planta => planta.estado === 'beneficiosa');
  const plantasPerjudiciales = plantasReferenciadas.filter(planta => planta.estado === 'perjudicial');

  const [planta, setPlanta] = useState('');

  useLayoutEffect(() => {
    if (planta.plantaOriginal) {
      navigation.setOptions({
        headerTitle: () => (
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitleText}>
              {planta.plantaOriginal.nombrePlanta}
            </Text>
          </View>
        ),
        headerTintColor: 'white',
        headerTransparent: true,
        headerBackground: () => (
          <Animated.View
            style={{
              ...StyleSheet.absoluteFillObject,
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
  }, [planta, navigation, scrollY]);

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
      .trim()
      .replace(/\s+/g, ' ')
      .replace(/\.([^ ])/g, '.\n$1');
  };

  const handleImageError = () => {
    Alert.alert('Error', 'Something went wrong while loading the image');
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContainer}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        { useNativeDriver: false }
      )}
      scrollEventThrottle={16}
    >
      <ImageBackground
        source={{ uri: planta.plantaOriginal.img }}
        style={styles.image}
        onError={handleImageError}
      >
        <View style={styles.imageOverlay} />
      </ImageBackground>
  
      <View style={styles.textContainer}>
        <Text style={styles.fieldTitle}>Identificación:</Text>
        <Text style={styles.description}>{cleanText(planta.plantaOriginal.identificacion)}</Text>
        <View style={styles.separator}>
          <Text style={styles.fieldTitle}>Nombre Comun:</Text>
          <Text style={styles.description}>{cleanText(planta.plantaOriginal.nombrePlanta)}</Text>
        </View>
        <View style={styles.separator}>
          <Text style={styles.fieldTitle}>Nombre Cientifico:</Text>
          <Text style={styles.description}>{cleanText(planta.plantaOriginal.nombreCientifico)}</Text>
        </View>
        <View style={styles.separator}>
          <Text style={styles.fieldTitle}>Siembra:</Text>
          <Text style={styles.description}>{cleanText(planta.plantaOriginal.siembra)}</Text>
        </View>
        <Text style={styles.fieldTitle}>Temporada de Siembra:</Text>
        <Text style={styles.description}>{cleanText(planta.plantaOriginal.temporadaSiembra)}</Text>
        <Text style={styles.fieldTitle}>Profundidad de Siembra:</Text>
        <Text style={styles.description}>{cleanText(planta.plantaOriginal.ProfundSiembra)}</Text>
        <Text style={styles.fieldTitle}>Distancia entre Plantas:</Text>
        <Text style={styles.description}>{cleanText(planta.plantaOriginal.distanciaPlantas)}</Text>
        <View style={styles.separator}>
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
        {plantasReferenciadas.length > 4 && <Text style={styles.scrollIndicator}>Desliza a la derecha para ver más plantas</Text>}
        {plantasBeneficiosas.length > 0 && <Text style={styles.fieldTitle}>Beneficiosas:</Text>}
        <ScrollView horizontal style={styles.horizontalScroll}>
          {plantasBeneficiosas.map((planta) => (
            <TouchableOpacity key={planta.idPlanta} onPress={() => navigation.navigate('DetallePlanta', { idPlanta: planta.idPlanta })}>
              <View style={styles.card}>
                <Image source={{ uri: planta.img }} style={styles.benef} />
                <Text style={styles.text}>{planta.nombrePlanta}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
        {plantasPerjudiciales.length > 0 && <Text style={styles.fieldTitle}>Perjudiciales:</Text>}
        <ScrollView horizontal style={styles.horizontalScroll}>
          {plantasPerjudiciales.map((planta) => (
            <TouchableOpacity key={planta.idPlanta} onPress={() => navigation.navigate('DetallePlanta', { idPlanta: planta.idPlanta })}>
              <View style={styles.card}>
                <Image source={{ uri: planta.img }} style={styles.benef} />
                <Text style={styles.text}>{planta.nombrePlanta}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  card: {
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    width: Platform.OS === 'web' ? 150 : undefined, // Adjust width for web
  },
  fieldTitle: {
    fontSize: 18,
    fontFamily: 'Manrope Bold',
    color: '#2C1001',
  },
  text: {
    fontSize: 16,
    color: '#2C1001',
    fontFamily: 'Manrope Regular',
  },
  asociaciones: {
    fontSize: 20,
    fontWeight: 'Manrope Bold',
    color: 'green',
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  imageOverlay: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    height: '100%',
  },
  textContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
    fontFamily: 'Manrope Regular',
  },
  separator: {
    borderTopWidth: 1,
    borderTopColor: 'green',
    paddingTop: 10,
    marginTop: 10,
  },
  scrollIndicator: {
    fontSize: 16,
    color: '#888',
    marginBottom: 10,
    fontFamily: 'Manrope Medium',
  },
  horizontalScroll: {
    marginBottom: 10,
    maxHeight: 150, // Adjust height for better visibility
  },
  benef: {
    width: 70,
    height: 70,
    borderRadius: 25,
    borderColor: 'green',
    borderWidth: 1,
    margin: 10,
  },
  headerTitleContainer: {
    marginHorizontal: 10,
  },
  headerTitleText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default DetallePlanta;
