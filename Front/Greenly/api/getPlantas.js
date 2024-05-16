async function getPlantas() {
    try {
        const response = await fetch('https://api.example.com/plantas');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const plantas = data.map(planta => ({
            id: planta.id,
            nombrecomun: planta.nombrecomun,
            img: planta.img
        }));
        return plantas;
    } catch (error) {
        console.error('There was a problem with the fetch operation: ', error);
    }
}