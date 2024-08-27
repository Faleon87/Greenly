export async function getPlantas() {
    try {
        const response = await fetch('http://3.80.72.197:3000/plantas/cards');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const plantas = data.map(planta => ({
            idPlanta: planta.idPlanta,
            nombrePlanta: planta.nombrePlanta,
            img: planta.img,
            nombreCientifico: planta.nombreCientifico,
        }));

        console.log(plantas);
        return plantas;
    } catch (error) {
        console.error('There was a problem with the fetch operation: ', error);
    }
}