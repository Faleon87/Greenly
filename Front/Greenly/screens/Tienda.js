import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { obtenerProductos } from '../api/obtenerProductos';
import { MaterialIcons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import { guardarDatosCarrito } from '../api/insertCarrito';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Tienda() {

  const [productos, setProductos] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [idUser, setIdUser] = useState(null);


  useEffect(() => {
    const cargarProductos = async () => {
      const productosDesdeAPI = await obtenerProductos();
      setProductos(productosDesdeAPI);
    };
    cargarProductos();

    // Paso 3 y 4: Cargar y almacenar el idUser desde AsyncStorage
    const cargarIdUser = async () => {
      const storedIdUser = await AsyncStorage.getItem('idUser');
      setIdUser(storedIdUser); // Almacenar el idUser en el estado
    };
    cargarIdUser();
  }, []);

 



  const FiltroBoton = ({ categoria }) => (
    <TouchableOpacity
      style={styles.botonFiltro}
      onPress={() => setFiltro(categoria)
      }
    >
      <Text style={styles.textoBoton}>{categoria || 'Todos'}</Text>
    </TouchableOpacity>
  );

  const ProductoItem = ({ item }) => {
    const iconoCarrito = useRef(null);



    const animateIcon = () => {
      iconoCarrito.current?.bounce(800);

      // Insertar el producto en el carrito
      guardarDatosCarrito(idUser,item.idProducto);

      // Esperar unos segundos antes de mostrar la alerta
      setTimeout(() => {
        Alert.alert('Producto añadido al carrito', 'Has comprado ' + item.nombre + ' por €' + item.precio, [{ text: 'OK' }], { cancelable: false });
      }, 1000); // Espera 2000 milisegundos (2 segundos) antes de mostrar la alerta
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
      <FlatList
        data={productos.filter(producto => filtro === '' || producto.Categoria === filtro)}
        renderItem={({ item }) => <ProductoItem item={item} />}
        keyExtractor={item => item.idProducto}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4', // Se mantiene el fondo neutro
  },
  filtroContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    backgroundColor: 'linear-gradient(180deg, #ffffff 0%, #f0f0f0 100%)', // Gradiente sutil
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
    backgroundColor: 'skyblue', // Color de fondo para mayor contraste
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    // Ajustar el tamaño y el margen según sea necesario
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
    flexDirection: 'row', // Mantener los elementos en una fila
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
    flex: 1, // Asegura que el texto se expanda correctamente
    flexDirection: 'column', // Alinea el texto en una columna
  },
  imagen: {
    width: 100, // Ajustar según sea necesario
    height: 100, // Ajustar para mantener la proporción
    borderRadius: 10,
    marginRight: 20,
  },
  nombre: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#333333', // Mejor contraste
  },
  precio: {
    color: '#28a745',
    fontSize: 16,
  },
  botonCarrito: {
    // Ajustes específicos para el botón
    backgroundColor: '#e91e63', // Color de fondo para mayor contraste
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    // Ajustar el tamaño y el margen según sea necesario
    height: 40, // Altura del botón
    width: 120, // Ancho del botón
    marginLeft: 'auto', // Alinea el botón a la derecha
  },
  textoBotonCarrito: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 14, // Ajustar el tamaño de la fuente para mejorar la legibilidad
  },
});