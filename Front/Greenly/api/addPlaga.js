export const addPlaga = async (plaga) => {

    console.log('Plant:', plaga);

    const API_URL = 'http://greenly.ddns.net:3000';

    const response = await fetch(`${API_URL}/plagas/add`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(plaga),
    });

    return await response.json();
  };