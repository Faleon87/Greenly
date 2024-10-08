const comprobarPassword= async (idUser, password) => {

    const url = `http://greenly.ddns.net:3000/user/comprobarPassword/${idUser}`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
    });
    const data = await response.json();
    console.log(data);
    return data;
}

export default comprobarPassword;