import React, { useState } from 'react';
import { View, TouchableOpacity, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import * as FileSystem from 'expo-file-system';
import Icon from 'react-native-vector-icons/FontAwesome';

const ImagePickerComponent = ({ onImageSelect }) => {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        const imageUri = result.assets[0].uri;

        // Manipular la imagen
        const manipulatedImage = await ImageManipulator.manipulateAsync(
          imageUri,
          [{ resize: { width: 800 } }],
          { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
        );

        // Obtener el tamaño del archivo manipulado
        const manipulatedFileInfo = await FileSystem.getInfoAsync(manipulatedImage.uri);
        console.log(`Tamaño de la imagen manipulada: ${manipulatedFileInfo.size / (1024 * 1024)} MB`);

        // Verificar si la imagen es demasiado grande
        if (manipulatedFileInfo.size > 5 * 1024 * 1024) {  // 5 MB límite
          Alert.alert("Imagen demasiado grande", "Por favor selecciona una imagen más pequeña.");
          return;
        }

        // Leer la imagen manipulada como base64
        const base64Image = await FileSystem.readAsStringAsync(manipulatedImage.uri, {
          encoding: FileSystem.EncodingType.Base64,
        });

        // Agregar el prefijo adecuado
        const base64ImageWithPrefix = base64Image;
        console.log(`Imagen Base64: ${base64ImageWithPrefix}`);

        setImage(manipulatedImage.uri);
        onImageSelect(base64ImageWithPrefix);
      }
    } catch (error) {
      console.error("Error picking or processing image: ", error);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <TouchableOpacity onPress={pickImage}>
        <Icon name="upload" size={30} color="#000" />
      </TouchableOpacity>
    </View>
  );
};

export default ImagePickerComponent;