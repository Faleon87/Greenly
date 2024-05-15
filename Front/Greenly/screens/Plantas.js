import React, { useState } from 'react';
import { View, TextInput, FlatList, Image, Text, StyleSheet } from 'react-native';
const Plantas = () => {
  const [search, setSearch] = useState('');
  const [plantas, setPlantas] = useState([
    { id: '1', nombre: 'Rosa', imagen: 'url_de_la_imagen_de_la_rosa' },
    { id: '2', nombre: 'Girasol', imagen: 'url_de_la_imagen_del_girasol' },
    // Añade más plantas aquí
  ]);

  return (
    <View style={styles.container}>
      <TextInput 
        style={styles.search}
        value={search}
        onChangeText={setSearch}
        placeholder="Buscar plantas..."
      />
      <FlatList 
        data={plantas.filter(planta => planta.nombre.includes(search))}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Image source={{ uri: item.imagen }} style={styles.image} />
            <Text>{item.nombre}</Text>
          </View>
        )}
      />

    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  search: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
});

export default Plantas;