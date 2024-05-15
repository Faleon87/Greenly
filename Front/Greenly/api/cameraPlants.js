// Propósito: Contiene las funciones para identificar plantas a partir de una imagen de la cámara
import { TocketPlant } from '@env'
import * as FileSystem from 'expo-file-system';
import { Alert } from 'react-native';

export async function identifyPlant(imageUri) {
  console.log(imageUri + "api");
  try {
    let apiUrl = 'https://api.plant.id/v2/identify';
    let formData = new FormData();

    // Convertir la imagen a base64
    let image = await FileSystem.readAsStringAsync(imageUri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    console.log(image);

    formData.append('organs', 'leaf');
    formData.append('organs', 'flower');
    formData.append('images', image);

    let response = await fetch(apiUrl, {
      method: 'POST',
      body: formData,
      headers: {
        'Api-Key': "nFGWdGSTGYGG4iQED75mZWCBR6cOIGhUdLAp3JZXEWnWReGBlw",
        'Content-Type': 'multipart/form-data',
      },
    });

    let data = await response.text();
    let plantName = data.suggestions[0].plant_name; // Nombre científico de la planta

    let trefleResponse = await fetch(`https://api.trefle.io/v1/plants/search?token=orpA3rmln5tthbEZJLb7MXOG1H603-ep27pYS8pE6kw&q=${plantName}`);
    let trefleData = await trefleResponse.json();

    let commonName = trefleData.data[0].common_name;

    console.log(commonName); // Nombre común de la planta

    Alert.alert(
      'Planta identificada',
      `Nombre común: ${commonName}\nNombre científico: ${plantName}`,
    );


    // Resto de tu código...
  } catch (error) {
    console.error(error);
  }
}