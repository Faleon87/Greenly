import React, { useState, useMemo, useCallback } from 'react';
import { View, StyleSheet, Text, FlatList, Platform } from 'react-native';
import { TextInput } from 'react-native-paper';
import { TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { fetchPlants } from '../api/adminPlantas';
import { updatePlant } from '../api/updatePlantas';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { deletePlant } from '../api/deletePlant';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function App() {
  const [data, setData] = useState([]);
  const [editData, setEditData] = useState(null);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
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
    }, [])
  );

  const filteredData = useMemo(
    () =>
      data.filter(item =>
        item.nombrePlanta.toLowerCase().includes(search.toLowerCase())
      ),
    [search, data]
  );

  const handleInputChange = useCallback(
    (text, id, field) => {
      setEditData(prevData => {
        if (prevData && prevData.idPlanta === id) {
          return { ...prevData, [field]: text };
        }
        const item = data.find(item => item.idPlanta === id);
        return { ...item, [field]: text };
      });
    },
    [data]
  );

  const handleUpdate = useCallback(
    (id) => {
      const item = editData || data.find(item => item.idPlanta === id);

      updatePlant(id, item)
        .then(json => {
          console.log(json);

          setData(prevData => prevData.map(item => item.idPlanta === id ? { ...item, ...editData } : item));
          setEditData(null);
        })
        .catch(error => console.error(error));
    },
    [data, editData]
  );

  const handleAddNewPlant = () => {
    navigation.navigate('AddPlant');
  };

  const handleDeletePlant = (id) => {
    deletePlant(id)
      .then(json => {
        console.log(json);
      })
      .catch(error => console.error(error));
  }


  const renderItem = useCallback(
    ({ item }) => {
      const theme = { colors: { primary: '#4CAF50', text: 'black' } };

      const editItem = editData && editData.idPlanta === item.idPlanta ? editData : item;
      return (
        <View key={editItem.idPlanta} style={styles.itemContainer}>
          <TextInput
            label="Nombre de la planta"
            value={editItem.nombrePlanta}
            onChangeText={(text) => handleInputChange(text, editItem.idPlanta, 'nombrePlanta')}
            style={styles.itemInput}
            theme={theme}
          />
          <TextInput
            label="Nombre científico"
            value={editItem.nombreCientifico}
            onChangeText={(text) => handleInputChange(text, editItem.idPlanta, 'nombreCientifico')}
            style={styles.itemInput}
            theme={theme}
          />
          <TextInput
            label="Identificación de la planta"
            value={editItem.identificacion}
            onChangeText={(text) => handleInputChange(text, editItem.idPlanta, 'identificacion')}
            style={styles.itemInput}
            theme={theme}
          />
          <TextInput
            label="Imagen"
            value={editItem.img}
            onChangeText={(text) => handleInputChange(text, editItem.idPlanta, 'img')}
            style={styles.itemInput}
            theme={theme}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.updateButton} onPress={() => handleUpdate(editItem.idPlanta)}>
              <Text style={styles.updateButtonText}>Actualizar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDeletePlant(editItem.idPlanta)}>
              <Icon name="delete" size={30} color="#FF0000" />
            </TouchableOpacity>
          </View>
        </View>
      );
    },
    [editData, handleInputChange, handleUpdate, handleDeletePlant]
  );

  return (
    <View style={styles.container}>
      <TextInput
        label="Buscar por nombre"
        value={search}
        onChangeText={setSearch}
        style={styles.searchInput}
      />
      <Text style={styles.totalPlantsText}>Total de plantas: {data.length}</Text>
      {isLoading ? (
        <Text style={styles.loadingText}>Cargando...</Text>
      ) : filteredData.length > 0 ? (
        <FlatList
          data={filteredData}
          renderItem={renderItem}
          keyExtractor={item => item.idPlanta.toString()}
          getItemLayout={(data, index) => (
            { length: wp('90%'), offset: wp('90%') * index, index }
          )}
        />
      ) : (
        <Text style={styles.noResultsText}>Lo siento, pero eso no existe.</Text>
      )}
      <TouchableOpacity style={styles.floatingButton} onPress={handleAddNewPlant}>
        <Text style={styles.floatingButtonText}>+</Text>
      </TouchableOpacity>
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
    fontFamily: Platform.OS === 'web' ? 'Arial' : 'sans-serif',
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
    fontFamily: Platform.OS === 'web' ? 'Arial' : 'sans-serif',
  },
  itemInput: {
    marginBottom: 10,
    fontSize: 16,
    fontFamily: Platform.OS === 'web' ? 'Arial' : 'sans-serif',
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderColor: '#B2BABB',
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    fontFamily: Platform.OS === 'web' ? 'Arial' : 'sans-serif',
  },
  noResultsText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#D32F2F',
    marginTop: 10,
    fontFamily: Platform.OS === 'web' ? 'Arial' : 'sans-serif',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#4CAF50',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
  },
  floatingButtonText: {
    color: '#FFFFFF',
    fontSize: 30,
    fontFamily: Platform.OS === 'web' ? 'Arial' : 'sans-serif',
  },
});