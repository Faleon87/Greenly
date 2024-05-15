// identifyPlant.js
export async function identifyPlant(imageUri) {
    let apiUrl = 'https://api.plant.id/v2/identify';
    let formData = new FormData();
    formData.append('organs', 'leaf');
    formData.append('organs', 'flower');
    formData.append('images', {
      uri: imageUri,
      type: 'image/jpeg',
      name: 'plant.jpg',
    });
  
    let response = await fetch(apiUrl, {
      method: 'POST',
      body: formData,
      headers: {
        'Api-Key': 'nFGWdGSTGYGG4iQED75mZWCBR6cOIGhUdLAp3JZXEWnWReGBlw', // Reemplaza esto con tu clave de API de Plant.id
        'Content-Type': 'multipart/form-data',
      },
    });
  
    let data = await response.json();
  
    if (data && data.suggestions && data.suggestions.length > 0) {
      return data.suggestions[0].plant_name;
    } else {
      throw new Error('No se pudo identificar la planta');
    }
  }