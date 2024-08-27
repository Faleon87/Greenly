import { Alert, Platform } from 'react-native';
import { loadSweetAlert2 } from '../notificaciones/SweetAlert2'; // Asegúrate de que la ruta sea correcta

export const updatePlant = async (id, updatedData) => {
    try {
        const response = await fetch(`http://3.80.72.197:3000/plantas/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData),
        });

        if (!response.ok) {
            throw new Error('HTTP error ' + response.status);
        }

        const data = await response.json();

        if (Platform.OS === 'web') {
            try {
                const Swal = await loadSweetAlert2();
                Swal.fire({
                    title: 'Planta actualizada',
                    text: 'La planta ' + data.nombrePlanta + ' ha sido actualizada correctamente.',
                    icon: 'success',
                    confirmButtonText: 'OK',
                });
            } catch (error) {
                console.error('Error loading SweetAlert2:', error);
                window.alert('La planta ha sido actualizada correctamente.');
            }
        } else {
            Alert.alert('Planta actualizada', 'La planta ha sido actualizada correctamente.');
        }

        return data;
    } catch (error) {
        console.error('Error:', error);

        if (Platform.OS === 'web') {
            try {
                const Swal = await loadSweetAlert2();
                Swal.fire({
                    title: 'Error',
                    text: 'Error al actualizar la planta.',
                    icon: 'error',
                    confirmButtonText: 'OK',
                });
            } catch (error) {
                console.error('Error loading SweetAlert2:', error);
                window.alert('Error al actualizar la planta.');
            }
        } else {
            Alert.alert('Error', 'Error al actualizar la planta.');
        }
    }
};
