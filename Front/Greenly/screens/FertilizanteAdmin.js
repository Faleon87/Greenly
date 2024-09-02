import React, { useState, useMemo, useCallback } from 'react';
import { View, StyleSheet, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { TextInput, FAB } from 'react-native-paper';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { cardFertilizantes } from '../api/cardFertilizantes';
import { updateFertilizante } from '../api/updateFertilizante';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { deleteFert } from '../api/deleteFert';

const FertilizanteAdmin = () => {
  const [data, setData] = useState([]);
  const [editData, setEditData] = useState(null);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const result = await cardFertilizantes();
      console.log('Result',  result);
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
      item.nombreFertilizante.toLowerCase().includes(search.toLowerCase())
    ), [search, data]);

  const handleInputChange = useCallback((text, id, field) => {
    setEditData(prevData => {
      if (prevData && prevData.idFertilizante === id) {
        return { ...prevData, [field]: text };
      }
      const item = data.find(item => item.idFertilizante === id);
      return { ...item, [field]: text };
    });
  }, [data]);

  const handleDeleteFert = async (id) => {
    try {
      await deleteFert(id);
      fetchData(); // Recargar la lista después de eliminar
      Alert.alert('Éxito', 'Fertilizante eliminado con éxito');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Error al eliminar el fertilizante');
    }
  };

  const handleUpdate = useCallback(async (id) => {
    const item = editData || data.find(item => item.idFertilizante === id);
    try {
      const updatedData = await updateFertilizante(id, item);
      console.log(updatedData);
      setData(prevData => prevData.map(item => item.idFertilizante === id ? { ...item, ...editData } : item));
      setEditData(null);
      Alert.alert('Éxito', 'Fertilizante actualizado con éxito');
    } catch (error) {
      Alert.alert('Error', 'Error al actualizar el fertilizante');
    }
  }, [data, editData]);

  const renderItem = ({ item }) => {
    const theme = { colors: { primary: '#4CAF50', text: 'black' } };
    const editItem = editData && editData.idFertilizante === item.idFertilizante ? editData : item;
    return (
      <View key={editItem.idFertilizante} style={styles.itemContainer}>
        <TextInput
          label="Nombre del Fertilizante"
          value={editItem.nombreFertilizante}
          onChangeText={(text) => handleInputChange(text, editItem.idFertilizante, 'nombreFertilizante')}
          style={styles.itemInput}
          theme={theme}
        />
        <TextInput
          label="Tipo del Fertilizante"
          value={editItem.tipoFertilizante}
          onChangeText={(text) => handleInputChange(text, editItem.idFertilizante, 'tipoFertilizante')}
          style={styles.itemInput}
          theme={theme}
        />
        <TextInput
          label="Imagen"
          value={editItem.img}
          onChangeText={(text) => handleInputChange(text, editItem.idFertilizante, 'img')}
          style={styles.itemInput}
          theme={theme}
        />
        <TextInput
          label="Descripción"
          value={editItem.descripcion || ''}
          onChangeText={(text) => handleInputChange(text, editItem.idFertilizante, 'descripcion')}
          style={styles.itemInput}
          theme={theme}
        />
        <TextInput
          label="Elaboración"
          value={editItem.elaboracion || ''}
          onChangeText={(text) => handleInputChange(text, editItem.idFertilizante, 'elaboracion')}
          style={styles.itemInput}
          theme={theme}
        />
        <TextInput
          label="Ubicación"
          value={editItem.ubicacion || ''}
          onChangeText={(text) => handleInputChange(text, editItem.idFertilizante, 'ubicacion')}
          style={styles.itemInput}
          theme={theme}
        />
        <TextInput
          label="Cantidad"
          value={editItem.cantidad || ''}
          onChangeText={(text) => handleInputChange(text, editItem.idFertilizante, 'cantidad')}
          style={styles.itemInput}
          theme={theme}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.updateButton} onPress={() => handleUpdate(editItem.idFertilizante)}>
            <Text style={styles.updateButtonText}>Actualizar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleDeleteFert(editItem.idFertilizante)}>
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
      <Text style={styles.totalFertilizantesText}>Total de fertilizantes: {data.length}</Text>
      {isLoading ? (
        <Text style={styles.loadingText}>Cargando...</Text>
      ) : filteredData.length > 0 ? (
        <FlatList
          data={filteredData}
          renderItem={renderItem}
          keyExtractor={item => item.idFertilizante.toString()}
        />
      ) : (
        <Text style={styles.noResultsText}>Lo siento, pero eso no existe.</Text>
      )}
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => navigation.navigate('AddFertilizante')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
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
  totalFertilizantesText: {
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
  loadingText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#000',
    marginTop: 10,
    fontFamily: 'sans-serif',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    radius: 30,
    bottom: 0,
    backgroundColor: '#4CAF50',
  },
});

export default FertilizanteAdmin;