import { Alert } from "react-native";

// reportService.js
export const reportQuestion = async (idPregunta, idUser) => {
    console.log('reportQuestion called with:', idPregunta, idUser);
    Alert.alert('Debug', `reportQuestion called with: ${idPregunta}, ${idUser}`);

    try {
        const response = await fetch('http://3.80.72.197:3000/chat/report', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                idPregunta: idPregunta,
                idUser: idUser,
            }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log('reportQuestion response data:', data);
        Alert.alert('Debug', `reportQuestion response data: ${JSON.stringify(data)}`);
        return data;
    } catch (error) {
        console.error('Error reporting question:', error);
        Alert.alert('Error', `Error reporting question: ${error.message}`);
        throw error;
    }
};
export default reportQuestion;