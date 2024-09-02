import React, { useState, useEffect } from 'react'; // Asegúrate de importar useState y useEffect desde 'react'
import { View, Text, Button, FlatList, Image, Modal, StyleSheet, TouchableOpacity, Alert, TextInput, Platform } from 'react-native'; // Ajusta la ruta según sea necesario
import { Calendar } from 'react-native-calendars'; // Ajusta la ruta según sea necesario
import { getPlantas } from '../api/getPlantas'; // Ajusta la ruta según sea necesario
import DateTimePicker from '@react-native-community/datetimepicker'; // Asumiendo que se usa esta librería para el DatePicker
import { Picker } from '@react-native-picker/picker'; // Asumiendo que se usa esta librería para el Picker
import { FontAwesome } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'; // Ajusta la ruta según sea necesario
import { guardarDatosCalendar } from '../api/guardarDatosCalendar'; // Ajusta la ruta según sea necesario
import AsyncStorage from '@react-native-async-storage/async-storage';
import { plantafecha } from '../api/plantafecha'; // Ajusta la ruta según sea necesario
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import eliminarPlantaform from '../api/eliminarPlanta'; // Ajusta la ruta según sea necesario


const App = () => {

  const navigation = useNavigation();

  const [idUser, setIdUser] = useState(''); // ID de usuario
  const [datosPlanta, setDatosPlanta] = useState([]); // Datos de la planta seleccionada
  const [modalVisible, setModalVisible] = useState(false); // Estado para mostrar u ocultar el modal
  const [plantas, setPlantas] = useState([]); // Plantas disponibles para seleccionar
  const [plantaActual, setPlantaActual] = useState(); // Planta seleccionada en el modal
  const [isPickerVisible, setIsPickerVisible] = useState(false); // Estado para mostrar u ocultar el DateTimePicker
  const [fechaSeleccionada, setFechaSeleccionada] = useState(new Date()); // Fecha seleccionada por defecto
  const [plantasGuardadas, setPlantasGuardadas] = useState({}); // Plantas guardadas por fecha
  const [accionSeleccionada, setAccionSeleccionada] = useState('sembrar'); // Valor por defecto para el Picker
  const [markedDates, setMarkedDates] = useState({}); // Fechas marcadas en el calendario
  const [searchDate, setSearchDate] = useState(''); // Fecha de búsqueda en formato YYYY-MM-DD
  const [currentDate, setCurrentDate] = useState(''); // Fecha actual para el calendario
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  // Formatear la fecha seleccionada para guardarla en el estado
  const fechaFormateada = fechaSeleccionada.toISOString().split('T')[0];


  useEffect(() => {
    // Lógica para cargar plantas cuando modalVisible es true
    if (modalVisible) {
      getPlantas()
        .then(data => {
          const plantasConIdYNombre = data.map(planta => ({
            id: planta.idPlanta,
            nombre: planta.nombrePlanta
          }));
          setPlantas(plantasConIdYNombre);
          if (plantasConIdYNombre.length > 0) {
            setPlantaActual(plantasConIdYNombre[0].id);
          }
        })
        .catch(console.error);
    } else if (isDeleteModalVisible) {
      getPlantas()
        .then(data => {
          const plantasConIdYNombre = data.map(planta => ({
            id: planta.idPlanta,
            nombre: planta.nombrePlanta
          }));
          setPlantas(plantasConIdYNombre);
          if (plantasConIdYNombre.length > 0) {
            setPlantaActual(plantasConIdYNombre[0].id);
          }
        })
        .catch(console.error);
    }


    // Lógica para fetchIdUserAndData que se ejecuta independientemente de modalVisible
    const fetchIdUserAndData = async () => {
      const storedIdUser = await AsyncStorage.getItem('idUser');
      setIdUser(storedIdUser);

      const result = await plantafecha(fechaFormateada, storedIdUser);
      setDatosPlanta(result);
    };

    fetchIdUserAndData();
  }, [modalVisible, fechaFormateada, isDeleteModalVisible]); // Añade 'fecha' a las dependencias si su valor puede cambiar y necesitas recargar los datos

  const handleSearch = () => {
    // Verifica si la fecha ingresada es válida
    if (!searchDate.match(/^\d{4}-\d{2}-\d{2}$/)) {
      Alert.alert('Formato de fecha inválido', 'Por favor, ingresa la fecha en formato YYYY-MM-DD');
      return;
    }
    // Establece la fecha 
    setCurrentDate(searchDate);

    // Marcar la fecha en el calendario
    const newMarkedDates = {
      [searchDate]: {
        selected: true,
        marked: true,
        disableTouchEvent: false,
      },
    };

    //Mostrar datos de la planta seleccionada
    seleccionarPlantaPorFecha(searchDate);

    // Actualiza el estado con la nueva fecha marcada
    setMarkedDates(newMarkedDates);

    // Establece la fecha seleccionada
    setFechaSeleccionada(new Date(searchDate));
  };







  const seleccionarFechaYMarcar = (day) => {
    // Restablece el estado para incluir solo la nueva fecha marcada
    const newMarkedDates = {
      [day.dateString]: {
        selected: true,
        marked: false,
        disableTouchEvent: false,
      },
    };
    // Actualiza el estado con la nueva fecha marcada
    setMarkedDates(newMarkedDates);

    // Establece la fecha seleccionada
    setFechaSeleccionada(new Date(day.dateString));

    // Mostrar datos de la planta seleccionada
    seleccionarPlantaPorFecha(day.dateString);
  };



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
    guardarDatosCalendar(idUser, fechaFormateada, accionSeleccionada, plantaActual)

    // Actualizar datos de la planta seleccionada
    seleccionarPlantaPorFecha(fechaFormateada);
  };


  const eliminarPlanta = async () => {
    setDeleteModalVisible(false);
    const result = await eliminarPlantaform(fechaFormateada, idUser, plantaActual, accionSeleccionada);
    console.log(result);


  }


  const seleccionarPlantaPorFecha = (fecha) => {

    // Filtra la planta por la fecha seleccionada
    const planta = plantasGuardadas[fecha] ? [{ fecha, planta: plantasGuardadas[fecha] }] : [];

    // Actualiza el estado con la planta seleccionada
    setDatosPlanta(planta);


    // Actualizar datos de la planta seleccionada
    plantafecha(fecha, idUser)
      .then(data => {
        setDatosPlanta(data);
      })
      .catch(console.error);

  };

  const handleFloatingButtonPress = () => {
    Alert.alert(
      'Seleccione una acción',
      '¿Qué desea hacer?',
      [
        {
          text: 'Añadir',
          onPress: () => setModalVisible(true),
        },
        {
          text: 'Eliminar',
          onPress: () => setDeleteModalVisible(true),
        },
        {
          text: 'Cancelar',
          onPress: () => console.log('Cancelar'),
        },
      ],
      { cancelable: true }
    );
  };


  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 10 }}>
          <TextInput
            placeholder="YYYY-MM-DD"
            value={searchDate}
            onChangeText={setSearchDate}
            style={styles.searchInput}
          />
          <TouchableOpacity style={styles.buttonStyle} onPress={handleSearch}>
            <Text style={styles.buttonText}>Buscar Fecha</Text>
          </TouchableOpacity>
        </View>
        <Calendar
          // Estilos personalizados para el calendario
          firstDay={1}
          locale={'es'}
          current={currentDate}
          key={idUser}
          style={styles.calendar}
          // Personalización de día seleccionado
          markedDates={markedDates}
          theme={{
            todayTextColor: 'red',
            selectedDayBackgroundColor: 'red',
            selectedDayTextColor: 'white',
            textDayFontWeight: 'bold',
            textMonthFontWeight: 'bold',
            textDayHeaderFontWeight: 'bold',
            textDayFontSize: 16,
            textMonthFontSize: 16,
            textDayHeaderFontSize: 16,
          }} // Cambia el color del texto del día actual
          // Más props de personalización aquí...
          onDayPress={(day) => {
            seleccionarFechaYMarcar(day);
            seleccionarPlantaPorFecha(day.dateString);
          }}
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
                <FontAwesome name="calendar" size={30} color="green" />
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
        <View style={styles.content}>
          {datosPlanta.filter(item => item.tipoAcción === 'sembrar').length > 0 && (
            <>
              <Text style={styles.plantasGuardadas}>Sembrar</Text>
              <FlatList
                data={datosPlanta.filter(item => item.tipoAcción === 'sembrar')}
                keyExtractor={item => item.idPlanta.idPlanta}
                horizontal={true}
                renderItem={({ item }) => (
                  <View style={styles.card}>
                    <TouchableOpacity onPress={() => navigation.navigate('DetallePlanta', { idPlanta: item.idPlanta.idPlanta })}>
                      <View style={styles.sembrar}>
                        <Text style={styles.nombrePlanta}>{item.idPlanta.nombrePlanta}</Text>
                        <Image source={{ uri: item.idPlanta.img }} style={styles.imagenPlanta} />
                        <Text style={styles.fecha}>{item.fecha}</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                )}
              />
            </>
          )}
        </View>
        <View style={styles.content}>
          {datosPlanta.filter(item => item.tipoAcción === 'cosechar').length > 0 && (
            <>
              <Text style={styles.plantasGuardadas}>Cosechar</Text>
              <FlatList
                data={datosPlanta.filter(item => item.tipoAcción === 'cosechar')}
                keyExtractor={(item) => `${item.idUser}-${item.idPlanta.idPlanta}`}
                horizontal={true}
                renderItem={({ item }) => (
                  <View style={styles.card}>
                    <TouchableOpacity onPress={() => navigation.navigate('DetallePlanta', { idPlanta: item.idPlanta.idPlanta })}>
                      <View style={styles.cosechar}>
                        <Text style={styles.nombrePlanta}>{item.idPlanta.nombrePlanta}</Text>
                        <Image source={{ uri: item.idPlanta.img }} style={styles.imagenPlanta} />
                        <Text style={styles.fecha}>{item.fecha}</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                )}
              />
            </>
          )}
        </View>
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isDeleteModalVisible}
        onRequestClose={() => { setDeleteModalVisible(!isDeleteModalVisible); }}
      >
        <View style={styles.modalContent}>
        <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setDeleteModalVisible(false)}
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
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <FontAwesome name="calendar" size={30} color="green" />
            {fechaSeleccionada && <Text style={styles.fechaSeleccionada}>{fechaSeleccionada.toDateString()}</Text>}
          </View>
          <Picker
            selectedValue={accionSeleccionada}
            onValueChange={(itemValue, itemIndex) => setAccionSeleccionada(itemValue)}
            style={styles.accion} // Ajustar el alto si es necesario
          >
            <Picker.Item label="Sembrar" value="sembrar" />
            <Picker.Item label="Cosechar" value="cosechar" />
          </Picker>
          <Button title="Eliminar" onPress={eliminarPlanta} />
        </View>
      </Modal>
      <TouchableOpacity style={styles.floatingButton} onPress={() => handleFloatingButtonPress()}>
        <FontAwesome style={styles.addcalendar} name="edit" size={30} />
      </TouchableOpacity>
    </View >

  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row', // Alinea los elementos horizontalmente
    justifyContent: 'space-between', // Distribuye el espacio entre los elementos de manera uniforme
    padding: 10, // Espaciado interno para separar los elementos de los bordes
    backgroundColor: '#f5f5f5', // Un color de fondo suave
  },
  content: {
    flex: 1, // Ocupa todo el espacio disponible
    padding: 10, // Espaciado interno para separar los elementos de los bordes
  },
  addcalendar: {
    margin: Platform.OS === 'web' ? 10 : 0, // Añade margen solo en la web
    color: 'black',
  },
  calendar: {
    marginHorizontal: Platform.OS === 'web' ? '5vw' : wp('5%'), // Ajustar el margen según tus necesidades
    width: Platform.OS === 'web' ? '100vw' : wp('90%'),
  },
  searchInput: {
    flex: 1, // Ocupa todo el espacio disponible
    marginRight: Platform.OS === 'web' ? 10 : 0, // Añade margen solo en la web
    borderColor: 'black', // Borde de color claro
    borderWidth: 1, // Grosor del borde
    borderRadius: 5, // Bordes redondeados
    padding: 8, // Espaciado interno
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  buttonStyle: {
    backgroundColor: 'green', // Color de fondo azul
    borderRadius: 5, // Bordes redondeados
    padding: 10, // Espaciado interno
  },
  floatingButton: {
    backgroundColor: 'lightblue',
    width: Platform.OS === 'web' ? '10vw' : wp('10%'),
    height: Platform.OS === 'web' ? '10vw' : hp('10%'),
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center', // Alinea el contenido al centro
    position: 'absolute',
    bottom: 10,
    right: 10,

  },
  accion: {
    width: Platform.OS === 'web' ? '50vw' : wp('50%'),
    height: 50, // Ajusta el alto según tus necesidades
    marginVertical: 10, // Añade margen vertical
  },
  modalView: {
    margin: Platform.OS === 'web' ? '10vw' : 20, // Ajustar el margen según tus necesidades
    borderRadius: 20, // Bordes redondeados para hacerlo más amigable
    padding: 35, // Añadir relleno para que no se vea tan pegado al borde
    alignItems: "center", // Alinea el contenido al centro
    shadowColor: "#000", // Color de la sombra
    shadowOffset: {
      width: wp('0'), // Ajustar la sombra hacia la derecha
      height: hp('4%') // Ajustar la sombra hacia abajo
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
    width: Platform.OS === 'web' ? '5vw' : wp('5%'),
    height: Platform.OS === 'web' ? '5vw' : hp('5%'),
    borderRadius: 15, // Bordes redondeados para hacerlo más amigable
  },
  closeButtonText: {
    color: 'red', // Color más suave que el rojo puro
    fontSize: 20, // Tamaño de fuente más grande
  },
  fechaSeleccionada: {
    fontSize: 18,
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 25,
  },
  plantasGuardadas: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  imagenPlanta: {
    width: Platform.OS === 'web' ? '20vw' : wp('20%'),
    height: Platform.OS === 'web' ? '20vw' : hp('20%'),
    borderRadius: 15, // Bordes más redondeados
    shadowColor: "#000", // Agregar sombra
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sembrar: {
    borderRadius: 10, // Bordes redondeados para los elementos
    alignItems: 'center', // Centra los elementos (imagen, fecha, nombre) verticalmente
  },
  cosechar: {
    borderRadius: 10, // Bordes redondeados para los elementos
    alignItems: 'center', // Centra los elementos (imagen, fecha, nombre) verticalmente
  },
  plantas: {
    width: Platform.OS === 'web' ? '50vw' : wp('50%'),
    height: Platform.OS === 'web' ? '5vw' : hp('5%'),
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    width: Platform.OS === 'web' ? '30vw' : wp('30%'),
    elevation: 5,
    position: 'relative', // Necesario para posicionar el botón de borrar
  },
  modalContent: {
    padding: 20,
    width: Platform.OS === 'web' ? '50vw' : wp('50%'),
    height: Platform.OS === 'web' ? '30vh' : hp('30%'),
    backgroundColor: 'white',
    marginTop: Platform.OS === 'web' ? '20vh' : hp('10%'),
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: Platform.OS === 'web' ? '20vw' : wp('5%'),
    width: Platform.OS === 'web' ? '50vw' : wp('90%'),
    borderRadius: 20,
  },
});

export default App;