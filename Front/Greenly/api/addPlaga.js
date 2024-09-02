export const addPlaga = async (plaga) => {

    console.log('Plant:', plaga);

    const API_URL = 'http://192.168.0.22:3000';

    const response = await fetch(`${API_URL}/plagas/add`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(plaga),
    });

    return await response.json();
  };