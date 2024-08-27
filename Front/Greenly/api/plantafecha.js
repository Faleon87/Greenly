

// Actualiza los datos del usuario
export const plantafecha = async (fecha, idUser) => {
    // Mostrar alerta con los datos (opcional)
    try {

        const response = await fetch(`http://44.192.55.84:3000/calendar/plantas/ ` + fecha + `/${idUser}`, { // Usar idUser en lugar de id
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            
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

export default plantafecha;