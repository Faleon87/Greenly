import React, { useState, useEffect, useMemo } from 'react';
import { View, TextInput, FlatList, Image, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Make sure to install this package
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import  {getPlantas}  from '../api/getPlantas';
import { debounce } from 'lodash'; // Make sure to install this package



const Plantas = () => {
  const [search, setSearch] = useState('');
  const [plantas, setPlantas] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchPlantas = async () => {
      const data = await getPlantas(page);
      setPlantas(oldPlantas => [...oldPlantas, ...data]);
    };

    fetchPlantas();
  }, [page]);

  const loadMorePlantas = () => {
    setPage(oldPage => oldPage + 1);
  };

  const debouncedSearch = debounce(setSearch, 300);

  const filteredPlantas = useMemo(() => {
    return plantas.filter(planta => planta.nombre.includes(search));
  }, [plantas, search]);

  return (
    <View style={styles.container}>
      <View style={styles.searchSection}>
        <Ionicons style={styles.searchIcon} name="search" size={20} color="#000" />
        <TextInput
          style={styles.searchInput}
          value={search}
          onChangeText={text => debouncedSearch(text)}
          placeholder="Buscar plantas..."
          placeholderTextColor="#888"
        />
      </View>
      <FlatList
        data={filteredPlantas}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Image source={{ uri: item.imagen }} style={styles.image} />
            <Text>{item.nombre}</Text>
          </View>
        )}
        onEndReached={loadMorePlantas}
        onEndReachedThreshold={0.5}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={10}
        removeClippedSubviews={true}
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
  searchSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 40,
    borderRadius: 20,
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
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  image: {
    width: wp('20%'),
    height: wp('20%'),
    marginRight: 10,
  },
});

export default Plantas;