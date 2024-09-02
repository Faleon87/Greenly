import React, { useLayoutEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { TextInput } from 'react-native-paper';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { addFertilizer } from '../api/addFertilizer'; // Asegúrate de tener esta función en tu API

export default function AddFertilizer({ navigation }) {
  const [nombreFertilizante, setNombreFertilizante] = useState('');
  const [tipoFertilizante, setTipoFertilizante] = useState('');
  const [img, setImg] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [elaboracion, setElaboracion] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [cantidad, setCantidad] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Añadir Fertilizante',
    });
  }, [navigation]);

  const handleAddFertilizer = () => {
    if (!nombreFertilizante || !tipoFertilizante || !img || !descripcion || !elaboracion || !ubicacion || !cantidad) {
      Alert.alert('Error', 'Todos los campos son obligatorios.');
      return;
    }

    const newFertilizer = {
      nombreFertilizante,
      tipoFertilizante,
      img,
      descripcion,
      elaboracion,
      ubicacion,
      cantidad,
    };

    addFertilizer(newFertilizer)
      .then(response => {
        Alert.alert('Fertilizante añadido correctamente');

        setTimeout(() => {
          navigation.goBack(); // Regresa a la pantalla anterior
        }, 1000); 
      })
      .catch(error => {
        console.error('Error al añadir el fertilizante:', error
        );
      }
    );
  
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput
        label="Nombre del fertilizante"
        value={nombreFertilizante}
        onChangeText={setNombreFertilizante}
        style={styles.input}
        required
      />
      <TextInput
        label="Tipo de fertilizante"
        value={tipoFertilizante}
        onChangeText={setTipoFertilizante}
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
      <TextInput
        label="Descripción"
        value={descripcion}
        onChangeText={setDescripcion}
        style={styles.input}
      />
      <TextInput
        label="Elaboración"
        value={elaboracion}
        onChangeText={setElaboracion}
        style={styles.input}
      />
      <TextInput
        label="Ubicación"
        value={ubicacion}
        onChangeText={setUbicacion}
        style={styles.input}
      />
      <TextInput
        label="Cantidad"
        value={cantidad}
        onChangeText={setCantidad}
        style={styles.input}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddFertilizer}>
        <Text style={styles.addButtonText}>Añadir Fertilizante</Text>
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