// FormForo.js
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getPlantas } from '../api/getPlantas';
import PlantModal from '../screens/PlantModal';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import ImagePickerExample  from '../screens/ImagePicker';
import { saveData } from '../api/question'; 
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  const navigation = useNavigation();
  const [question, setQuestion] = useState('');
  const [description, setDescription] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [plantas, setPlantas] = useState([]);
  const [selectedPlant, setSelectedPlant] = useState('Nombre cultivo');
  const [image, setImage] = useState(null);

  const fetchPlantas = useCallback(async () => {
    const plantasFromApi = await getPlantas();
    setPlantas(plantasFromApi);
  }, []);

  const getIdUser = async () => {
    try {
      const value = await AsyncStorage.getItem('idUser')
      if(value !== null) {
        return value;
      }
    } catch(e) {
      // error reading value
    }
  }

  const handleSave = async () => {
    if (!question || !description || !selectedPlant || !image) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }

    const idUser = await getIdUser();
      await saveData(navigation,idUser, question, description, selectedPlant, image);
      // Maneja el éxito (por ejemplo, muestra un mensaje o redirige al usuario)
  };



  useEffect(() => {
    fetchPlantas();
  }, [fetchPlantas]);

  const handleSelect = useCallback((selectedPlant) => {
    setSelectedPlant(prev => selectedPlant);
    setModalVisible(prev => false);
  }, []);

  const handleImageSelect = (selectedImage) => {
    setImage(selectedImage);
    Alert.alert('Imagen seleccionada', 'La imagen se ha seleccionado correctamente');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Preguntar a la comunidad</Text>
      <View style={styles.row}>
      <View style={styles.column}>
  <Text style={styles.centeredLabel}>{selectedPlant}</Text>
  <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
    <Text style={styles.buttonText}>Elegir cultivo</Text>
  </TouchableOpacity>

  <PlantModal
    visible={modalVisible}
    onClose={() => setModalVisible(false)}
    onSelect={handleSelect}
    plantas={plantas}
  />
</View>

<View style={styles.column}>
  <Text style={styles.centeredLabel}>Subir imagen</Text>
  <ImagePickerExample onImageSelect={handleImageSelect}/>
</View>
      </View>

      <Text style={styles.label}>Su pregunta para la comunidad</Text>
      <TextInput
        style={[styles.input, question.length >= 255 ? styles.inputError : null]}
        value={question}
        onChangeText={text => {
          if (text.length <= 255) setQuestion(text);
        }}
        maxLength={255}
      />
      <Text style={styles.counter}>{question.length}/255</Text>

      <Text style={styles.label}>Descripción</Text>
      <TextInput
        style={[styles.input, description.length >= 200 ? styles.inputError : null]}
        value={description}
        onChangeText={text => {
          if (text.length <= 200) setDescription(text);
        }}
        maxLength={200}
      />
      <Text style={styles.counter}>{description.length}/200</Text>

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Enviar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  closeButton: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  upload:{
    marginTop: 20,
    alignSelf: 'center',
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333333',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  column: {
    flex: 1,
    marginRight: 10,
  },
  label: {
    textAlign: 'left',
    fontSize: 18,
    marginTop: 20,
    marginBottom: 10,
    color: '#333333',
  },
  centeredLabel: {
    textAlign: 'center',
    fontSize: 18,
    marginTop: 20,
    marginBottom: 10,
    color: '#333333',
  },
  counter: {
    alignSelf: 'flex-end',
    marginTop: 5,
    color: '#333333',
  },
  button: {
    backgroundColor: '#333333',
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    marginTop: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    height: wp('30%'),
    borderColor: '#CCCCCC',
    textAlignVertical: 'top',
    borderWidth: 1,
    marginTop: 10,
    padding: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
  },
    inputError: {
        borderColor: 'red',
    },
});

export default App;