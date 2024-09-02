import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TextInput } from 'react-native';
import { cardFertilizantes } from '../api/cardFertilizantes';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const Fertilizantes = () => {
  const [Fertilizantes, setFertilizantes] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchFertilizantes = async () => {
      const data = await cardFertilizantes();
      setFertilizantes(data);
    };

    fetchFertilizantes();
  }, []);

  const filteredFertilizantes = Fertilizantes.filter(Fertilizantes =>
    Fertilizantes.nombreFertilizante.toLowerCase().includes(search.toLowerCase())
  );

  const Card = ({ item }) => {
    const navigation = useNavigation();
    return (
      <TouchableOpacity onPress={() => navigation.navigate('DetalleFertilizantes', { idFertilizantes: item.idFertilizante })}>
        <View style={styles.card}>
          <Image source={{ uri: item.img }} style={styles.image} />
          <Text style={styles.title}>{item.nombreFertilizante}</Text>
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
          placeholder="Buscar Fertilizantes..."
          placeholderTextColor="#888"
        />
      </View>
      <FlatList
        data={filteredFertilizantes}
        renderItem={({ item }) => <Card item={item} />}
        keyExtractor={item => item.idFertilizante.toString()}
        numColumns={2}
        key={2} // Usa el estado numColumns como clave
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
    width: wp('45%'),
    height: 250,
    flex: 1, // Asegura que el componente se expanda correctamente
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
    width: wp('45%'),
    height: 200,
    justifyContent: 'center',
    alignSelf: 'center',
  },
});

export default Fertilizantes;