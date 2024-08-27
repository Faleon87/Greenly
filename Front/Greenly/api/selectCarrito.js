
export const selectCarrito = async (idUsuario) => {
    console.log("idUsuario:", idUsuario);
    try {
        const response = await fetch(`http://44.192.55.84:3000/carrito/list/?idUser=${idUsuario}`); // Incluye idUsuario en la URL
        const data = await response.json();
        console.log("data:", data);
        return data;
    } catch (error) {
        console.error('Error fetching productos:', error);
        return [];
    }
};