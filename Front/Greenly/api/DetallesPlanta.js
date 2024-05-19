export const DetallesPlanta = async (idPlanta) => {
    try {
      const response = await fetch(`your_api_endpoint/${idPlanta}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  };