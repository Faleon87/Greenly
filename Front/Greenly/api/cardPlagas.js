export async function cardPlagas() {
    try {
        const response = await fetch('http://3.80.72.197:3000/plagas/cards');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const plagas = data.map(plaga => ({
            idPlaga: plaga.idPlaga,
            nombrePlaga: plaga.nombrePlaga,
            img: plaga.img,
        }));
        console.log(plagas);
        return plagas;
    } catch (error) {
        console.error('There was a problem with the fetch operation: ', error);
    }
}