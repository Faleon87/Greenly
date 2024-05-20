// ImagePicker.js
import React from 'react';
import { Image, View, TouchableOpacity, Text, Alert } from 'react-native'; // Importa el componente Text
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function ImagePickerExample({ onImageSelect}) {
  const [image, setImage] = React.useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });


    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      onImageSelect(result.assets[0].uri);
    }


  };

  

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <TouchableOpacity onPress={pickImage}>
        <Text> {/* Envuelve el ícono en un componente Text */}
          <Icon name="upload" size={30} color="#333333"  />
        </Text>
      </TouchableOpacity>
      
    </View>
  );
}