import React from 'react';
import { Alert } from 'react-native';

export const DetallesPlagas = async (idPlanta) => {
  try {
    const response = await fetch(`http://44.192.55.84:3000/plagas/${idPlanta}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    // Opcional: Alerta al usuario en caso de error
    Alert.alert('Error', 'No se pudieron cargar los detalles de la planta.');
    return null;
  }
};