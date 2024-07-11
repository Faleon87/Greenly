

export const guardarDatosCarrito = async (idUser, idProducto) => {

    try {
        const url = `http://192.168.0.22:3000/carrito/add`; // Asegúrate de que esta URL es correcta
        const data = {
            idUser: Number(idUser), // Asegúrate de que es un número
            idProducto: Number(idProducto) // Asegúrate de que es un número
        };

        console.log("Datos a enviar:", JSON.stringify(data));

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });


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