import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Alert } from 'react-native';
import { DetallesPlanta } from '../api/DetallesPlanta'; // adjust the path as needed

const DetallePlanta = ({ route}) => {
  const { idPlanta } = route.params;
  const [planta, setPlanta] = useState(null);

  useEffect(() => {
    const getPlanta = async () => {
      const data = await DetallesPlanta(idPlanta);
      if (data) {
        setPlanta(data);
      } else {
        Alert.alert('Error', 'Something went wrong while fetching the plant data');
      }
    };

    getPlanta();
  }, [idPlanta]);

  if (!planta) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: planta.img }} style={styles.image} />
      <Text style={styles.title}>{planta.nombrePlanta}</Text>
      <Text style={styles.description}>{planta.descripcion}</Text>
      {/* Add more fields as needed */}
    </View>
  );
};

// ... rest of the code
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  image: {
    width: '100%',
    height: 200,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  description: {
    fontSize: 16,
  },
});

export default DetallePlanta;