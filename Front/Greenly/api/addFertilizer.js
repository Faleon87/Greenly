export const addFertilizer = async (fertilizer) => {
  console.log('Fertilizer:', fertilizer);

  try {
    const body = JSON.stringify(fertilizer);
    console.log('Request Body:', body);

    const response = await fetch('http://greenly.ddns.net:3000/fertilizantes/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: body,
    });

    if (!response.ok) {
      throw new Error('Error al añadir el fertilizante');
    }

    return data = await response.text();
  } catch (error) {
    console.error('Error en addFertilizer:', error);
    throw error;
  }
};