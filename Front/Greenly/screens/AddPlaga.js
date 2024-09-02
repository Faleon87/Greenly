import React, { useLayoutEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { TextInput } from 'react-native-paper';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { addPlaga } from '../api/addPlaga'; // Asegúrate de tener esta función en tu API

export default function AddPlaga({ navigation }) {
  const [nombrePlaga, setNombrePlaga] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [accionesPreventivas, setAccionesPreventivas] = useState('');
  const [luchaDirecta, setLuchaDirecta] = useState('');
  const [img, setImg] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Añadir Plaga',
    });
  }, [navigation]);

  const handleAddPlaga = () => {
    if (!nombrePlaga || !descripcion || !accionesPreventivas || !luchaDirecta || !img) {
      Alert.alert('Error', 'Todos los campos son obligatorios.');
      return;
    }

    const newPlaga = {
      nombrePlaga,
      descripcion,
      accionesPreventivas,
      luchaDirecta,
      img,
    };

    addPlaga(newPlaga)
      .then(response => {
        Alert.alert('Plaga añadida correctamente');

        setTimeout(() => {
          navigation.navigate('PlagasAdmin') // Regresa a la pantalla anterior
        }, 1000); 
      })
      .catch(error => {
        console.error('Error al añadir la plaga:', error);
      });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput
        label="Nombre de la plaga"
        value={nombrePlaga}
        onChangeText={setNombrePlaga}
        style={styles.input}
        required
      />
      <TextInput
        label="Descripción"
        value={descripcion}
        onChangeText={setDescripcion}
        style={styles.input}
        required
      />
      <TextInput
        label="Acciones Preventivas"
        value={accionesPreventivas}
        onChangeText={setAccionesPreventivas}
        style={styles.input}
        required
      />
      <TextInput
        label="Lucha Directa"
        value={luchaDirecta}
        onChangeText={setLuchaDirecta}
        style={styles.input}
        required
      />
      <TextInput
        label="Imagen"
        value={img}
        onChangeText={setImg}
        style={styles.input}
        required
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddPlaga}>
        <Text style={styles.addButtonText}>Añadir Plaga</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  input: {
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
  },
  addButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
});