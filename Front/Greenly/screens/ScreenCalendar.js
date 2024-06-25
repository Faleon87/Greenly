import React, { useState, useEffect, useNavigation } from 'react'; // Asegúrate de importar useState y useEffect desde 'react'
import { View, Text, Button, FlatList, Image, Modal, StyleSheet, TouchableOpacity, Alert } from 'react-native'; // Ajusta la ruta según sea necesario
import { Calendar } from 'react-native-calendars'; // Ajusta la ruta según sea necesario
import { getPlantas } from '../api/getPlantas'; // Ajusta la ruta según sea necesario
import DateTimePicker from '@react-native-community/datetimepicker'; // Asumiendo que se usa esta librería para el DatePicker
import { Picker } from '@react-native-picker/picker'; // Asumiendo que se usa esta librería para el Picker
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TextInput } from 'react-native-paper';

const App = () => {


  const [plantasPorMes, setPlantasPorMes] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [mesInput, setMesInput] = useState('');
  const [plantas, setPlantas] = useState([]);
  const [plantaActual, setPlantaActual] = useState();
  const [isPickerVisible, setIsPickerVisible] = useState(false);
  const [fechaSeleccionada, setFechaSeleccionada] = useState(new Date());

  const [plantaSeleccionada, setPlantaSeleccionada] = useState([]);


  const [plantasGuardadas, setPlantasGuardadas] = useState({});
  const [accionSeleccionada, setAccionSeleccionada] = useState('sembrar');

  const fechaFormateada = fechaSeleccionada.toISOString().split('T')[0];

  const guardarPlanta = () => {
    setModalVisible(false);
    setPlantasGuardadas(prev => ({
      ...prev,
      [fechaFormateada]: plantas.find(planta => planta.id === plantaActual).nombre
    }));


    Alert.alert('Planta guardada', `Se ha guardado la planta ${plantas.find(planta => planta.id === plantaActual).nombre} para el día ${fechaFormateada}`);
  };


  useEffect(() => {
    if (modalVisible) {
      getPlantas()
        .then(data => {
          const plantasConIdYNombre = data.map(planta => ({
            id: planta.idPlanta,
            nombre: planta.nombrePlanta
          }));
          setPlantas(plantasConIdYNombre);
          console.log(plantasConIdYNombre);
          if (plantasConIdYNombre.length > 0) {
            setPlantaActual(plantasConIdYNombre[0].id); // Establece la planta actual como la primera planta por defecto
          }


        })
        .catch(console.error);
    }
  }, [modalVisible]);


  const seleccionarPlantaPorFecha = (fecha) => {
    // Filtra la planta por la fecha seleccionada
    const planta = plantasGuardadas[fecha] ? [{ fecha, planta: plantasGuardadas[fecha] }] : [];
    setPlantaSeleccionada(planta);
  };



  return (
    <View style={{ flex: 1 }}>
      <Calendar
        onDayPress={(day) => {
          Alert.alert('Seleccionaste el día:', day.dateString);
          seleccionarPlantaPorFecha(day.dateString);
        }}
      />

      <Text style={styles.plantasGuardadas}>Planta guardada para sembrar</Text>
      <FlatList
        data={plantaSeleccionada}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Text>{item.planta} - {item.fecha}</Text>
        )}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => { setModalVisible(!modalVisible); }}
      >
        <View style={styles.modalView}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
          <Picker
            selectedValue={plantaActual}
            onValueChange={(itemValue, itemIndex) => setPlantaActual(itemValue)}
            style={{ width: '100%', height: 100 }} // Ajustar el alto si es necesario
          >
            {plantas.map(planta => (
              <Picker.Item key={planta.id} label={planta.nombre} value={planta.id} />
            ))}
          </Picker>
          <TouchableOpacity
            onPress={() => setIsPickerVisible(true)}
            style={styles.datePickerButton}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Icon name="calendar-today" size={30} color="green" />
              {fechaSeleccionada && <Text style={styles.fechaSeleccionada}>{fechaSeleccionada.toDateString()}</Text>}
            </View>
          </TouchableOpacity>
          <Picker
              selectedValue={accionSeleccionada}
              onValueChange={(itemValue, itemIndex) => setAccionSeleccionada(itemValue)}
              style={{ width: '100%', height: 100 }} // Ajustar el alto si es necesario
            >
              <Picker.Item label="Sembrar" value="sembrar" />
              <Picker.Item label="Cosechar" value="cosechar" />
            </Picker>



          {isPickerVisible && (
            <DateTimePicker
              value={fechaSeleccionada}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                if (selectedDate) {
                  setFechaSeleccionada(selectedDate);
                  setIsPickerVisible(false); // Oculta el DateTimePicker después de seleccionar una fecha

                }
              }}
            />
          )}
          <Button title="Guardar" onPress={guardarPlanta} />
        </View>
      </Modal>
      <FlatList data={plantasPorMes[mesInput]} keyExtractor={(item, index) => index.toString()} renderItem={({ item }) => (
        <View>
          <Text>{item.nombre}</Text>
          <Image source={{ uri: item.imagenUrl }} style={{ width: 100, height: 100 }} />
        </View>
      )} />
      <TouchableOpacity style={styles.floatingButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
    </View >
  );
};

const styles = StyleSheet.create({
  floatingButton: {
    backgroundColor: 'blue',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 24,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 10,
    // Añadir un ligero fondo oscuro para resaltar el modal
    backgroundColor: '#F7F7F7'
  },
  closeButton: {
    position: 'absolute',
    left: 10,
    top: 15,
    backgroundColor: 'lightgrey', // Fondo para hacerlo más visible
    width: 30,
    height: 30,
    borderRadius: 15, // Bordes redondeados para hacerlo más amigable
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 24,
    color: '#333', // Color más suave que el rojo puro
  },
  fechaSeleccionada: {
    fontSize: 18,
    marginLeft: 10,
  },
  plantasGuardadas: {
    fontSize: 20,
  },
});

export default App;