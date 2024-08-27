export const DetallesPlanta = async (idPlanta) => {
    try {
      const response = await fetch(`http://44.192.55.84:3000/plantas/${idPlanta}`);
      const data = await response.json();
      return data;

    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  };