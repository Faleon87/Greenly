import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Chat } from '../api/Chat';
import { FlatList } from 'react-native';
import { Card, Paragraph } from 'react-native-paper';
import { widthPercentageToDP as wd } from 'react-native-responsive-screen';

const App = () => {
  const navigation = useNavigation();
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      const questionsFromApi = await Chat();
      console.log(questionsFromApi);

      const questionsWithLikes = questionsFromApi.fotoPreguntasResult.map((question, index) => {
        const likeObject = questionsFromApi.likesResult[index];
        const questionDetails = questionsFromApi.preguntaResult[index];
        return {
          ...question,
          likes: likeObject ? likeObject.likes : 0,
          questionDetails: questionDetails ? questionDetails : null,
        };
      });

      setQuestions(questionsWithLikes);
    };

    fetchQuestions();
  }, []);

  const handleLike = async (id) => {
    // Encuentra la pregunta que el usuario le dio like
    const questionIndex = questions.findIndex((question) => question.id === id);
    const question = questions[questionIndex];

    // Incrementa el número de likes
    const updatedQuestion = { ...question, likes: question.likes + 1 };
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex] = updatedQuestion;

    setQuestions(updatedQuestions);

    // Aquí deberías hacer una llamada a la API para actualizar el número de likes en la base de datos
    // Por ejemplo: await updateLikes(id, updatedQuestion.likes);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={questions}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Cover source={{ uri: item.nombreFoto }} style={styles.fotoPr} />
            <Card.Content>
              <View style={styles.cardContent}>
                <View style={styles.questionContainer}>
                  {item.questionDetails && (
                    <Paragraph style={styles.pregunta}>Pregunta:{item.questionDetails.pregunta}</Paragraph>
                  )}
                  {item.questionDetails && (
                    <Paragraph style={styles.pregunta}>Descripcion:{item.questionDetails.descripcion}</Paragraph>
                  )}
                </View>
                <View style={styles.userInfo}>
                  <Image
                    style={styles.userImage}
                    source={{ uri: item.idUsuario.img }}
                  />
                  
                  <View style={styles.userDetails}>
                    <Paragraph>{item.idUsuario.username}</Paragraph>
                    <Icon style={styles.likeicon} name="heart" size={30} color="#02907D" />
                    <Paragraph style={styles.likes}>{item.likes} likes</Paragraph>
                  </View>
                  <View style={styles.respond}>
                    <TouchableOpacity
                      onPress={() => navigation.navigate('Respuestas', { id: item.idPregunta })}
                    >
                      <Icon name="comment" size={30} color="#02907D" />
                    </TouchableOpacity>
                    
                    <TouchableOpacity
                      onPress={() => handleLike(item.id)}
                    >
                      
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
  likeicon: {
    marginLeft: 15,
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
    marginBottom: 20,
    textAlign: 'center',
    color: '#333333',
    fontSize: 18,
    fontWeight: 'bold',
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
    marginLeft: 30,
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