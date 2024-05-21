import React, {useState, useEffect} from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Chat } from '../api/Chat';

const App = () => {
  const navigation = useNavigation();
  const [questions, setQuestions] = useState([]);

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

  useEffect(() => {
    const fetchQuestions = async () => {
      const idUsuario = await getIdUser(); 
      // Espera a que se resuelva la promesa
      Chat(idUsuario).then(setQuestions);
    };
  
    fetchQuestions();
  }, []);
                        

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.floatingButton}
        onPress={() => navigation.navigate('FormForo')}
      >

        

        <Icon name="pencil" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  floatingButton: {
    backgroundColor: '#02907D',
    position: 'absolute',
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    right: 10,
    bottom: 10,
  },
});

export default App;