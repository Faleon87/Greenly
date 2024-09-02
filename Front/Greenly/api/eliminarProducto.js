
// api.js
export const deleteProduct = async (idProducto, idUser) => {
    console.log("idProducto:", idProducto, "idUser:", idUser);
    const response = await fetch(`http://192.168.0.22:3000/carrito/delete?idUser=${idUser}&idProducto=${idProducto}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const data = await response.json();
    console.log('Success:', data);
    return data;

};