import React, { useState, useLayoutEffect, useEffect } from 'react';
import { View, StyleSheet, Text, ImageBackground, TouchableOpacity, Alert, Image } from 'react-native';
import { TextInput } from 'react-native-paper';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import logo from '../img/Logo.png';
import logoGood from '../img/LogoGood.png';
import { guardarTarjeta } from '../api/guardarTarjeta';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import * as Notifications from 'expo-notifications';
import obtenerTarjetas from '../api/obtenerTarjetas';

const PagarTarjeta = () => {
    const navigate = useNavigation();

    const [cardNumber, setCardNumber] = useState('');
    const [name, setName] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvv, setCvv] = useState('');
    const [errors, setErrors] = useState({});
    const [isCvvFocused, setIsCvvFocused] = useState(false);
    const [idUsuario, setIdUsuario] = useState(null);

    const handleCardNumberChange = (number) => {
        const formattedNumber = number.replace(/\D/g, '').replace(/(\d{4})(?=\d)/g, '$1 ').trim().slice(0, 19);
        setCardNumber(formattedNumber);
    };

    // Función para manejar el cambio de nombre
    const handleNameChange = (name) => {
        const formattedName = name.replace(/[^a-zA-Z\s]/g, '').slice(0, 30); // Assuming a max length of 30
        setName(formattedName);
    };

    // For Expiry (No changes needed as it's already formatted correctly, just ensure length restriction)
    const handleExpiryChange = (date) => {
        const formattedDate = date.replace(/[^0-9]/g, '').replace(/(\d{2})(\d{2})/, '$1/$2').slice(0, 5);
        setExpiry(formattedDate);
    };

    // Obtener el id del usuario y solicitar permisos de notificación
    useEffect(() => {
        const cargarIdUsuarioYPedirPermisos = async () => {
            // Cargar el ID del usuario
            const storedIdUsuario = await AsyncStorage.getItem('idUser');
            setIdUsuario(storedIdUsuario);

            // Cargar tarjetas guardadas
            // API para obtener las tarjetas guardadas
            const result = await obtenerTarjetas(storedIdUsuario);
            console.log(result);

            // Obtener permisos de notificación
            // Solicitar permisos de notificación
            const { status } = await Notifications.requestPermissionsAsync();
            if (status !== 'granted') {
                alert('Se requieren permisos de notificación para esta funcionalidad.');
            }

            Notifications.setNotificationHandler({
                handleNotification: async () => ({
                    shouldShowAlert: true,
                    shouldPlaySound: true,
                    shouldSetBadge: false,
                }),
            });
        };

        cargarIdUsuarioYPedirPermisos();
    }, []);

    // Lógica para confirmar con notificación
    const confirmarPedido = async () => {
        // Aquí puedes agregar la lógica para confirmar el pedido, por ejemplo, llamando a una API
        // Mostrar una notificación de confirmación
        await Notifications.scheduleNotificationAsync({
            content: {
                title: 'Pedido Confirmado',
                body: 'Tu pedido ha sido confirmado exitosamente.',
                sound: 'default',
                priority: Notifications.AndroidNotificationPriority.HIGH,
                categoryIdentifier: 'pedido',
                color: 'blue',
                autoDismiss: true,
                icon: logoGood,
            },
            trigger: null,
        });
    };

    // Cambiar el título de la pantalla
    useLayoutEffect(() => {
        navigate.setOptions({
            headerTitle: () => (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}>Pagar con Tarjeta</Text>
                    <Image
                        source={logo} // Reemplaza con la URL de tu imagen
                        style={{ width: 50, height: 50, marginLeft: 20, marginBottom: 10 }}
                    />
                </View>
            ),
        });
    }, [navigate, cardNumber, name, expiry, cvv]);

    // Función para manejar el botón de pagar
    const handlePress = () => {
        // Validar los campos
        if (!cardNumber || cardNumber.length < 19) {
            setErrors({ cardNumber: 'Número de tarjeta inválido' });
            return;
        }
        if (!name || name.length < 3) {
            setErrors({ name: 'Nombre inválido' });
            return;
        }
        if (!expiry || expiry.length < 5) {
            setErrors({ expiry: 'Fecha de vencimiento inválida' });
            return;
        }
        if (!cvv || cvv.length < 3) {
            setErrors({ cvv: 'CVV inválido' });
            return;
        } else {
            // Si todo está correcto, mostrar el alert
            Alert.alert(
                'Opciones de Pago',
                '¿Deseas guardar la tarjeta?',
                [
                    {
                        text: 'Cancelar',
                        onPress: () => console.log('Cancelado'),
                        style: 'cancel',
                    },
                    {
                        text: 'Guardar Tarjeta y Confirmar Pedido',
                        onPress: async () => {
                            // Lógica para guardar la tarjeta y enviar el pedido por correo
                            const result = await guardarTarjeta(idUsuario, cardNumber, name, expiry, cvv);

                            if (result && typeof result === 'object') {
                                const { success, message } = result;
                                if (success) {
                                    Alert.alert("Éxito", message);
                                } else {
                                    Alert.alert("Error", message);
                                }
                            } else {
                                Alert.alert("Error", "Ocurrió un error al guardar la tarjeta.");
                            }
                        },
                    },
                ],
                { cancelable: false }
            );
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.cardContainer}>
                <ImageBackground
                    source={isCvvFocused ? require('../img/credit_card_back.png') : require('../img/credit_card.png')}
                    style={isCvvFocused ? styles.cardImageBack : styles.cardImageFront}
                >
                    {!isCvvFocused && (
                        <>
                            <Text style={styles.cardNumber}>{cardNumber || 'XXXX XXXX XXXX XXXX'}</Text>
                            <Text style={styles.cardName}>{name || 'NOMBRE DEL TITULAR'}</Text>
                            <Text style={styles.cardExpiry}>{expiry || 'MM/AA'}</Text>
                        </>
                    )}
                    {isCvvFocused && <Text style={styles.cardCvv}>{cvv || 'CVV'}</Text>}
                </ImageBackground>
            </View>
            <TextInput
                label="Número de Tarjeta"
                value={cardNumber}
                onChangeText={handleCardNumberChange}
                style={styles.input}
                keyboardType="numeric"
                error={!!errors.cardNumber}
            />
            {errors.cardNumber && <Text style={styles.error}>{errors.cardNumber}</Text>}
            <TextInput
                label="Nombre del Titular"
                value={name}
                onChangeText={handleNameChange}
                style={styles.input}
                error={!!errors.name}
            />
            {errors.name && <Text style={styles.error}>{errors.name}</Text>}
            <TextInput
                label="Fecha de Vencimiento (MM/AA)"
                value={expiry}
                onChangeText={handleExpiryChange}
                style={styles.input}
                keyboardType="numeric"
                error={!!errors.expiry}
            />
            {errors.expiry && <Text style={styles.error}>{errors.expiry}</Text>}
            <TextInput
                label="CVV"
                value={cvv}
                onChangeText={(text) => {
                    const formattedCvv = text.replace(/\D/g, '').slice(0, 3); // Remove non-digits and limit length to 3
                    setCvv(formattedCvv);
                    setIsCvvFocused(true);
                }}
                onBlur={() => setIsCvvFocused(false)}
                style={styles.input}
                keyboardType="numeric"
                secureTextEntry
                error={!!errors.cvv}
            />
            {errors.cvv && <Text style={styles.error}>{errors.cvv}</Text>}
            <TouchableOpacity style={styles.button} onPress={handlePress}>
                <Text style={{ color: 'white', fontSize: 18 }}>Pagar</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f8f9fa', // Color de fondo más claro
        padding: 20,
        flex: 1,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#343a40', // Color de texto más oscuro
        marginBottom: 20,
    },
    cardContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    cardImageFront: {
        width: wp('100%'),
        height: hp('20%'),
        padding: 20,
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: '#ffffff', // Fondo blanco para la tarjeta
    },
    cardCvv: {
        fontSize: 16,
        color: '#ffffff', // Texto blanco
        position: 'absolute',
        right: 20,
        top: 25,
    },
    cardImageBack: {
        width: wp('60%'),
        height: hp('20%'),
        padding: 20,
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: '#ffffff', // Fondo blanco para la tarjeta
    },
    cardNumber: {
        fontSize: 16,
        color: '#495057', // Texto gris oscuro
        marginBottom: 10,
        position: 'absolute',
        top: 30,
        left: 100,
    },
    cardName: {
        fontSize: 15,
        color: '#495057', // Texto gris oscuro
        position: 'absolute',
        bottom: 10,
        left: 85,
    },
    cardExpiry: {
        fontSize: 16,
        color: '#495057', // Texto gris oscuro
        position: 'absolute',
        bottom: 40,
        right: 120,
    },
    input: {
        color: '#495057', // Texto gris oscuro
        marginBottom: 15,
        fontSize: 18,
        backgroundColor: '#e9ecef', // Fondo gris claro
        borderRadius: 5,
        paddingHorizontal: 15,
    },
    button: {
        backgroundColor: '#28a745', // Azul para el botón
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
    },
    error: {
        color: '#dc3545', // Rojo para los errores
        marginBottom: 10,
    },
});

export default PagarTarjeta;
