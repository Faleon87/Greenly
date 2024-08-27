export const addFertilizer = async (fertilizer) => {
    try {
      const response = await fetch('http://44.192.55.84:3000//fertilizantes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(fertilizer),
      });
  
      if (!response.ok) {
        throw new Error('Error al añadir el fertilizante');
      }
  
      return await response.json();
    } catch (error) {
      console.error('Error en addFertilizer:', error);
      throw error;
    }
  };