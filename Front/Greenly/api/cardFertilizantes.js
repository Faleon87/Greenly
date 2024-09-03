export async function cardFertilizantes() {
    try {
        const response = await fetch('http://greenly.ddns.net:3000/fertilizantes/cards');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Datos recibidos de la API:', data); // Log para ver los datos recibidos
        return data;
    } catch (error) {
        console.error('There was a problem with the fetch operation: ', error);
    }
}