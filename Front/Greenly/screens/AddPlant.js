import React, { useLayoutEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, Alert, Platform } from 'react-native';
import { TextInput } from 'react-native-paper';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { addPlant } from '../api/addPlant'; // Asegúrate de tener esta función en tu API

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
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput
        label="Nombre de la planta"
        value={nombrePlanta}
        onChangeText={setNombrePlanta}
        style={styles.input}
      />
      <TextInput
        label="Nombre científico"
        value={nombreCientifico}
        onChangeText={setNombreCientifico}
        style={styles.input}
      />
      <TextInput
        label="Identificación de la planta"
        value={identificacion}
        onChangeText={setIdentificacion}
        style={styles.input}
      />
      <TextInput
        label="Imagen"
        value={img}
        onChangeText={setImg}
        style={styles.input}
      />
      <TextInput
        label="Siembra"
        value={siembra}
        onChangeText={setSiembra}
        style={styles.input}
      />
      <TextInput
        label="Temporada de Siembra"
        value={temporadaSiembra}
        onChangeText={setTemporadaSiembra}
        style={styles.input}
      />
      <TextInput
        label="Profundidad de Siembra"
        value={profundSiembra}
        onChangeText={setProfundSiembra}
        style={styles.input}
      />
      <TextInput
        label="Distancia entre Plantas"
        value={distanciaPlantas}
        onChangeText={setDistanciaPlantas}
        style={styles.input}
      />
      <TextInput
        label="Rotaciones"
        value={rotaciones}
        onChangeText={setRotaciones}
        style={styles.input}
      />
      <TextInput
        label="Clima y Temperatura"
        value={climaTemperatura}
        onChangeText={setClimaTemperatura}
        style={styles.input}
      />
      <TextInput
        label="Riego"
        value={riego}
        onChangeText={setRiego}
        style={styles.input}
      />
      <TextInput
        label="Riego Estimado"
        value={riegoEstimado}
        onChangeText={setRiegoEstimado}
        style={styles.input}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddPlant}>
        <Text style={styles.addButtonText}>Añadir Planta</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: Platform.OS === 'web' ? '5vw' : wp('5%'),
    backgroundColor: '#F5F5F5',
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: Platform.OS === 'web' ? '1vw' : wp('1%'),
    fontSize: Platform.OS === 'web' ? '1.5vw' : wp('3%'),
  },
  addButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: Platform.OS === 'web' ? '2vw' : wp('2%'),
    paddingHorizontal: Platform.OS === 'web' ? '5vw' : wp('5%'),
    borderRadius: Platform.OS === 'web' ? '1vw' : wp('1%'),
    alignItems: 'center',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: Platform.OS === 'web' ? '1.5vw' : wp('3%'),
  },
});