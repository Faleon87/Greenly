import React, { useState, useEffect, useRef } from 'react';
import { Text, View, TouchableOpacity, Alert } from 'react-native';
import { Camera } from 'expo-camera';
import { identifyPlant } from '../api/cameraPlants'; // Asegúrate de que esta ruta de importación sea correcta

export default function CameraScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePhotoAndIdentifyPlant = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      try {
        const plantName = await identifyPlant(photo.uri);
        Alert.alert('Planta identificada', `La planta es: ${plantName}`);
      } catch (error) {
        Alert.alert('Error', 'No se pudo identificar la planta');
      }
    }
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={{ flex: 1 }}>
      <Camera style={{ flex: 1 }} type={type} ref={cameraRef}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            style={{
              flex: 0.1,
              alignSelf: 'flex-end',
              alignItems: 'center',
            }}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
            <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flip </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flex: 0.1,
              alignSelf: 'flex-end',
              alignItems: 'center',
            }}
            onPress={takePhotoAndIdentifyPlant}>
            <Text style={{ fontSize: 18, marginBottom:  100,marginLeft:200, color: 'white', width: 200 }}> Identificar Planta</Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}