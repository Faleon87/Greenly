import React, { useState, useEffect } from 'react';
import { ScrollView, View, StyleSheet, Text } from 'react-native';
import { List, TextInput, Button } from 'react-native-paper';


export default function App() {
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [input, setInput] = useState('');

  useEffect(() => {
    fetch('http://35.153.237.205:3000/plantas', {method: 'GET'})
      .then(response => response.json())
      .then(json => setData(json))
      .catch(error => console.error(error));
  }, []);

  const [search, setSearch] = useState('');
  return (
    <ScrollView>
      <TextInput
        label="Buscar por nombre"
        value={search}
        onChangeText={setSearch}
        style={styles.searchInput}
      />
      {data.filter(item => item.nombrePlanta.toLowerCase().includes(search.toLowerCase())).length > 0 ? (
        data.filter(item => item.nombrePlanta.toLowerCase().includes(search.toLowerCase())).map((item) => (
          <View key={item.idPlanta} style={styles.itemContainer}>
            <TextInput
              label="Nombre de la planta"
              value={item.nombrePlanta}
              onChangeText={(text) => handleInputChange(text, item.idPlanta, 'nombrePlanta')}
              style={styles.itemInput}
            />
            <TextInput
              label="Nombre científico"
              value={item.nombreCientifico}
              onChangeText={(text) => handleInputChange(text, item.idPlanta, 'nombreCientifico')}
              style={styles.itemInput}
            />
            <TextInput
              label="Imagen"
              value={item.img}
              onChangeText={(text) => handleInputChange(text, item.idPlanta, 'nombreImg')}
              style={styles.itemInput}
            />
            <Button onPress={() => handleUpdate(item.idPlanta)}>Actualizar</Button>
          </View>
        ))
      ) : (
        <Text>Lo siento, pero eso no existe.</Text>  // Muestra este mensaje si no hay resultados
      )}
    </ScrollView>
  );


  function handleInputChange(text, id, field) {
    setData(data.map(item => item.idPlanta === id ? {...item, [field]: text} : item));
  }
  
  function handleUpdate(id) {
    const item = data.find(item => item.idPlanta === id);
    fetch(`http://35.153.237.205:3000/plantas/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    })
    .then(response => response.json())
    .then(json => console.log(json))
    .catch(error => console.error(error));
  }

}

// Define tus estilos
const styles = StyleSheet.create({
    searchInput: {
      margin: 10,
      backgroundColor: 'white',
    },
    itemContainer: {
      padding: 10,
      backgroundColor: '#f0f0f0',
      marginBottom: 10,
    },
    itemInput: {
      marginBottom: 10,
    },
  });
  