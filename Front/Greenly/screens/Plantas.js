import React, { useState, useEffect, useMemo } from 'react';
import { View, TextInput, FlatList, Image, Text, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { getPlantas } from '../api/getPlantas';
import { LinearGradient } from 'expo-linear-gradient';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Plantas = ({ navigation }) => {
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [plantas, setPlantas] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);
    return () => clearTimeout(timerId);
  }, [search]);

  useEffect(() => {
    const fetchPlantas = async () => {
      const data = await getPlantas(page);
      setPlantas(oldPlantas => {
        const plantasMap = new Map();
        [...oldPlantas, ...data].forEach(planta => {
          plantasMap.set(planta.idPlanta, planta);
        });
        return Array.from(plantasMap.values());
      });
    };
    fetchPlantas();
  }, [page]);

  const loadMorePlantas = () => setPage(oldPage => oldPage + 1);

  const filteredPlantas = useMemo(() => {
    const normalizedSearch = debouncedSearch
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
    return plantas.filter(planta => {
      const normalizedNombrePlanta = planta.nombrePlanta
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();
      const normalizedNombreCientifico = planta.nombreCientifico
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();
      return normalizedNombrePlanta.includes(normalizedSearch) || normalizedNombreCientifico.includes(normalizedSearch);
    });
  }, [plantas, debouncedSearch]);

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('DetallePlanta', { idPlanta: item.idPlanta })}>
      <View style={styles.item}>
        <Image source={{ uri: item.img }} style={styles.image} resizeMode='cover' />
        <LinearGradient colors={['transparent', 'rgba(0,0,0,1)']} style={styles.gradient} />
        <Text style={styles.itemText}>{item.nombrePlanta}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchSection}>
        <Ionicons style={styles.searchIcon} name="search" size={20} color="#000" />
        <TextInput
          style={styles.searchInput}
          value={search}
          onChangeText={text => setSearch(text)}
          placeholder="Buscar plantas..."
          placeholderTextColor="#888"
        />
      </View>
      {filteredPlantas.length > 0 ? (
        <FlatList
          data={filteredPlantas}
          keyExtractor={item => item.idPlanta.toString()}
          renderItem={renderItem}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          onEndReached={loadMorePlantas}
          onEndReachedThreshold={0.5}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          windowSize={10}
          removeClippedSubviews={true}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <Text style={styles.noResults}>Lo siento, no se encuentra disponible</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  noResults: {
    textAlign: 'center',
    fontSize: 20,
    color: 'red',
    fontFamily: 'Manrope Regular',
  },
  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: Platform.OS === 'web' ? '5vh' : 50,
    width: Platform.OS === 'web' ? '90vw' : wp('90%'),
    borderRadius: Platform.OS === 'web' ? '5vw' : 25,
    marginVertical: Platform.OS === 'web' ? '2vh' : 20,
  },
  searchIcon: {
    padding: 10,
  },
  searchInput: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
    fontFamily: 'Manrope Regular',
    color: '#424242',
  },
  item: {
    borderRadius: 10,
    height: Platform.OS === 'web' ? '30vh' : 200,
    width: Platform.OS === 'web' ? '40vw' : wp('40%'),
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 1.41,
    shadowOpacity: 0.2,
    margin: 10,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  itemText: {
    position: 'absolute',
    bottom: 0,
    color: '#fff',
    width: '100%',
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'Manrope Bold',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '50%',
  },
  columnWrapper: {
    justifyContent: 'space-around',
  },
});

export default Plantas;
