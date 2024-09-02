import React, { useLayoutEffect, useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUserData } from '../api/getUserData'; // Asegúrate de que la ruta sea correcta
import { Ionicons } from '@expo/vector-icons';
import { updateUser } from '../api/updateUser';
import Modal from 'react-native-modal';
import Dialog from 'react-native-dialog';
import comprobarPassword from '../api/comprobarPassword';

const EditProfileScreen = ({ navigation }) => {
  const [nombre, setNombre] = useState('');
  const [username, setUsername] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [idUser, setIdUser] = useState('');

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isPasswordModalVisible, setPasswordModalVisible] = useState(false);
  const [isPasswordDialogVisible, setPasswordDialogVisible] = useState(false);
  const [logoutPassword, setLogoutPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isConfirmPressed, setIsConfirmPressed] = useState(false);
  const [isCancelPressed, setIsCancelPressed] = useState(false);

  const fetchIdUser = async () => {
    const storedIdUser = await AsyncStorage.getItem('idUser');
    const idUser = JSON.parse(storedIdUser);
    setIdUser(idUser);
    fetchUserData(idUser);
  };

  const fetchUserData = async (idUser) => {
    try {
      const data = await getUserData(idUser);
      setNombre(data.nombre);
      setUsername(data.username);
      setApellido(data.apellido);
      setEmail(data.email);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchIdUser();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Editar Perfil',
      headerStyle: { backgroundColor: '#02907D'},
      headerTintColor: 'black',
      headerRight: () => (
        <TouchableOpacity style={styles.cerrarSesion} onPress={toggleModal}>
          <Ionicons name="log-out" size={30} color="black" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const togglePasswordModal = () => {
    setPasswordModalVisible(!isPasswordModalVisible);
  };

  const togglePasswordDialog = () => {
    setErrorMessage('');
    setLogoutPassword('');
    setPasswordDialogVisible(!isPasswordDialogVisible);
  };

  const handleLogout = async () => {
    // Aquí puedes agregar la lógica para verificar la contraseña
    // Si la contraseña es correcta, elimina los datos del usuario

    const data = await comprobarPassword(idUser, logoutPassword);
    if (data.success === true) {
      try {
        await AsyncStorage.removeItem('nombre');
        await AsyncStorage.removeItem('idUser');
        Alert.alert('Éxito', 'Sesión cerrada y datos eliminados');
        // Navegar a la pantalla de inicio de sesión u otra pantalla
        navigation.navigate('Login');
      } catch (error) {
        console.error('Error al eliminar los datos del usuario:', error);
      }
      togglePasswordModal();
    } else {
      setErrorMessage('La contraseña es incorrecta');
    }
  };

  const guardarUsuario = async () => {
    try {
      await updateUser(idUser, nombre, username, apellido, email, password);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nombre</Text>
      <View style={styles.inputContainer}>
        <TextInput
          value={nombre}
          onChangeText={setNombre}
          placeholder="Nombre"
          style={styles.input}
        />
      </View>
      <Text style={styles.label}>Nombre de usuario</Text>
      <View style={styles.inputContainer}>
        <TextInput
          value={username}
          onChangeText={setUsername}
          placeholder="Nombre de usuario"
          style={styles.input}
        />
      </View>
      <Text style={styles.label}>Apellido</Text>
      <View style={styles.inputContainer}>
        <TextInput
          value={apellido}
          onChangeText={setApellido}
          placeholder="Apellido"
          style={styles.input}
        />
      </View>
      <Text style={styles.label}>Correo</Text>
      <View style={styles.inputContainer}>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          style={styles.input}
        />
      </View>
      <Text style={styles.label}>Contraseña</Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Contraseña"
          onChangeText={setPassword}
          secureTextEntry={!isPasswordVisible}
          style={styles.input}
        />
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => setIsPasswordVisible(!isPasswordVisible)}
        >
          <Ionicons name={isPasswordVisible ? 'eye' : 'eye-off'} size={24} color="black" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.guardar} onPress={guardarUsuario}>
        <Text style={styles.textoBoton}>Guardar</Text>
      </TouchableOpacity>

      <Modal isVisible={isModalVisible}>
        <View style={styles.modalContent}>
          <View style={styles.containerclose}>
            <Ionicons name="close" size={24} color="red" onPress={toggleModal} />
          </View>
          <Text style={styles.modalTitle}>Confirmar Cierre de Sesión</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.confirm, isConfirmPressed && styles.buttonPressed]}
              onPressIn={() => setIsConfirmPressed(true)}
              onPressOut={() => setIsConfirmPressed(false)}
              onPress={() => {
                toggleModal();
                togglePasswordDialog();
              }}
            >
              <Text style={styles.buttonText}>Sí</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.cancel, isCancelPressed && styles.buttonPressed]}
              onPressIn={() => setIsCancelPressed(true)}
              onPressOut={() => setIsCancelPressed(false)}
              onPress={toggleModal}
            >
              <Text style={styles.buttonText}>No</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Dialog.Container visible={isPasswordDialogVisible}>
        <Ionicons name="close" size={24} color="red" onPress={togglePasswordDialog} style={styles.close} />
        <Dialog.Title style={styles.dialogTitle}>Ingrese su Contraseña</Dialog.Title>
        <View style={styles.passwordContainer}>
          <Dialog.Input
            placeholder="Contraseña"
            secureTextEntry={!isPasswordVisible}
            value={logoutPassword}
            onChangeText={setLogoutPassword}
            style={styles.dialogInput}
          />
          <TouchableOpacity
            style={styles.eyeIconDialog}
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
          >
            <Ionicons name={isPasswordVisible ? 'eye' : 'eye-off'} size={24} color="black" />
          </TouchableOpacity>
        </View>
        {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}  
        <View style={styles.dialogButtonContainer}>
          <Dialog.Button label="Cancelar" onPress={togglePasswordDialog} style={styles.canceldialog} />
          <Dialog.Button label="Confirmar" onPress={handleLogout} style={styles.confirmdialog} />
        </View>
      </Dialog.Container>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  label: {
    fontSize: 16,
    fontFamily: 'Manrope Bold',
    marginBottom: 5,
    color: '#333',
  },
  close: {
    position: 'absolute',
    top: 10,
    right: 10,
    alignSelf: 'flex-end',
  },
  canceldialog: {
    backgroundColor: 'red',
    color: '#fff',
    borderRadius: 5,
    marginRight: 10,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    marginBottom: 10,
  },
  eyeIconDialog: {
    padding: 10,
  },
  confirmdialog: {
    backgroundColor: 'green',
    color: '#fff',
    borderRadius: 5,
    marginLeft: 10,
  },
  confirm: {
    backgroundColor: 'green',
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 5,
    flex: 1,
    alignItems: 'center',
  },
  cancel: {
    backgroundColor: 'red',
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 5,
    flex: 1,
    alignItems: 'center',
  },
  buttonPressed: {
    opacity: 0.7, // Cambia la opacidad cuando se presiona
  },
  cerrarSesion: {
    color: '#2C1001',
    borderRadius: 5,
    padding: 10,
    marginRight: 20,
    textAlign: 'center',
  },
  textoBoton: {
    color: 'black',
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'Manrope Bold',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  input: {
    height: 50,
    fontSize: 16,
    color: '#333',
    width: 300,
    fontFamily: 'Manrope Regular',
  },
  eyeIcon: {
    padding: 10,
  },
  guardar: {
    backgroundColor: '#8FD053',
    color: '#2C1001',
    borderRadius: 5,
    padding: 15,
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: 'Manrope Bold',
    marginBottom: 20,
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  containerclose: {
    alignSelf: 'flex-end',
  },
  dialogInput: {
    height: 40,
    fontSize: 16,
    width: 200,
    color: '#333',
    fontFamily: 'Manrope Regular',
    borderColor: '#ccc',
  },
  dialogButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  error: {
    color: 'red',
    fontFamily: 'Manrope Light',
  },
  dialogTitle: {
    fontSize: 18,
    fontFamily: 'Manrope Bold',
    marginBottom: 10,
  },
});

export default EditProfileScreen;