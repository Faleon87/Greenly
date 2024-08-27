// Description: This file contains the routes for the plantas.
export function fetchPlants() {
    return fetch('http://3.80.72.197:3000/plantas', { method: 'GET' })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation: ', error);
        });
}