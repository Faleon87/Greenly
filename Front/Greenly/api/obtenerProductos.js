// api.js
const obtenerProductos = async () => {
    try {
      const respuesta = await fetch('http://greenly.ddns.net:3000/productos/card');
      const productos = await respuesta.json();
      return productos;
    } catch (error) {
      console.error(error);
      return []; // Retorna un array vacío en caso de error
    }
  };
  
  export { obtenerProductos };