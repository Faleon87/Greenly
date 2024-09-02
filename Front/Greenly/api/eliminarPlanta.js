import { Alert } from "react-native";

const eliminarPlanta = async (fecha, idUser, planta, accionSeleccionada) => {

    Alert.alert('Eliminar', fecha + ' ' + idUser + ' ' + planta); ;

    const url = `http://192.168.0.22:3000/calendar/delete/${fecha}/${idUser}/${planta}/${accionSeleccionada}`; 
    const response = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const data = await response.json();
    console.log(data);
    return data;
}

export default eliminarPlanta;