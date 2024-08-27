// api.js
const obtenerProductos = async () => {
    try {
      const respuesta = await fetch('http://44.192.55.84:3000/productos/card');
      const productos = await respuesta.json();
      return productos;
    } catch (error) {
      console.error(error);
      return []; // Retorna un array vacío en caso de error
    }
  };
  
  export { obtenerProductos };