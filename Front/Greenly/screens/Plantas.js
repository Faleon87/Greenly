import React, { useState, useEffect, useMemo } from 'react';
import { View, TextInput, FlatList, Image, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Make sure to install this package
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { getPlantas } from '../api/getPlantas';
import { LinearGradient } from 'expo-linear-gradient';
import { TouchableOpacity } from 'react-native-gesture-handler';


const Plantas = ({navigation}) => {
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [plantas, setPlantas] = useState([]);
  const [page, setPage] = useState(1);



  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => {
      clearTimeout(timerId);
    };
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



  const loadMorePlantas = () => {
    setPage(oldPage => oldPage + 1);
  };

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
          renderItem={({ item }) => (
            <TouchableOpacity  onPress={() => navigation.navigate('DetallePlanta', { idPlanta: item.idPlanta })}>
              <View style={styles.item}>
                <Image source={{ uri: item.img }} style={styles.image} resizeMode='cover' />
                <LinearGradient
                  colors={['transparent', 'rgba(0,0,0,1)']}
                  style={styles.gradient} />
                <Text style={styles.itemText}>{item.nombrePlanta}</Text>
              </View>
            </TouchableOpacity>
          )}
          numColumns={2} // Add this line
          onEndReached={loadMorePlantas}
          onEndReachedThreshold={0.5}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          windowSize={10}
          removeClippedSubviews={true}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <Text style={styles.noResults}>Lo siento, no se encuenta disponible</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
    marginBottom: 40,
  },
  noResults: {
    textAlign: 'center',
    fontSize: 20,
    color: '#888',
  },
  searchSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: wp('10%'),
    width: wp('95%'),
    borderRadius: 20,
    marginRight: 40,
    marginBottom: 10,
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
    width: wp('100%'),
    backgroundColor: '#fff',
    color: '#424242',
  },
  item: {
    flex: 1,
    flexDirection: 'column',
    margin: 5,
    borderRadius: 10,
    height: wp('55%'),
    width: wp('45%'), // Asegúrate de que este ancho permita dos elementos por fila teniendo en cuenta el margen
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 1.41,
  },
  image: {
    width: wp('100%'), // fixed width
    height: 200, // fixed height
    justifyContent: 'center',
    alignSelf: 'center',
  },
  itemText: {
    position: 'absolute',
    bottom: 0,
    color: '#fff',
    width: '100%',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold'
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '50%',
    borderRadius: 10,
  },
});

export default Plantas;