export const getPregunta = async (idPregunta) => {
    try {
        const response = await fetch(`http://192.168.0.22:3000/chat/pregunta/${idPregunta}`, {
            method: 'GET',
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

export default getPregunta;