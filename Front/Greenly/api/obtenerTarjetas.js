const obtenerTarjetas = async (idUsuario) => {
    const url = `http://192.168.0.22:3000/tarjeta/guardadas/${idUsuario}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
}


export default obtenerTarjetas;






