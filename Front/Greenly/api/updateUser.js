import React from 'react';
import { Alert } from 'react-native';

// Actualiza los datos del usuario
export const updateUser = async (idUser, nombre, username, apellido, email, password) => {

 // Alerta con los datos a actualizar
 
    Alert.alert('Datos a actualizar', 'Nombre: ' + nombre + '\nUsername: ' + username + '\nApellido: ' + apellido + '\nEmail: ' + email + '\nContraseña: ' + password + '\nID: ' + idUser);

   

    // Preparar los datos para actualizar
    const updatedData = {
        nombre,
        username,
        apellido,
        email,
        password,
    };

    console.log('Datos a enviar:', JSON.stringify(updatedData));

    // Mostrar alerta con los datos (opcional)
    try {
        
        const response = await fetch(`http://192.168.0.22:3000/user/update/${idUser}`, { // Usar idUser en lugar de id
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData),
        });

        console.log('Respuesta:', response);

        if (!response.ok) {
            throw new Error('HTTP error ' + response.status);
        }

        const data = await response.json();

        return data;
    } catch (error) {
        console.error('Error:', error);
    }
};

export default updateUser;