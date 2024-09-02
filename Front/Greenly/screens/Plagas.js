import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TextInput } from 'react-native';
import { cardPlagas } from '../api/cardPlagas';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; 
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

const Plagas = () => {
  const [plagas, setPlagas] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchPlagas = async () => {
      const data = await cardPlagas();
      setPlagas(data);
    };

    fetchPlagas();
  }, []);

  const filteredPlagas = plagas.filter(plaga =>
    plaga.nombrePlaga.toLowerCase().includes(search.toLowerCase())
  );

  const Card = ({ item }) => {
    const navigation = useNavigation();
    return (
      <TouchableOpacity onPress={() => navigation.navigate('DetallePlagas', { idPlaga: item.idPlaga })}>
        <View style={styles.card}>
          <Image source={{ uri: item.img }} style={styles.image} />
          <Text style={styles.title}>{item.nombrePlaga}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchSection}>
        <Ionicons style={styles.searchIcon} name="search" size={20} color="#000" />
        <TextInput
          style={styles.searchInput}
          value={search}
          onChangeText={text => setSearch(text)}
          placeholder="Buscar plagas..."
          placeholderTextColor="#888"
        />
      </View>
      <FlatList
        data={filteredPlagas}
        renderItem={({ item }) => <Card item={item} />}
        keyExtractor={item => item.idPlaga.toString()}
        numColumns={2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    overflow: 'hidden',
    width: wp('46%'),
    height: 256,    
    margin: 5, // Ajusta el margen según sea necesario
  },
  title: {
    padding: 10,
    fontSize: 16,
    fontFamily: 'Manrope Bold',
    color: '#424242',
  },
  searchSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 40,
    borderRadius: 10,
    margin: 10
  },
  searchIcon: {
    padding: 10,
  },
  searchInput: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    width: wp('45%'),
    backgroundColor: '#fff',
    color: '#424242',
    fontFamily: 'Manrope Regular',
  },
  image: {
    width: '100%', 
    height: 200,
    justifyContent: 'center',
    alignSelf: 'center',
  },
});

export default Plagas;