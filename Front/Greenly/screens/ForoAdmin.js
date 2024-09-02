import React, { useState, useCallback } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text, Button } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Chat from '../api/Chat';
import { FlatList } from 'react-native';
import { Card, Paragraph } from 'react-native-paper';
import { widthPercentageToDP as wd } from 'react-native-responsive-screen';
import updateLikes from '../api/updateLikes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { deleteQuestion } from '../api/deleteQuestion';
import getReports from '../api/reports';

const ForoAdmin = () => {
    const navigation = useNavigation();
    const [questions, setQuestions] = useState([]);
    const [userLikes, setUserLikes] = useState({});
    const [filter, setFilter] = useState('');
    const [reportedQuestions, setReportedQuestions] = useState({});
    const [cultivoNames, setCultivoNames] = useState([]);

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

    useFocusEffect(
        useCallback(() => {
            fetchReports();
            fetchQuestions();
        }, [])
    );

    const handleLike = async (id) => {
        const userId = await AsyncStorage.getItem('idUser');
        const storedUserLikes = JSON.parse(await AsyncStorage.getItem(`userLikes_${userId}`)) || {};
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
        setUserLikes(storedUserLikes);

        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex] = question;
        setQuestions(updatedQuestions);

        await updateLikes(id, question.likes);
    };

    const handleDelete = (questionId) => {
        deleteQuestion(questionId, fetchQuestions);
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
                        <View style={styles.iconOverImageContainer}>
                            <Card.Cover source={{ uri: item.nombreFoto }} style={styles.fotoPr} />
                            <TouchableOpacity onPress={() => handleDelete(item.questionDetails.idPregunta)}>
                                <Icon name="times" style={styles.iconOnTop} size={30} color="red" />
                            </TouchableOpacity>
                        </View>
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
                                    <View style={styles.userDetails}>
                                        {item.questionDetails && item.questionDetails.idUsuario && (
                                            <>
                                                <Image
                                                    source={{ uri: item.questionDetails.idUsuario.img ? `data:image/jpeg;base64,${item.questionDetails.idUsuario.img}` : 'URL_DE_IMAGEN_POR_DEFECTO' }}
                                                    style={styles.userImage}
                                                />
                                                <Text style={styles.userName}>{item.questionDetails.idUsuario.username}</Text>
                                            </>
                                        )}
                                        <TouchableOpacity
                                            onPress={() => handleLike(item.idLikes)}
                                        >
                                            <Icon style={styles.likeicon} name="heart" size={30} color={userLikes[item.idLikes] ? "red" : "grey"} />
                                        </TouchableOpacity>
                                        <Paragraph style={styles.likes}>{item.likes} likes</Paragraph>
                                    </View>
                                    <View style={styles.report}>
                                        <Icon name="exclamation" size={20} color={reportedQuestions[item.questionDetails.idPregunta] ? "red" : "grey"} />
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
    iconOverImageContainer: {
        position: 'relative',
    },
    iconOnTop: {
        position: 'absolute',
        backgroundColor: 'white',
        padding: 5,
        width: 40,
        textAlign: 'center',
        borderRadius: 50,
        bottom: 150,
        right: 10,
    },
});

export default ForoAdmin;