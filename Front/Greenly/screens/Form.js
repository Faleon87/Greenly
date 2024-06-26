import React, { useState, useEffect , useLayoutEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Chat } from '../api/Chat';
import { FlatList } from 'react-native';
import { Card, Paragraph } from 'react-native-paper';
import { widthPercentageToDP as wd } from 'react-native-responsive-screen';
import updateLikes from '../api/updateLikes';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  const navigation = useNavigation();
  const [questions, setQuestions] = useState([]);
  const [userLikes, setUserLikes] = useState({});
  const [filter, setFilter] = useState('');

  // Agrega un estado para los nombres de los cultivos
  const [cultivoNames, setCultivoNames] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: '',
      headerStyle: { backgroundColor: '#02907D' },
      headerTintColor: 'black',
    });
  }, [navigation]);

  useEffect(() => {
    const fetchQuestions = async () => {
      const questionsFromApi = await Chat();
      console.log(questionsFromApi);

      const questionsWithLikes = questionsFromApi.fotoPreguntasResult.map((question, index) => {
        const likeObject = questionsFromApi.likesResult[index];
        const questionDetails = questionsFromApi.preguntaResult[index];
        return {
          ...question,
          likes: likeObject ? likeObject.likes : 0, // Aquí es donde accedes al número de likes
          idLikes: likeObject ? likeObject.idLikes : null, // Aquí es donde accedes al idLikes
          questionDetails: questionDetails ? questionDetails : null, // Aquí es donde accedes a los detalles de la pregunta
          nombreCultivo: questionDetails ? questionDetails.nombreCultivo : null,
        };
      });

      // Extrae los nombres únicos de los cultivos
      const uniqueCultivoNames = [...new Set(questionsWithLikes.map(question => question.nombreCultivo))];
      setCultivoNames(['Todos', ...uniqueCultivoNames]);

      setQuestions(questionsWithLikes);
    };

    // Llama a fetchQuestions inmediatamente
    fetchQuestions();
  }, []);
  const handleLike = async (id) => {
    // Recupera el idUsuario del almacenamiento local
    const userId = await AsyncStorage.getItem('idUser');
  
    // Recupera los likes del usuario del almacenamiento local
    const storedUserLikes = JSON.parse(await AsyncStorage.getItem(`userLikes_${userId}`)) || {};
  
    // Encuentra la pregunta que el usuario le dio like
    const questionIndex = questions.findIndex((question) => question.idLikes === id);
    if (questionIndex === -1) return;
  
    // Encuentra la pregunta en sí
    const question = questions[questionIndex];
  
    // Si el usuario ya ha dado like a esta pregunta, quita el like
    if (storedUserLikes[id]) {
      storedUserLikes[id] = undefined;
      question.likes -= 1;
    } else {
      // Si el usuario no ha dado like a esta pregunta, añade el like
      storedUserLikes[id] = true;
      question.likes += 1;
    }
  
    // Guarda los likes del usuario en el almacenamiento local
    await AsyncStorage.setItem(`userLikes_${userId}`, JSON.stringify(storedUserLikes));
  
    // Actualiza el estado de los likes del usuario
    setUserLikes(storedUserLikes);

    // Actualiza las preguntas
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex] = question;
    setQuestions(updatedQuestions);
  
    // Aquí deberías hacer una llamada a la API para actualizar el número de likes en la base de datos
    await updateLikes(id, question.likes);
  };

  // Filtra las preguntas basándote en el valor del filtro
  const filteredQuestions = questions.filter(question =>
    question.nombreCultivo.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.buttonListContainer}>
        <FlatList
          horizontal
          data={cultivoNames}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.button} onPress={() => setFilter(item === 'Todos' ? '' : item)}>
              <Text style={styles.buttonText}>{item}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
      <FlatList
        data={filteredQuestions}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Cover source={{ uri: item.nombreFoto }} style={styles.fotoPr} />
            <Card.Content>
              <View style={styles.cardContent}>
                <View style={styles.questionContainer}>
                  {item.questionDetails && (
                    <Paragraph
                      style={styles.pregunta}
                      numberOfLines={4}
                      ellipsizeMode='tail'
                    >
                      {item.questionDetails.pregunta}
                    </Paragraph>
                  )}
                  {item.questionDetails && (
                    <Paragraph
                      style={styles.pregunta}
                      numberOfLines={4}
                      ellipsizeMode='tail'
                    >
                      <Text>{item.idLikes}</Text>
                      <Text style={styles.descripcion}>Descripción:</Text>
                      {item.questionDetails.descripcion}
                    </Paragraph>
                  )}
                </View>
                <View style={styles.userInfo}>
                  <Image
                    style={styles.userImage}
                    source={{ uri: item.idUsuario.img }}
                  />
                  <View style={styles.userDetails}>
                    <Paragraph>{item.idUsuario.username}</Paragraph>
                    <TouchableOpacity
                      onPress={() => handleLike(item.idLikes)}
                    >
                      <Icon style={styles.likeicon} name="heart" size={30} color={userLikes[item.idLikes] ? "red" : "grey"} />
                    </TouchableOpacity>
                    <Paragraph style={styles.likes}>{item.likes} likes</Paragraph>
                  </View>
                  <View style={styles.respond}>
                    <TouchableOpacity
                      onPress={() => navigation.navigate('Respuestas', { id: item.idPregunta })}
                    >
                      <Icon name="comment" size={30} color="#02907D" />
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.date}>
                  {item.questionDetails && (
                    <Paragraph>
                      {new Date(item.questionDetails.fechaHora).toLocaleString()}
                    </Paragraph>
                  )}
                </View>
              </View>
            </Card.Content>
          </Card>
        )}
      />
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
  buttonListContainer: {
    height: 50, // Ajusta este valor según tus necesidades
  },
  buttonContainer: {
    margin: 5,
    height: 40, // Ajusta este valor según tus necesidades
    overflow: 'hidden',
  },
  button: {
    backgroundColor: '#2C1001', // Cambia esto al color que desees
    padding: 10,
    borderRadius: 5,
    margin: 5,
  },
  buttonText: {
    color: 'white', // Cambia esto al color que desees
  },
  likeicon: {
    marginLeft: 15,
  },
  descripcion: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#333333',
  },
  date: {
    marginTop: 10,
  },
  respond: {
    marginLeft: 1,
  },
  cardContent: {
    flexDirection: 'column',
    padding: 20,
  },
  pregunta: {
    marginBottom: 10,
    textAlign: 'center',
    color: '#333333',
    fontSize: 18,
    fontWeight: 'normal',
  },
  questionContainer: {
    width: '100%',
    marginBottom: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  likes: {
    marginLeft: 10,
  },
  fotoPr: {
    width: wd('90%'),
    height: wd('50%'),
  },
  card: {
    margin: 10,
    width: wd('90%'),
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
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
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  userDetails: {
    flexDirection: 'row',
  },
});

export default App;
