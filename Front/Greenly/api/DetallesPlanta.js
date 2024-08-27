export const DetallesPlanta = async (idPlanta) => {
    try {
      const response = await fetch(`http://3.80.72.197:3000/plantas/${idPlanta}`);
      const data = await response.json();
      return data;

    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  };