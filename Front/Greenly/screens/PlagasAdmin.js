import React, { useState, useMemo, useCallback } from 'react';
import { View, StyleSheet, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { TextInput } from 'react-native-paper';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { cardPlagas } from '../api/cardPlagas';
import updatePlaga from '../api/updatePlaga';
import { FontAwesome } from '@expo/vector-icons';
import AddPlaga from './AddPlaga';
import deletePlaga from '../api/deletePlaga';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

const PlagaAdmin = () => {
  const [data, setData] = useState([]);
  const [editData, setEditData] = useState(null);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const navigation = useNavigation();

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const result = await cardPlagas();
      setData(result);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  const filteredData = useMemo(() =>
    data.filter(item =>
      item.nombrePlaga.toLowerCase().includes(search.toLowerCase())
    ), [search, data]);

  const handleInputChange = useCallback((text, id, field) => {
    setEditData(prevData => {
      if (prevData && prevData.idPlaga === id) {
        return { ...prevData, [field]: text };
      }
      const item = data.find(item => item.idPlaga === id);
      return { ...item, [field]: text };
    });
  }, [data]);

  const handleUpdate = useCallback(async (id) => {
    try {
      const item = editData || data.find(item => item.idPlaga === id);
      const result = await updatePlaga(id, item);
      if (result) {
        Alert.alert('¡Éxito!', 'Plaga actualizada correctamente.');
        fetchData();
      }
    } catch (error) {
      console.error(error);
      Alert.alert('¡Error!', 'Ha ocurrido un error al actualizar la plaga.');
    }
  }, [editData, data]);

  const handleDeleteFert = async (id) => {
    const result = await deletePlaga(id);
    fetchData(); // Recargar la lista después de eliminar
    Alert.alert('Éxito', 'Fertilizante eliminado con éxito');
  }

  const handleAddNewPlaga = () => {
    navigation.navigate('AddPlaga');
  }

  const renderItem = ({ item }) => {
    const theme = { colors: { primary: '#4CAF50', text: 'black' } };
    const editItem = editData && editData.idPlaga === item.idPlaga ? editData : item;
    return (
      <View key={editItem.idPlaga} style={styles.itemContainer}>
        <TextInput
          label="Nombre de la Plaga"
          value={String(editItem.nombrePlaga)}
          onChangeText={(text) => handleInputChange(text, editItem.idPlaga, 'nombrePlaga')}
          style={styles.itemInput}
          theme={theme}
        />
        <TextInput
          label="Descripción"
          value={String(editItem.descripcion)}
          onChangeText={(text) => handleInputChange(text, editItem.idPlaga, 'descripcion')}
          style={styles.itemInput}
          theme={theme}
        />
        <TextInput
          label="Acciones Preventivas"
          value={String(editItem.accionesPreventivas)}
          onChangeText={(text) => handleInputChange(text, editItem.idPlaga, 'accionesPreventivas')}
          style={styles.itemInput}
          theme={theme}
        />
        <TextInput
          label="Lucha Directa"
          value={String(editItem.luchaDirecta)}
          onChangeText={(text) => handleInputChange(text, editItem.idPlaga, 'luchaDirecta')}
          style={styles.itemInput}
          theme={theme}
        />
        <TextInput
          label="Imagen"
          value={String(editItem.img)}
          onChangeText={(text) => handleInputChange(text, editItem.idPlaga, 'img')}
          style={styles.itemInput}
          theme={theme}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.updateButton} onPress={() => handleUpdate(String(editItem.idPlaga))}>
            <Text style={styles.updateButtonText}>Actualizar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleDeleteFert(String(editItem.idPlaga))}>
            <FontAwesome name="bomb" size={30} color="#FF0000" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Buscar por nombre"
        value={search}
        onChangeText={setSearch}
        style={styles.searchInput}
      />
      <Text style={styles.totalPlagasText}>Total de plagas: {data.length}</Text>
      {isLoading ? (
        <Text style={styles.loadingText}>Cargando...</Text>
      ) : filteredData.length > 0 ? (
        <FlatList
          data={filteredData}
          renderItem={renderItem}
          keyExtractor={item => item.idPlaga.toString()}
        />
      ) : (
        <Text style={styles.noResultsText}>Lo siento, pero eso no existe.</Text>
      )}
      <TouchableOpacity style={styles.floatingButton} onPress={handleAddNewPlaga}>
        <Text style={styles.floatingButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

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
    fontFamily: 'Manrope Bold',
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  totalPlagasText: {
    textAlign: 'center',
    fontSize: 20,
    color: '#000',
    marginTop: 10,
    fontFamily: 'Manrope Bold',
  },
  itemInput: {
    marginBottom: 10,
    fontSize: 16,
    fontFamily: 'Manrope Bold',
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
    fontFamily: 'Manrope Bold',
  },
  noResultsText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#D32F2F',
    marginTop: 10,
    fontFamily: 'Manrope Bold',
  },
  loadingText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#000',
    marginTop: 10,
    fontFamily: 'Manrope Bold',
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
    fontFamily: 'Manrope Bold',
  },
});

export default PlagaAdmin;