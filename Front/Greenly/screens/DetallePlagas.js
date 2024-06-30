import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { View, Text, Alert, Animated, StyleSheet, ImageBackground, ScrollView, Image } from 'react-native';
import { DetallesPlagas } from '../api/DetallesPlaga';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const DetallePlagas = ({ route, navigation }) => {
    const { idPlaga } = route.params;
    const [plaga, setPlaga] = useState(null);
    const scrollY = useRef(new Animated.Value(0)).current;

    useLayoutEffect(() => {
        if (plaga) {
            navigation.setOptions({
                headerTitle: () => (
                    <View style={{ marginHorizontal: 10 }}>
                        <Text style={styles.headerPlaga}>
                            {plaga.nombrePlaga}
                        </Text>
                    </View>
                ),
                headerTintColor: 'white',
                headerTransparent: true,
                headerBackground: () => ( // Add this block
                    <Animated.View
                        style={{
                            ...StyleSheet.absoluteFill,
                            backgroundColor: '#000',
                            opacity: scrollY.interpolate({
                                inputRange: [0, 100],
                                outputRange: [0, 0.8],
                                extrapolate: 'clamp',
                            }),
                        }}
                    />
                ),
            });
        }
    }, [plaga, navigation, scrollY]); // Add scrollY here




    useEffect(() => {
        const getPlagas = async () => {
            try {
                const data = await DetallesPlagas(idPlaga);
                if (data) {
                    setPlaga(data);
                } else {
                    Alert.alert('Error', 'No data found for the specified ID');
                }
            } catch (error) {
                console.error('Error:', error);
                Alert.alert('Error', 'Failed to load data for the specified ID');
            }
        };

        getPlagas();
    }, [idPlaga]);

    const handleImageError = () => {
        Alert.alert('Error', 'Failed to load image');
    }

    const cleanText = (text) => {
        if (typeof text !== 'string') {
            // Opción 1: Convertir a string si no lo es (puede no ser lo ideal dependiendo del caso)
            text = String(text);
            // Opción 2: Retornar un valor predeterminado o manejar el error de otra manera
            // return ''; // Retorna una cadena vacía si text no es una cadena
            // throw new Error('cleanText expects a string'); // Lanza un error si text no es una cadena
        }

        return text
            .trim() // remove spaces at the start and end
            .replace(/\s+/g, ' ') // replace multiple spaces with a single space
            .replace(/\.([^ ])/g, '.\n$1'); // add a newline after a period if it's not already there
    };

    return (
        <Animated.ScrollView style={styles.container}
            onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                { useNativeDriver: false }
            )}
            scrollEventThrottle={16}
        >
            <ImageBackground source={{ uri: plaga?.img }} style={styles.image} onError={handleImageError} >
                <View style={styles.imageOverlay} />
            </ImageBackground>
            <View style={styles.textContainer}>
                <Text style={styles.fieldTitle}>Descripcion: </Text>
                <Text style={styles.descripcion}>{cleanText(plaga?.descripcion)}</Text>
                <Text style={styles.fieldTitle}>Acciones preventivas: </Text>
                <Text style={styles.descripcion}>{cleanText(plaga?.accionesPreventivas)}</Text>
                <Text style={styles.fieldTitle}>Lucha Directa: </Text>
                <Text style={styles.descripcion}>{cleanText(plaga?.luchaDirecta)}</Text>
            </View>
        </Animated.ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        marginBottom: 10,
    },
    headerPlaga: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        width: wp('80%'),
        height: hp('7%'),
        textAlign: 'left',
        marginTop: hp('3%'),
    },
    imageOverlay: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        height: '100%',
    },
    fieldTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2C1001',
    },
    textContainer: {
        padding: 20,
        textAlign: 'left',
    },
    descripcion  : {
        fontSize: 16,
        color: '#2C1001',
        marginTop: 10,
        marginBottom: 10,
        textAlign: 'justify',
    },

});

export default DetallePlagas;