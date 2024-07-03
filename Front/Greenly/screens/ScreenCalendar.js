import React, { useState, useEffect, useNavigation } from 'react'; // Asegúrate de importar useState y useEffect desde 'react'
import { View, Text, Button, FlatList, Image, Modal, StyleSheet, TouchableOpacity, Alert, TextInput } from 'react-native'; // Ajusta la ruta según sea necesario
import { Calendar } from 'react-native-calendars'; // Ajusta la ruta según sea necesario
import { getPlantas } from '../api/getPlantas'; // Ajusta la ruta según sea necesario
import DateTimePicker from '@react-native-community/datetimepicker'; // Asumiendo que se usa esta librería para el DatePicker
import { Picker } from '@react-native-picker/picker'; // Asumiendo que se usa esta librería para el Picker
import Icon from 'react-native-vector-icons/MaterialIcons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'; // Ajusta la ruta según sea necesario
import { guardarDatosCalendar } from '../api/guardarDatosCalendar'; // Ajusta la ruta según sea necesario
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {

  const [idUser, setIdUser] = useState(''); // ID de usuario
  const [plantasPorMes, setPlantasPorMes] = useState({}); // Plantas por mes
  const [modalVisible, setModalVisible] = useState(false); // Estado para mostrar u ocultar el modal
  const [mesInput, setMesInput] = useState(''); // Mes seleccionado
  const [plantas, setPlantas] = useState([]); // Plantas disponibles para seleccionar
  const [plantaActual, setPlantaActual] = useState(); // Planta seleccionada en el modal
  const [isPickerVisible, setIsPickerVisible] = useState(false); // Estado para mostrar u ocultar el DateTimePicker
  const [fechaSeleccionada, setFechaSeleccionada] = useState(new Date()); // Fecha seleccionada por defecto
  const [plantaSeleccionada, setPlantaSeleccionada] = useState([]); // Planta seleccionada por fecha
  const [plantasGuardadas, setPlantasGuardadas] = useState({}); // Plantas guardadas por fecha
  const [accionSeleccionada, setAccionSeleccionada] = useState('sembrar'); // Valor por defecto para el Picker
  const [markedDates, setMarkedDates] = useState({}); // Fechas marcadas en el calendario
  const [searchDate, setSearchDate] = useState(''); // Fecha de búsqueda en formato YYYY-MM-DD
  const [currentDate, setCurrentDate] = useState(''); // Fecha actual para el calendario

  useEffect(() => {
    const fetchIdUser = async () => {
      const storedIdUser = await AsyncStorage.getItem('idUser');
      setIdUser(storedIdUser);
    };

    fetchIdUser();
  }, []);

  const handleSearch = () => {
    // Verifica si la fecha ingresada es válida
    if (!searchDate.match(/^\d{4}-\d{2}-\d{2}$/)) {
      Alert.alert('Formato de fecha inválido', 'Por favor, ingresa la fecha en formato YYYY-MM-DD');
      return;
    }
    // Establece la fecha actual en el calendario
    setCurrentDate(searchDate);
    // Marcar la fecha en el calendario
    setMarkedDates({
      [searchDate]: {
        selected: true,
        marked: true,
        selectedColor: 'red',
        dotColor: 'red', // Color del punto marcador
        disableTouchEvent: false, // Si el toque está deshabilitado para la fecha
      },
    });

    //Mostrar datos de la planta seleccionada
    seleccionarPlantaPorFecha(searchDate);
  };



  const seleccionarFechaYMarcar = (day) => {
    // Restablece el estado para incluir solo la nueva fecha marcada
    const newMarkedDates = {
      [day.dateString]: {
        selected: true,
        marked: false,
        selectedColor: 'red',
        dotColor: 'red', // Color del punto marcador
        disableTouchEvent: false, // Si el toque está deshabilitado para la fecha
      },
    };
    // Actualiza el estado con la nueva fecha marcada
    setMarkedDates(newMarkedDates);
  };

  // Formatear la fecha seleccionada para guardarla en el estado
  const fechaFormateada = fechaSeleccionada.toISOString().split('T')[0];

  // Guardar planta seleccionada

  const guardarPlanta = () => {
    setModalVisible(false);
    setPlantasGuardadas(prev => ({
      ...prev,
      [fechaFormateada]: plantas.find(planta => planta.id === plantaActual).nombre
    }));

    // Mostrar alerta de planta guardada

    Alert.alert('Planta guardada', `Se ha guardado la planta ${plantas.find(planta => planta.id === plantaActual).nombre} para el día ${fechaFormateada}`);

    //Guardar datos en la base de datos
    guardarDatosCalendar( idUser,fechaFormateada, accionSeleccionada, plantaActual) 
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
      <TextInput
        placeholder="YYYY-MM-DD"
        value={searchDate}
        onChangeText={setSearchDate}
        style={styles.searchInput}
      />
      <TouchableOpacity style={styles.buttonStyle} onPress={handleSearch}>
        <Text style={styles.buttonText}>Buscar Fecha</Text>
      </TouchableOpacity>
      <Calendar
        // Estilos personalizados para el calendario
        current={currentDate}
        key={currentDate}
        style={styles.calendar}
        // Personalización de día seleccionado
        markedDates={markedDates}
        // Más props de personalización aquí...
        onDayPress={(day) => {
          seleccionarFechaYMarcar(day);
          Alert.alert('Seleccionaste el día:', day.dateString);
          seleccionarPlantaPorFecha(day.dateString);
        }}
      />
      <Text style={styles.plantasGuardadas}>Sembrar</Text>
      <FlatList
        data={plantaSeleccionada}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.planta}</Text>
            <Text>{item.fecha}</Text>
          </View>  
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
            style={styles.plantas} // Ajustar el alto si es necesario
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
            style={styles.accion} // Ajustar el alto si es necesario
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
                  setFechaSeleccionada(selectedDate); // Establece la fecha seleccionada
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
        <Icon style={styles.addcalendar} name="edit-calendar" size={30} />
      </TouchableOpacity>
    </View >
  );
};

const styles = StyleSheet.create({
  addcalendar: {
    margin: 10,
    color: 'black',
  },
  calendar: {
    margin: 10,
  },
  searchInput: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#333',
    padding: 10,
    margin: 12,
    textAlign: 'left',
    borderRadius: 5,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
  },
  buttonStyle: {
    backgroundColor: '#8FD053',
    width: '60%',
    textAlign: 'center',
    left: '20%',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  floatingButton: {
    backgroundColor: 'lightblue',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center', // Alinea el contenido al centro
    position: 'absolute', // Posición absoluta para que el botón flotante no afecte el diseño de otros elementos
    bottom: 20, // Ajusta la posición del botón flotante
    right: 20, // Ajusta la posición del botón flotante
  },
  accion: {
    width: '100%',
    height: 50, // Ajusta el alto según tus necesidades
    backgroundColor: 'lightgrey',
    margin: 10, // Añade margen para que no esté pegado al borde
  },
  modalView: {
    margin: 20, // Margen para que no esté pegado al borde
    borderRadius: 20, // Bordes redondeados para hacerlo más amigable
    padding: 35, // Añadir relleno para que no se vea tan pegado al borde
    alignItems: "center", // Alinea el contenido al centro
    shadowColor: "#000", // Color de la sombra
    shadowOffset: {
      width: 0, // Ajustar la sombra hacia la derecha
      height: 4 // Ajustar la sombra hacia abajo
    },
    shadowOpacity: 0.3, // Sombra más suave
    shadowRadius: 5, // Tamaño de la sombra
    elevation: 10, // Efecto de elevación para Android
    backgroundColor: "white" // Fondo blanco para hacerlo más visible
  },
  closeButton: {
    position: 'absolute',
    color: 'red',
    left: 10,
    top: 15,
    width: 30,
    height: 30,
    borderRadius: 15, // Bordes redondeados para hacerlo más amigable

  },
  closeButtonText: {
    color: 'red', // Color más suave que el rojo puro
    fontSize: 20, // Tamaño de fuente más grande
  },
  fechaSeleccionada: {
    fontSize: 18,
    marginLeft: 10,
  },
  plantasGuardadas: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
  datePickerButton: {
    backgroundColor: 'lightgrey',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  plantas: {
    backgroundColor: 'lightgrey',
    width: '100%',
    height: 50, // Ajusta el alto según tus necesidades
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  }
});

export default App;