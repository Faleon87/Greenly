import React, { useState, useEffect, useRef } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, Alert, TextInput } from 'react-native';
import { obtenerProductos } from '../api/obtenerProductos';
import { MaterialIcons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import { guardarDatosCarrito } from '../api/insertCarrito';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Tienda() {
  const [productos, setProductos] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [idUser, setIdUser] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const cargarProductos = async () => {
      const productosDesdeAPI = await obtenerProductos();
      setProductos(productosDesdeAPI);
    };
    cargarProductos();

    const cargarIdUser = async () => {
      const storedIdUser = await AsyncStorage.getItem('idUser');
      setIdUser(storedIdUser);
    };
    cargarIdUser();
  }, []);

  const FiltroBoton = ({ categoria }) => (
    <TouchableOpacity
      style={styles.botonFiltro}
      onPress={() => setFiltro(categoria)}
    >
      <Text style={styles.textoBoton}>{categoria || 'Todos'}</Text>
    </TouchableOpacity>
  );

  const ProductoItem = ({ item }) => {
    const iconoCarrito = useRef(null);

    const animateIcon = () => {
      iconoCarrito.current?.bounce(800);
      guardarDatosCarrito(idUser, item.idProducto);
      setTimeout(() => {
        Alert.alert('Producto añadido al carrito', 'Has comprado ' + item.nombre + ' por €' + item.precio, [{ text: 'OK' }], { cancelable: false });
      }, 1000);
    };

    return (
      <View style={styles.producto}>
        <Image source={{ uri: item.imagen }} style={styles.imagen} />
        <View style={styles.detalles}>
          <Text style={styles.nombre}>{item.nombre}</Text>
          <Text style={styles.precio}>{`Precio: €${item.precio}`}</Text>
          <Text style={item.stock > 0 ? styles.stockDisponible : styles.stockNoDisponible}>
            {item.stock > 0 ? `Stock: ${item.stock}` : 'No está disponible'}
          </Text>
          <Text style={styles.bioInfo}>BIO</Text>
        </View>
        <TouchableOpacity
          style={styles.iconoCarrito}
          onPress={() => {
            if (item.stock > 0) {
              animateIcon();
            } else {
              Alert.alert("Lo siento", "Este artículo no está disponible en estos momentos");
            }
          }}
        >
          <Animatable.View ref={iconoCarrito}>
            <MaterialIcons name="add-shopping-cart" size={24} color="black" />
          </Animatable.View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.filtroContainer}>
        {['', 'Herramientas', 'Abonos', 'Semillas'].map((categoria) => (
          <FiltroBoton key={categoria} categoria={categoria} />
        ))}
      </View>
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar por nombre"
        value={search}
        onChangeText={setSearch}
      />
      <FlatList
        data={productos.filter(producto => 
          (filtro === '' || producto.Categoria === filtro) &&
          producto.nombre.toLowerCase().includes(search.toLowerCase())
        )}
        renderItem={({ item }) => <ProductoItem item={item} />}
        keyExtractor={item => item.idProducto}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  filtroContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    backgroundColor: 'linear-gradient(180deg, #ffffff 0%, #f0f0f0 100%)',
    borderBottomWidth: 1,
    borderBottomColor: '#dcdcdc',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  botonFiltro: {
    padding: 10,
    borderRadius: 50,
    backgroundColor: '#2C1001',
    elevation: 3,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  stockDisponible: {
    color: '#333333',
    fontSize: 16,
  },
  stockNoDisponible: {
    color: '#ff0000',
    fontSize: 16,
  },
  iconoCarrito: {
    backgroundColor: 'skyblue',
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: 50,
    marginLeft: 'auto',
  },
  textoBoton: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  producto: {
    flexDirection: 'row',
    padding: 15,
    marginHorizontal: 15,
    marginVertical: 10,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  detalles: {
    flex: 1,
    flexDirection: 'column',
  },
  imagen: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 20,
  },
  nombre: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#333333',
  },
  precio: {
    color: '#28a745',
    fontSize: 16,
  },
  botonCarrito: {
    backgroundColor: '#e91e63',
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: 120,
    marginLeft: 'auto',
  },
  textoBotonCarrito: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  searchInput: {
    height: 40,
    borderColor: '#dcdcdc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginHorizontal: 15,
    marginVertical: 10,
  },
});