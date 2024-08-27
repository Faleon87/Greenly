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
        const response = await fetch(`http://44.192.55.84:3000/user/update/${idUser}`, { // Usar idUser en lugar de id
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData),
        });

        console.log('Respuesta:', response);

        const data = await response.json();

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }else{
            Alert.alert('Datos actualizados', 'Los datos se han actualizado correctamente');
        }

        return data;
    
};

export default updateUser;