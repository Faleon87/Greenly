import React, { useState, useLayoutEffect, useCallback } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text, Alert, ActivityIndicator, Platform } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Chat } from '../api/Chat';
import { FlatList } from 'react-native';
import { Card, Paragraph } from 'react-native-paper';
import { widthPercentageToDP as wd } from 'react-native-responsive-screen';
import updateLikes from '../api/updateLikes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import reportQuestion from '../api/report';
import getReports from '../api/reports'; // Importa la nueva función

const App = () => {
  const navigation = useNavigation();
  const [questions, setQuestions] = useState([]);
  const [userLikes, setUserLikes] = useState({});
  const [filter, setFilter] = useState('');
  const [reportedQuestions, setReportedQuestions] = useState({});
  const [cultivoNames, setCultivoNames] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: '',
      headerStyle: { backgroundColor: '#02907D' },
      headerTintColor: 'black',
    });
  }, [navigation]);

  useFocusEffect(
    useCallback(() => {
      const checkPaymentStatus = async () => {
        const hasPaid = await AsyncStorage.getItem('hasPaid');
        if (!hasPaid) {
          Alert.alert(
            'Acceso Restringido',
            'Esta funcionalidad es de pago y está en prueba. ¿Deseas pagar ahora?',
            [
              {
                text: 'No',
                onPress: () => navigation.goBack(),

                style: 'cancel',
              },
              {
                text: 'Sí',
                onPress: () => {
                  Alert.alert('Pago', 'Pago realizado correctamente');
                },
              },
            ],
            { cancelable: false }
          );
          return;
        }

      };

      const fetchQuestions = async () => {
        const questionsFromApi = await Chat();
        console.log(questionsFromApi);

        const questionsWithLikes = questionsFromApi.fotoPreguntasResult.map((question, index) => {
          const likeObject = questionsFromApi.likesResult[index];
          const questionDetails = questionsFromApi.preguntaResult[index];

          return {
            ...question,
            likes: likeObject ? likeObject.likes : 0,
            idLikes: likeObject ? likeObject.idLikes : null,
            questionDetails: questionDetails ? questionDetails : null,
            nombreCultivo: questionDetails ? questionDetails.nombreCultivo : null,
          };
        });

        const uniqueCultivoNames = [...new Set(questionsWithLikes.map(question => question.nombreCultivo))];
        setCultivoNames(['Todos', ...uniqueCultivoNames]);

        setQuestions(questionsWithLikes);
      };

      const fetchReports = async () => {
        const reportsFromApi = await getReports();
        const reportedQuestionsMap = reportsFromApi.reduce((acc, report) => {
          acc[report.idPregunta] = true;
          return acc;
        }, {});
        setReportedQuestions(reportedQuestionsMap);
      };

      checkPaymentStatus();
      fetchQuestions();
      fetchReports();
    }, [navigation])
  );

  const handleLike = async (id) => {
    console.log('handleLike called with id:', id);

    const userId = await AsyncStorage.getItem('idUser');
    console.log('userId:', userId);

    const storedUserLikes = JSON.parse(await AsyncStorage.getItem(`userLikes_${userId}`)) || {};
    console.log('storedUserLikes before:', storedUserLikes);

    const questionIndex = questions.findIndex((question) => question.idLikes === id);
    if (questionIndex === -1) return;

    const question = questions[questionIndex];

    if (storedUserLikes[id]) {
      storedUserLikes[id] = undefined;
      question.likes -= 1;
    } else {
      storedUserLikes[id] = true;
      question.likes += 1;
    }

    await AsyncStorage.setItem(`userLikes_${userId}`, JSON.stringify(storedUserLikes));
    console.log('storedUserLikes after:', storedUserLikes);

    setUserLikes(storedUserLikes);

    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex] = question;
    setQuestions(updatedQuestions);

    await updateLikes(id, question.likes);
    console.log('Likes updated in the database');
  };

  const handleReport = async (idPregunta, idUser) => {
    console.log('handleReport called with:', idPregunta, idUser);
    Alert.alert('Debug', `handleReport called with: ${idPregunta}, ${idUser}`);

    try {
      const result = await reportQuestion(idPregunta, idUser);

      if (result) {
        setReportedQuestions(prevState => ({
          ...prevState,
          [idPregunta]: true,
        }));
        Alert.alert('Pregunta reportada', 'La pregunta ha sido reportada correctamente.');
      } else {
        Alert.alert('Error', 'Error al reportar la pregunta.');
      }
    } catch (error) {
      Alert.alert('Error', 'Error al reportar la pregunta.');
    }
  };

  const confirmReport = (idPregunta, idUser) => {
    Alert.alert(
      'Confirmación',
      '¿Estás seguro de que quieres reportar esta pregunta?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Sí',
          onPress: () => handleReport(idPregunta, idUser),
        },
      ],
      { cancelable: false }
    );
  };

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
            <Card.Cover
              source={{ uri: item.nombreFoto }}
              style={styles.fotoPr}
              PlaceholderContent={<ActivityIndicator />}
            />
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
                  <View style={styles.userDetails}>
                    {item.questionDetails && item.questionDetails.idUsuario && (
                      <>
                        <Image
                          source={{ uri: `data:image/jpeg;base64,${item.questionDetails.idUsuario.img.data}` }}
                          style={styles.userImage}
                          PlaceholderContent={<ActivityIndicator />}
                        />
                        <Text style={styles.userName}>{item.questionDetails.idUsuario.username}</Text>
                      </>
                    )}
                  </View>
                  <TouchableOpacity onPress={() => handleLike(item.idLikes)}>
                    <View style={styles.likes}>
                      <Icon name="heart" size={20} color={userLikes[item.idLikes] ? "red" : "grey"} />
                      <Text>{item.likes}</Text>
                    </View>
                    <View style={styles.respond}>
                      <TouchableOpacity
                        onPress={() => navigation.navigate('Respuestas', { id: item.idPregunta })}
                      >
                        <Icon name="comment" size={30} color="#02907D" />
                      </TouchableOpacity>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      if (reportedQuestions[item.questionDetails.idPregunta]) {
                        Alert.alert('Lo siento', 'Esta pregunta ya ha sido reportada.');
                      } else {
                        confirmReport(item.questionDetails.idPregunta, item.questionDetails.idUsuario.idUser);
                      }
                    }}
                  >
                    <View style={styles.report}>
                      <Icon name="exclamation" size={20} color={reportedQuestions[item.questionDetails.idPregunta] ? "red" : "grey"} />
                    </View>
                  </TouchableOpacity>
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
    height: 50,
  },
  buttonContainer: {
    margin: 5,
    height: 40,
    overflow: 'hidden',
  },
  button: {
    backgroundColor: '#2C1001',
    padding: 10,
    borderRadius: 5,
    margin: 5,
  },
  buttonText: {
    color: 'white',
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
    marginHorizontal: Platform.OS === 'web' ? 10 : 0,
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
  report: {
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
  userName: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 10,
    fontWeight: 'bold',
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
  }
});

export default App;