import { Alert } from "react-native";

export const updatePlant = async (id, updatedData) => {
    try {
        const response = await fetch(`http://192.168.0.22:3000/plantas/${id}`, {
            method: 'PATCH', // Change this to 'PATCH'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData),
        });

        if (!response.ok) {
            throw new Error('HTTP error ' + response.status);
        }

        const data = await response.json();
        Alert.alert('Planta actualizada', 'La planta ha sido actualizada correctamente.');
        return data;
    } catch (error) {
        console.error('Error:', error);
    }
};