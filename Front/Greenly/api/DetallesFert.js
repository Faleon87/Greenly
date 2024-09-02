export const DetallesPlanta = async (id) => {
    try {

        console.log('Fetching data for ID:', id);

      const response = await fetch(`http://192.168.0.22:3000/fertilizantes/detalle/${id}`);
      const data = await response.json();
      return data;

    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  };

export default DetallesPlanta;