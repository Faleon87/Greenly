import React, { useLayoutEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, Alert, Platform } from 'react-native';
import { TextInput, DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { addPlant } from '../api/addPlant'; // Asegúrate de tener esta función en tu API
import { fonts } from 'react-native-elements/dist/config';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#4CAF50', // Cambia este color al que desees
  }
};

export default function AddPlant({ navigation }) {
  const [nombrePlanta, setNombrePlanta] = useState('');
  const [nombreCientifico, setNombreCientifico] = useState('');
  const [identificacion, setIdentificacion] = useState('');
  const [img, setImg] = useState('');
  const [siembra, setSiembra] = useState('');
  const [temporadaSiembra, setTemporadaSiembra] = useState('');
  const [profundSiembra, setProfundSiembra] = useState('');
  const [distanciaPlantas, setDistanciaPlantas] = useState('');
  const [rotaciones, setRotaciones] = useState('');
  const [climaTemperatura, setClimaTemperatura] = useState('');
  const [riego, setRiego] = useState('');
  const [riegoEstimado, setRiegoEstimado] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Añadir Planta',
    });
  }, [navigation]);

  const handleAddPlant = () => {
    if (!nombrePlanta.trim()) {
      Alert.alert('Error', 'El nombre de la planta es obligatorio.');
      return;
    }

    const newPlant = {
      nombrePlanta,
      nombreCientifico,
      identificacion,
      img,
      siembra,
      temporadaSiembra,
      profundSiembra,
      distanciaPlantas,
      rotaciones,
      climaTemperatura,
      riego,
      riegoEstimado,
    };

    addPlant(newPlant)
      .then(response => {
        if (Platform.OS === 'web') {
          window.alert('Planta añadida correctamente');
        } else {
          Alert.alert('Planta añadida correctamente');
        }
        setTimeout(() => {
          navigation.goBack();
        }, 2000);
      })
      .catch(error => {
        console.error('Error al añadir la planta:', error);
        if (Platform.OS === 'web') {
          window.alert('Error al añadir la planta');
        } else {
          Alert.alert('Error', 'Error al añadir la planta.');
        }
      });
  };

  return (
    <PaperProvider theme={theme}>
      <ScrollView contentContainerStyle={styles.container}>
        <TextInput
          label="Nombre de la planta"
          value={nombrePlanta}
          onChangeText={setNombrePlanta}
          style={styles.input}
          theme={theme}
        />
        <TextInput
          label="Nombre científico"
          value={nombreCientifico}
          onChangeText={setNombreCientifico}
          style={styles.input}
          theme={theme}
        />
        <TextInput
          label="Identificación de la planta"
          value={identificacion}
          onChangeText={setIdentificacion}
          style={styles.input}
          theme={theme}
        />
        <TextInput
          label="Imagen"
          value={img}
          onChangeText={setImg}
          style={styles.input}
          theme={theme}
        />
        <TextInput
          label="Siembra"
          value={siembra}
          onChangeText={setSiembra}
          style={styles.input}
          theme={theme}
        />
        <TextInput
          label="Temporada de Siembra"
          value={temporadaSiembra}
          onChangeText={setTemporadaSiembra}
          style={styles.input}
          theme={theme}
        />
        <TextInput
          label="Profundidad de Siembra"
          value={profundSiembra}
          onChangeText={setProfundSiembra}
          style={styles.input}
          theme={theme}
        />
        <TextInput
          label="Distancia entre Plantas"
          value={distanciaPlantas}
          onChangeText={setDistanciaPlantas}
          style={styles.input}
          theme={theme}
        />
        <TextInput
          label="Rotaciones"
          value={rotaciones}
          onChangeText={setRotaciones}
          style={styles.input}
          theme={theme}
        />
        <TextInput
          label="Clima y Temperatura"
          value={climaTemperatura}
          onChangeText={setClimaTemperatura}
          style={styles.input}
          theme={theme}
        />
        <TextInput
          label="Riego"
          value={riego}
          onChangeText={setRiego}
          style={styles.input}
          theme={theme}
        />
        <TextInput
          label="Riego Estimado"
          value={riegoEstimado}
          onChangeText={setRiegoEstimado}
          style={styles.input}
          theme={theme}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddPlant}>
          <Text style={styles.addButtonText}>Añadir Planta</Text>
        </TouchableOpacity>
      </ScrollView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: Platform.OS === 'web' ? '5vw' : wp('5%'),
    backgroundColor: '#F5F5F5',
  },
  input: {
    backgroundColor: '#FFFFFF',
    textShadowColor: 'black',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
    borderRadius: Platform.OS === 'web' ? '1vw' : wp('1%'),
    marginBottom: Platform.OS === 'web' ? '2vw' : wp('2%'),
  },
  addButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: Platform.OS === 'web' ? '2vw' : wp('2%'),
    paddingHorizontal: Platform.OS === 'web' ? '5vw' : wp('5%'),
    borderRadius: Platform.OS === 'web' ? '1vw' : wp('1%'),
  },
  addButtonText: {
    color: '#FFFFFF',
    fontFamily: 'Manrope Bold',
    height: Platform.OS === 'web' ? '2vw' : wp('8%'),
    textAlignVertical: 'center',
    fontSize: Platform.OS === 'web' ? '1.2vw' : wp('4%'),
    textAlign: 'center',
  },
});