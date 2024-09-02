// deletePlantas.js
export const deletePlagas = async (id) => {
    try {
      const response = await fetch(`http://192.168.0.22:3000/plagas/delete/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      // Verifica si la respuesta es exitosa
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
  
      // Devuelve la respuesta JSON
      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };

  export default deletePlagas;