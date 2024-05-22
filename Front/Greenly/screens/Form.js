import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Chat } from '../api/Chat';
import { FlatList } from 'react-native';
import { Card, Paragraph } from 'react-native-paper';
import { widthPercentageToDP as wd } from 'react-native-responsive-screen';
import { updateLikes } from '../api/updateLikes';

const App = () => {
  const navigation = useNavigation();
  const [questions, setQuestions] = useState([]);
  const [userLikes, setUserLikes] = useState({}); 

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
        };
      });
  

      setQuestions(questionsWithLikes);
    };
  
    // Llama a fetchQuestions inmediatamente
    fetchQuestions();
  
    // Configura un intervalo para llamar a fetchQuestions cada cierto tiempo
    // Aquí lo estoy configurando para que se ejecute cada 5 minutos
    const intervalId = setInterval(fetchQuestions,  300000);
  
    // Limpia el intervalo cuando el componente se desmonta
    return () => clearInterval(intervalId);
  }, []);

  const handleLike = async (id) => {
    // Encuentra la pregunta que el usuario le dio like
    const questionIndex = questions.findIndex((question) => question.idLikes === id);

    // Encuentra la pregunta en sí

    const question = questions[questionIndex];
  
    // Incrementa o disminuye el número de likes dependiendo del estado actual
    const updatedLikes = userLikes[id] ? question.likes - 1 : question.likes + 1;
    const updatedQuestion = { ...question, likes: updatedLikes };
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex] = updatedQuestion;
  
    setQuestions(updatedQuestions);
  
    setUserLikes({ ...userLikes, [id]: !userLikes[id] });

    
  

    
    


    // Aquí deberías hacer una llamada a la API para actualizar el número de likes en la base de datos
    await updateLikes(id, updatedQuestion.likes);
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
                    <Paragraph style={styles.likes}>{item.likes}likes</Paragraph>
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