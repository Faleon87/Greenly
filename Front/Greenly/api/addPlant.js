export const addPlant = async (plant) => {

    console.log('Plant:', plant);

    const API_URL = 'http://44.192.55.84:3000/';

    const response = await fetch(`${API_URL}/plantas/add`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(plant),
    });

    

    return await response.json();
  };