import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import { TextInput } from 'react-native-paper';
import { TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { fetchPlants } from '../api/adminPlantas';

export default function App() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetchPlants()
      .then(json => {
        setData(json);
        setIsLoading(false);
      })
      .catch(error => {
        console.error(error);
        setIsLoading(false);
      });
  }, []);

  const filteredData = useMemo(() => 
    data.filter(item =>
      item.nombrePlanta.toLowerCase().includes(search.toLowerCase())
    ), [search, data]);

  const handleInputChange = useCallback((text, id, field) => {
    setData(prevData => prevData.map(item => item.idPlanta === id ? { ...item, [field]: text } : item));
  }, []);

  const handleUpdate = useCallback((id) => {
    const item = data.find(item => item.idPlanta === id);
    updatePlant(id, item)
      .then(json => console.log(json))
      .catch(error => console.error(error));
  }, [data]);

  const renderItem = ({ item }) => (
    <View key={item.idPlanta} style={styles.itemContainer}>
      <TextInput
        label="Nombre de la planta"
        value={item.nombrePlanta}
        onChangeText={(text) => handleInputChange(text, item.idPlanta, 'nombrePlanta')}
        style={styles.itemInput}
        theme={{ colors: { primary: '#4CAF50', text: 'black' } }}
      />
      <TextInput
        label="Nombre científico"
        value={item.nombreCientifico}
        onChangeText={(text) => handleInputChange(text, item.idPlanta, 'nombreCientifico')}
        style={styles.itemInput}
        theme={{ colors: { primary: '#4CAF50', text: 'black' } }}
      />
      <TextInput
        label="Identificación de la planta"
        value={item.identificacion}
        onChangeText={(text) => handleInputChange(text, item.idPlanta, 'nombreCientifico')}
        style={styles.itemInput}
        theme={{ colors: { primary: '#4CAF50', text: 'black' } }}
      />
      <TextInput
        label="Imagen"
        value={item.img}
        onChangeText={(text) => handleInputChange(text, item.idPlanta, 'nombreImg')}
        style={styles.itemInput}
        theme={{ colors: { primary: '#4CAF50', text: 'black' } }}
      />
      <TouchableOpacity style={styles.updateButton} onPress={() => handleUpdate(item.idPlanta)}>
        <Text style={styles.updateButtonText}>Actualizar</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        label="Buscar por nombre"
        value={search}
        onChangeText={setSearch}
        style={styles.searchInput}
        theme={{ colors: { primary: '#4CAF50', text: 'black' } }}
      />
      <Text style={styles.totalPlantsText}>Total de plantas: {data.length}</Text>
      {isLoading ? (
        <Text style={styles.loadingText}>Cargando...</Text> // Mostrar texto de carga cuando los datos se están obteniendo
      ) : filteredData.length > 0 ? (
        <FlatList
          data={filteredData}
          renderItem={renderItem}
          keyExtractor={item => item.idPlanta.toString()}
        />
      ) : (
        <Text style={styles.noResultsText}>Lo siento, pero eso no existe.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  searchInput: {
    margin: 10,
    backgroundColor: '#F0F0F0',
    fontSize: 20,
    borderWidth: 2,
    borderColor: '#4CAF50',
    borderRadius: 5,
    fontFamily: 'sans-serif',
  },
  itemContainer: {
    padding: 10,
    width: wp('90%'),
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
    marginBottom: 20,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  totalPlantsText: {
    textAlign: 'center',
    fontSize: 20,
    color: '#000',
    marginTop: 10,
    fontFamily: 'sans-serif',
  },
  itemInput: {
    marginBottom: 10,
    fontSize: 16,
    fontFamily: 'sans-serif',
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderColor: '#B2BABB',
    borderRadius: 5,
  },
  updateButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  updateButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'sans-serif',
  },
  noResultsText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#D32F2F',
    marginTop: 10,
    fontFamily: 'sans-serif',
  },
});