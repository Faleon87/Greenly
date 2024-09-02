export const getChat = async () => {
        const response = await fetch(`http://192.168.0.22:3000/chat/renderchat`, {
            method: 'GET',
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data, 'data');

        if (!data || !Array.isArray(data.fotoPreguntasResult) || !Array.isArray(data.likesResult) || !Array.isArray(data.preguntaResult)) {
            throw new Error('Data is null or missing required properties');
        }

       return data;
};

export default getChat;