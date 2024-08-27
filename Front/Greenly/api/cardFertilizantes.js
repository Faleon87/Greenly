export async function cardFertilizantes() {
    try {
        const response = await fetch('http://44.192.55.84:3000/fertilizantes/cards');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const fertilizantes = data.map(fertilizantes => ({
            idFertilizante: fertilizantes.idFertilizante,
            nombreFertilizante: fertilizantes.nombreFertilizante,
            tipoFertilizante: fertilizantes.tipoFertilizante,   
            img: fertilizantes.img,
        }));
        console.log(fertilizantes);
        return fertilizantes;
    } catch (error) {
        console.error('There was a problem with the fetch operation: ', error);
    }
}