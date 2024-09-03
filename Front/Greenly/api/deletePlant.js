// deletePlantas.js
export const deletePlant = async (id) => {
  console.log('ID:', id); // ID: 1

  try {
    const response = await fetch(`http://greenly.ddns.net:3000/plantas/${id}`, {
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