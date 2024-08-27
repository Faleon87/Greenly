// api.js
export const updateFertilizante = async (id, item) => {
    console.log('id:', id, 'item:', item);
  
    try {
      const response = await fetch(`http://44.192.55.84:3000/fertilizantes/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
      });

      if (!response.ok) {
        // Si la respuesta no es OK, lanza un error con el texto de la respuesta
        const errorText = await response.text();
        throw new Error(`Error ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      console.log('Response data:', data);
      return data;
    } catch (error) {
      console.error('Fetch error:', error);
      throw error;
    }
};