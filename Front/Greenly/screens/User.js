import React, { useLayoutEffect, useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUserData } from '../api/getUserData'; // Asegúrate de que la ruta sea correcta
import { Ionicons } from '@expo/vector-icons';
import { updateUser } from '../api/updateUser';


const EditProfileScreen = ({ navigation }) => {
  const [nombre, setNombre] = useState('');
  const [username, setUsername] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [idUser, setIdUser] = useState('');

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

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
      headerStyle: { backgroundColor: '#02907D' },
      headerTintColor: 'black',
    });
  }, [navigation]);

  const guardarUsuario = async () => {
    try {
      await updateUser(idUser, nombre, username, apellido, email, password);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Nombre</Text>
      <View style={styles.inputContainer}>
        <TextInput
          value={nombre}
          onChangeText={setNombre}
          placeholder="Nombre"
          style={styles.input}
        />
      </View>
      <Text>Nombre de usuario</Text>
      <View style={styles.inputContainer}>
        <TextInput
          value={username}
          onChangeText={setUsername}
          placeholder="Nombre de usuario"
          style={styles.input}
        />
      </View>
      <Text>Apellido</Text>
      <View style={styles.inputContainer}>
        <TextInput
          value={apellido}
          onChangeText={setApellido}
          placeholder="Apellido"
          style={styles.input}
        />
      </View>
      <Text>Correo</Text>
      <View style={styles.inputContainer}>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          style={styles.input}
        />
      </View>
      <Text>Contraseña</Text>
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
      <TouchableOpacity style={styles.guardar} onPress={() => guardarUsuario()}>
        <Text style={styles.textoBoton}>Guardar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  textoBoton: {
    color: 'black',
    fontSize: 18,
    textAlign: 'center',

  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderBottomWidth: 1,
    borderWidth: 1,
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
    flex: 1,
    height: 50,
    fontSize: 14,
  },
  eyeIcon: {
    padding: 10,
  },
  guardar: {
    backgroundColor: '#8FD053',
    color: '#2C1001',
    borderRadius: 5,
    padding: 10,
    fontSize: 18,
    textAlign: 'center',
  },
});

export default EditProfileScreen;