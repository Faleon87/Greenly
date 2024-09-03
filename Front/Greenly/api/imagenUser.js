const selectImg = async (idUser) => {
    try {
        const response = await fetch(`http://greenly.ddns.net:3000/user/perfil/${idUser}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const base64Data = await response.text();
        console.log('Base64 data:', base64Data);
        return base64Data;
    } catch (error) {
        console.log('Error fetching user data:', error);
    }
};

export default selectImg;