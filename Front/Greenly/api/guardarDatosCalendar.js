// Esta función se encarga de guardar los datos de un evento en el calendario de una planta

export const guardarDatosCalendar = async (idUsuario, fecha, tipoAccion, idPlanta) => {
    try {
        const url = `http://192.168.0.22:3000/calendar/plantas`; // Asegúrate de que esta URL es correcta
        const data = {
            idUsuario: Number(idUsuario), // Asegúrate de que es un número
            fecha: fecha, // Convierte la fecha a un objeto Date y luego a una cadena en formato YYYY-MM-DD
            tipoAcción: tipoAccion, // Asegúrate de que es una cadena y no supera los 255 caracteres
            idPlanta: Number(idPlanta) // Asegúrate de que es un número
        };

        console.log("Datos a enviar:", JSON.stringify(data));

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        console.log("Respuesta:", response.data);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData = await response.json();
        console.log(responseData);
        return responseData;
    } catch (error) {
        console.error('Error en guardarDatosCalendar:', error);
        return null;
    }
};