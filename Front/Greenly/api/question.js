import { Alert } from "react-native";

export const saveData = async (navigator, idUser, question, description, plant, image) => {
    const response = await fetch('http://44.192.55.84:3000/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            question: question,
            description: description,
            plant: plant,
            image: image,
            idUser: idUser
        })
    });
    const data = await response.json();
    console.log(data + 'data');

    Alert.alert('Pregunta enviada', 'La pregunta se ha enviado correctamente');
    navigator.pop();

    if (!response.ok) {
        throw new Error('Something went wrong!');
    }

    return data;
};