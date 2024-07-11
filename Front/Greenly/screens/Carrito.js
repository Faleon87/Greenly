import React, { useState, useCallback, useLayoutEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { selectCarrito } from '../api/selectCarrito';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import { deleteProduct } from '../api/eliminarProducto';
import { useNavigation } from '@react-navigation/native';


const Carrito = () => {

    const navigation = useNavigation();

    const [productos, setProductos] = useState([]);
    const [totalUnidades, setTotalUnidades] = useState(0);
    const [total, setTotal] = useState(0);
    const [idUser, setIdUser] = useState(null);

    const obtenerProductos = async () => {
        const storedIdUser = await AsyncStorage.getItem('idUser');
        const idUser = JSON.parse(storedIdUser);
        setIdUser(idUser);
        const productosObtenidos = await selectCarrito(idUser);
        const productosAgrupados = agruparProductos(productosObtenidos);
        setProductos(productosAgrupados);
        calcularTotales(productosAgrupados);
    };

    useFocusEffect(
        useCallback(() => {
            obtenerProductos();
        }, []),

    );


    const agruparProductos = (productos) => {
        const productosMap = new Map();
        productos.forEach(item => {
            if (productosMap.has(item.idProducto.idProducto)) {
                productosMap.get(item.idProducto.idProducto).cantidad += 1;
            } else {
                productosMap.set(item.idProducto.idProducto, { ...item, cantidad: 1 });
            }
        });
        return Array.from(productosMap.values());
    };

    const calcularTotales = (productos) => {
        let unidades = 0;
        let totalPrecio = 0;
        productos.forEach(item => {
            unidades += item.cantidad;
            totalPrecio += item.idProducto.precio * item.cantidad;
        });
        setTotalUnidades(unidades);
        setTotal(totalPrecio.toFixed(2));
    };

    const incrementarCantidad = (idProducto) => {
        const nuevosProductos = productos.map(item => {
            if (item.idProducto.idProducto === idProducto) {
                item.cantidad += 1;
            }
            return item;
        });
        setProductos(nuevosProductos);
        calcularTotales(nuevosProductos);
    };

    const decrementarCantidad = (idProducto) => {
        const nuevosProductos = productos.map(item => {
            if (item.idProducto.idProducto === idProducto && item.cantidad > 1) {
                item.cantidad -= 1;
            }
            return item;
        });
        setProductos(nuevosProductos);
        calcularTotales(nuevosProductos);
    };

    const eliminarProducto = (idProducto, nombreProducto) => {


        Alert.alert("Eliminar Producto", "¿Estás seguro de que deseas eliminar este producto " + nombreProducto + "?", [
            {
                text: "Cancelar",
                onPress: () => console.log("Cancelado"),
                style: "cancel"
            },
            {
                text: "Eliminar",
                onPress: async () => {
                    try {
                        const response = await deleteProduct(idProducto, idUser);
                        if(response== true){
                            Alert.alert("Producto eliminado", "El producto " + nombreProducto + " ha sido eliminado del carrito", [{ text: "OK" }], { cancelable: false });
                            obtenerProductos();
                        }else{
                            console.log("Error al eliminar el producto");
                        }
                    } catch (error) {
                        console.error("Error al conectar con la API", error);
                    }
                }
            }

        ]);

    };

    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <Image source={{ uri: item.idProducto.imagen }} style={styles.image} />
            <View style={styles.textContainer}>
                <Text style={styles.name}>{item.idProducto.nombre}</Text>
                <View style={styles.quantityContainer}>
                    <TouchableOpacity onPress={() => decrementarCantidad(item.idProducto.idProducto)} style={styles.button}>
                        <Text style={styles.buttonText}>-</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => incrementarCantidad(item.idProducto.idProducto)} style={styles.button}>
                        <Text style={styles.buttonText}>+</Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.quantity}>Cantidad: {item.cantidad}</Text>
                <Text style={styles.price}>{item.idProducto.precio}€</Text>
            </View>
            <TouchableOpacity onPress={() => eliminarProducto(item.idProducto.idProducto, item.idProducto.nombre)} style={styles.deleteButton}>
                <Icon name="trash" size={20} color="red" />
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={productos}
                renderItem={renderItem}
                keyExtractor={item => item.idProducto.idProducto}
            />
            <Text style={styles.units}>Unidades Totales: {totalUnidades}</Text>
            <Text style={styles.total}>
                Total(IVA incluido):
                <Text style={styles.totalValue}> {total}€</Text>
            </Text>
            <TouchableOpacity style={styles.payButton} onPress={() => navigation.navigate('PagarConTarjeta')}>
                <Text style={styles.payButtonText}>Proceder al Pago</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#F8F8F8',
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        marginVertical: 8,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        position: 'relative',
    },
    image: {
        width: 80,
        height: 80,
        resizeMode: 'contain',
        marginRight: 15,
        borderRadius: 10,
    },
    textContainer: {
        flex: 1,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
    },
    button: {
        backgroundColor: 'green',
        padding: 5,
        top: 14,
        borderRadius: 5,
        left: 120,
        width: 30,
        marginHorizontal: 20,
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
    deleteButton: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    quantity: {
        fontSize: 16,
        color: '#666',
    },
    price: {
        fontSize: 16,
        color: '#333',
        marginTop: 5,
    },
    units: {
        fontSize: 18,
        color: '#333',
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 10,
    },
    total: {
        fontSize: 18,
        color: '#333',
        textAlign: 'center',
        marginVertical: 10,
    },
    totalValue: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
    },
    payButton: {
        backgroundColor: '#4CAF50',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 20,
    },
    payButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default Carrito;