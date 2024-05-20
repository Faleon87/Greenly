

export const saveData = async (idUser, question, description, plant, image) => {
    
  
    const response = await fetch('http://192.168.0.22:3000/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            question: question,
            description: description,
            plant: plant,
            image: image,
            idUser: idUser
        })
    });

    if (!response.ok) {
        throw new Error('Something went wrong!');
    }
};