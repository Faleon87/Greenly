import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { Input, CheckBox } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'; import { launchImageLibrary } from 'react-native-image-picker';
import * as ImagePicker from 'expo-image-picker';
// Importa tus imágenes aquí
import eyeIcon from '../img/hide.png';
import eyeSlashIcon from '../img/view.png';
const defaultProfileImage = require('../img/profile.png');// Asegúrate de reemplazar esto con la ruta a tu imagen

export default function RegisterScreen({ navigation }) {
    const [hidePassword, setHidePassword] = React.useState(true);
    const [agree, setAgree] = React.useState(false);

    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');

    const [profileImage, setProfileImage] = React.useState(defaultProfileImage);

    const register = () => {
        if (!name || !email || !username || !password || !confirmPassword) {
            Alert.alert('All fields are required');
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert('Passwords do not match');
            return;
        }

        if (password.length < 8 || !/[!@#$%^&*(),.?":{}|<>]/g.test(password)) {
            Alert.alert('Password must be at least 8 characters long and contain a special character');
            return;
        }

        if (!agree) {
            Alert.alert('You must agree with the account');
            return;
        }
        // Aquí puedes hacer la petición POST a tu API
        fetch('http://192.168.0.22:3000/user/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nombre: name,
                email: email,
                username: username,
                password: password,
                img: profileImage.uri,
            }),
        }).then((response) => response.json())
            .then((json) => {
                console.log(json);
                Alert.alert('User registered successfully');

            }
            ).catch((error) => {
                console.error('Error:', error);
            });
    }

    const selectProfileImage = async () => {
        let result;
        const options = ['Take Photo', 'Choose from Gallery', 'Cancel'];
        const cancelButtonIndex = options.length - 1;

        Alert.alert(
            'Profile Photo',
            'Choose a method to select a new profile photo',
            options.map((option, index) => ({
                text: option,
                onPress: async () => {
                    if (index === 0) {
                        result = await ImagePicker.launchCameraAsync({
                            mediaTypes: ImagePicker.MediaTypeOptions.All,
                            allowsEditing: true,
                            aspect: [4, 3],
                            quality: 1,
                        });
                    } else if (index === 1) {
                        result = await ImagePicker.launchImageLibraryAsync({
                            mediaTypes: ImagePicker.MediaTypeOptions.All,
                            allowsEditing: true,
                            aspect: [4, 3],
                            quality: 1,
                        });
                    }

                    console.log(result);



                    if (result && !result.cancelled) {
                        setProfileImage({ uri: result.assets[0].uri });
                    }
                },
                style: index === cancelButtonIndex ? 'cancel' : 'default',
            })),
        );

        if (result && !result.cancelled) {
            setProfileImage({ uri: result.uri });
        }
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={selectProfileImage}>
                <Image source={profileImage} style={styles.profileImage} resizeMode='cover' />
            </TouchableOpacity>
            <Input
                placeholder="Name"
                inputContainerStyle={styles.inputContainer}
                value={name}
                onChangeText={setName}
            />
            <Input
                placeholder="Email"
                inputContainerStyle={styles.inputContainer}
                value={email}
                onChangeText={setEmail}
            />
            <Input
                placeholder="Username"
                inputContainerStyle={styles.inputContainer}
                value={username}
                onChangeText={setUsername}
            />
            <Input
                placeholder="Password"
                secureTextEntry={hidePassword}
                inputContainerStyle={styles.inputContainer}
                value={password}
                onChangeText={setPassword}
                rightIcon={
                    <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
                        <Image source={hidePassword ? eyeIcon : eyeSlashIcon} style={styles.icon} />
                    </TouchableOpacity>
                }
            />
            <Input
                placeholder="Confirm Password"
                secureTextEntry={hidePassword}
                inputContainerStyle={styles.inputContainer}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                rightIcon={
                    <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
                        <Image source={hidePassword ? eyeIcon : eyeSlashIcon} style={styles.icon} />
                    </TouchableOpacity>
                }
            />
            <View style={styles.checkboxContainer}>
                <CheckBox
                    checked={agree}
                    onPress={() => setAgree(!agree)}
                    checkedColor='#03453D'
                />
                <Text style={styles.labelCheckbox}>I agree with account</Text>
            </View>
            <TouchableOpacity
                style={styles.button}
                onPress={register}
            >
                <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
            <Text style={styles.login}>I have an account
                <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
                    <Text style={styles.loginBold}> Login</Text>
                </TouchableOpacity>
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'flex-start',
        padding: wp('5%'),
    },
    profileImage: {
        width: wp('20%'),
        height: hp('10%'),
        alignSelf: 'center',
        marginBottom: wp('2%'),
        borderRadius: wp('10%'), // Añade esta línea
    },
    inputContainer: {
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: wp('5%'),
        paddingHorizontal: wp('10%'),
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: wp('5%'),
    },
    labelCheckbox: {
        fontSize: hp('2%'),
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: '#8FD053',
        padding: wp('3%'),
        marginBottom: wp('5%'),
        marginTop: wp('1%'),
    },
    buttonText: {
        color: '#000',
        textAlign: 'center',
        fontSize: hp('2.9%'),
    },
    login: {
        fontSize: hp('2.2%'),
        color: '#000',
        textAlign: 'center',
    },
    loginBold: {
        fontWeight: 'bold',
        fontSize: hp('2.2%'),
    },
    icon: {
        width: wp('5%'),
        height: hp('2.5%'),
    },
});