import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { View, Text, Alert, Animated, StyleSheet, ImageBackground, ScrollView, Image, Linking, TouchableOpacity } from 'react-native';
import DetallesFertilizantes from '../api/DetallesFert';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const DetalleFertilizantes = ({ route, navigation }) => {
    const { idFertilizantes } = route.params;
    console.log('Received idFertilizantes:', idFertilizantes); // Verifica que el id se está recibiendo

    const [fertilizante, setFertilizante] = useState(null);
    const scrollY = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const getFertilizantes = async () => {
            console.log('Fetching data for ID:', idFertilizantes);

            try {
                const data = await DetallesFertilizantes(idFertilizantes);
                console.log('Data:', data);
                if (data) {
                    setFertilizante(data);
                } else {
                    Alert.alert('Error', 'No data found for the specified ID');
                }
            } catch (error) {
                console.error('Error:', error);
                Alert.alert('Error', 'Failed to load data for the specified ID');
            }
        };

        getFertilizantes();
    }, [idFertilizantes]);

    const handleLinkPress = (url) => {
        Linking.openURL(url).catch((err) => console.error('Failed to open URL:', err));
    };

    useLayoutEffect(() => {
        if (fertilizante) {
            navigation.setOptions({
                headerTitle: () => (
                    <View style={styles.headerTitleContainer}>
                        <Text style={styles.headerTitleText}>
                            {fertilizante.nombreFertilizante}
                        </Text>
                    </View>
                ),
                headerTintColor: 'white',
                headerTransparent: true,
                headerBackground: () => (
                    <Animated.View
                        style={{
                            ...StyleSheet.absoluteFillObject,
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
    }, [fertilizante, navigation, scrollY]);


    const handleImageError = () => {
        Alert.alert('Error', 'Failed to load image');
    }

    const cleanText = (text) => {
        if (typeof text !== 'string') {
            text = String(text);
        }

        return text
            .trim()
            .replace(/\s+/g, ' ')
            .replace(/\.([^ ])/g, '.\n$1');
    };

    return (
        <Animated.ScrollView style={styles.container}
            onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                { useNativeDriver: false }
            )}
            scrollEventThrottle={16}
        >
            <ImageBackground source={{ uri: fertilizante?.img }} style={styles.image} onError={handleImageError} >
                <View style={styles.imageOverlay} />
            </ImageBackground>
            <View style={styles.textContainer}>
                <Text style={styles.fieldTitle}>Descripción:</Text>
                <Text style={styles.descripcion}>{cleanText(fertilizante?.descripcion)}</Text>
                <Text style={styles.fieldTitle}>Elaboración:</Text>
                <Text style={styles.descripcion}>{cleanText(fertilizante?.elaboracion)}</Text>
                <Text style={styles.fieldTitle}>Ubicación:</Text>
                <TouchableOpacity onPress={() => handleLinkPress(fertilizante?.ubicacion)}>
                    <Text style={styles.link}>https://infoDeEstiercol</Text>
                </TouchableOpacity>
                <Text style={styles.fieldTitle}>Cantidad:</Text>
                <Text style={styles.descripcion}>{cleanText(fertilizante?.cantidad)}</Text>
            </View>
        </Animated.ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    link: {
        color: 'blue',
        textDecorationLine: 'underline',
        textAlign: 'left',
        marginTop: 10,
        fontFamily: 'Manrope Medium',
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        marginBottom: 10,
    }, headerTitleContainer: {
        marginHorizontal: 10,
    },
    headerFertilizante: {
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
        marginTop: 10,
        fontWeight: 'bold',
        color: '#2C1001',
        fontFamily: 'Manrope Bold',
    },
    textContainer: {
        padding: 20,
        textAlign: 'left',
    },
    descripcion: {
        fontSize: 16,
        color: '#2C1001',
        marginTop: 10,
        marginBottom: 10,
        textAlign: 'justify',
        lineHeight: 24,
        fontFamily: 'Manrope Regular',
    },
    headerTitleText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
    },
});

export default DetalleFertilizantes;