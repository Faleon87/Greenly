import React, { useState, useLayoutEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Image, Alert, TouchableOpacity } from 'react-native';
import  Pregunta  from '../api/Pregunta'; // Asegúrate de ajustar la ruta según tu estructura de archivos

const Respuestas = ({ route }) => {
    const { idPregunta } = route.params;
    console.log(idPregunta, 'idPregunta');

    const [responses, setResponses] = useState([]);
    const [input, setInput] = useState('');
    const [imageUri, setImageUri] = useState('https://example.com/default.jpg');
    const [pregunta, setPregunta] = useState('');

    const handleAddResponse = () => {
        if (input.trim()) {
            setResponses([...responses, input]);
            setInput('');
        }
    };

    useLayoutEffect(() => {
        const fetchData = async () => {
                const data = await Pregunta(idPregunta);          
                setImageUri(data.nombreFoto);
                setPregunta(data.pregunta);
    
                if (data.responses) {
                    setResponses(data.responses);
                }
           
        };

        fetchData();
    }, [idPregunta]);

    return (
        <View style={styles.container}>
            <Image source={{ uri: imageUri }} style={styles.image}  resizeMode='cover'/>
            <Text style={styles.question}>Pregunta:</Text>
            <Text style={styles.responseText}>{pregunta}</Text>
             <Text style={styles.answers}>Respuestas:</Text>
            <FlatList
                data={responses}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.responseContainer}>
                        <Text style={styles.responseText}>{item}</Text>
                    </View>
                )}
            />
            <TextInput
                style={styles.input}
                placeholder="Escribe tu respuesta..."
                value={input}
                onChangeText={setInput}
            />
            <TouchableOpacity onPress={handleAddResponse} style={styles.keepRespuesta}>
                <Text>Agregar respuesta</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: 'white',
    },
    answers: {
        fontSize: 20, 
        margin: 10,
        fontFamily: 'Manrope Bold',
    },
    question: {
        fontSize: 20,
        fontFamily: 'Manrope Bold',
        margin: 10,
    },
    keepRespuesta: {
        backgroundColor: 'lightblue',
        padding: 10,
        margin: 10,
        alignItems: 'center',
    },
    image: {
        justifyContent: 'center',
        alignContent: 'center',
        width: '100%',
        height: 200,
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        marginHorizontal: 10,
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    responseContainer: {
        padding: 10,
        borderBottomColor: '#ccc',
    },
    responseText: {
        fontSize: 16,
        fontFamily: 'Manrope Regular',
        padding: 5,
        marginHorizontal: 10,
    },
});

export default Respuestas;