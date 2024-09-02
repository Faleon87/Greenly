export const guardarTarjeta = async (idUsuario, cardNumber, name, expiry, cvv) => {

    console.log('idUsuario:', idUsuario, 'cardNumber:', cardNumber, 'name:', name, 'expiry:', expiry, 'cvv:', cvv)

    try {
        const response = await fetch('http://192.168.0.22:3000/tarjeta/keepTarjeta', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                idUsuario,
                cardNumber,
                name,
                expiry,
                cvv,
            }),
        });

        if (!response.ok) {
            throw new Error('Error al guardar la tarjeta');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
    }
};