import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, ScrollView, Platform } from 'react-native';
import { Input, CheckBox } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import eyeIcon from '../img/hide.png';
import eyeSlashIcon from '../img/view.png';
const defaultProfileImage = require('../img/profile.png');

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

        console.log('Registering user with:', name, email, username, password, profileImage);

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
                img: profileImage,
            }),
        }).then((response) => response.json())
            .then((json) => {
                Alert.alert('Debug', `Register response: ${JSON.stringify(json)}`);
                if (json.error) {
                    Alert.alert('Error', json.error);
                } else {
                    Alert.alert('Success', 'User registered successfully');
                    navigation.navigate('Login');
                }
            })
            .catch((error) => {
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

                    console.log('ImagePicker result:', result);
                    Alert.alert('Debug', `ImagePicker result: ${JSON.stringify(result)}`);

                    if (result && !result.cancelled) {
                        const fileUri = result.assets[0].uri;
                        console.log('File URI:', fileUri);
                        Alert.alert('Debug', `File URI: ${fileUri}`);

                        const fileInfo = await FileSystem.getInfoAsync(fileUri);
                        console.log('File Info:', fileInfo);
                        Alert.alert('Debug', `File Info: ${JSON.stringify(fileInfo)}`);

                        const fileBuffer = await FileSystem.readAsStringAsync(fileUri, {
                            encoding: FileSystem.EncodingType.Base64,
                        });
                        console.log('File Buffer (Base64):', fileBuffer);
                        Alert.alert('Debug', `File Buffer (Base64): ${fileBuffer.substring(0, 100)}...`);

                        setProfileImage(fileBuffer);
                    }
                },
                style: index === cancelButtonIndex ? 'cancel' : 'default',
            })),
        );

        if (result && !result.cancelled) {
            const fileUri = result.assets[0].uri;
            console.log('File URI:', fileUri);
            Alert.alert('Debug', `File URI: ${fileUri}`);

            const fileInfo = await FileSystem.getInfoAsync(fileUri);
            console.log('File Info:', fileInfo);
            Alert.alert('Debug', `File Info: ${JSON.stringify(fileInfo)}`);

            const fileBuffer = await FileSystem.readAsStringAsync(fileUri, {
                encoding: FileSystem.EncodingType.Base64,
            });
            console.log('File Buffer (Base64):', fileBuffer);
            Alert.alert('Debug', `File Buffer (Base64): ${fileBuffer.substring(0, 100)}...`);

            setProfileImage(fileBuffer);
        }
    };
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <TouchableOpacity onPress={selectProfileImage} style={styles.profileImageContainer}>
                <Image source={profileImage} style={styles.profileImage} resizeMode='contain' />
            </TouchableOpacity>
            <Text style={styles.label}>Name</Text>
            <Input
                placeholder="Name"
                containerStyle={styles.inputContainer}
                inputStyle={styles.inputText}
                value={name}
                onChangeText={setName}
            />
            <Text style={styles.label}>Email</Text>
            <Input
                placeholder="Email"
                containerStyle={styles.inputContainer}
                inputStyle={styles.inputText}
                value={email}
                onChangeText={setEmail}
            />
            <Text style={styles.label}>Username</Text>
            <Input
                placeholder="Username"
                containerStyle={styles.inputContainer}
                inputStyle={styles.inputText}
                value={username}
                onChangeText={setUsername}
            />
            <Text style={styles.label}>Password</Text>
            <Input
                placeholder="Password"
                secureTextEntry={hidePassword}
                containerStyle={styles.inputContainer}
                inputStyle={styles.inputText}
                value={password}
                onChangeText={setPassword}
                rightIcon={
                    <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
                        <Image source={hidePassword ? eyeIcon : eyeSlashIcon} style={styles.icon} />
                    </TouchableOpacity>
                }
            />
            <Text style={styles.label}>Confirm Password</Text>
            <Input
                placeholder="Confirm Password"
                secureTextEntry={hidePassword}
                containerStyle={styles.inputContainer}
                inputStyle={styles.inputText}
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
                <Text style={styles.labelCheckbox}>I agree with the account</Text>
            </View>
            <TouchableOpacity
                style={styles.button}
                onPress={register}
            >
                <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
            <View style={styles.loginContainer}>
                <Text style={styles.login}>I have an account</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.loginBold}> Login</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
    },
    profileImageContainer: {
        alignItems: 'center',
    },
    profileImage: {
        width: Platform.OS === 'web' ? '20vw' : wp('30%'),
        height: Platform.OS === 'web' ? '10vw' : wp('30%'),
        borderRadius: Platform.OS === 'web' ? '15vw' : wp('15%'),
    },
    label: {
        fontSize: Platform.OS === 'web' ? '1rem' : hp('2%'),
        marginHorizontal: Platform.OS === 'web' ? '5vw' : wp('5%'),
        marginTop: Platform.OS === 'web' ? '2vh' : hp('2%'),
        width: Platform.OS === 'web' ? '80vw' : wp('80%'),
        fontWeight: 'bold',
    },
    inputContainer: {
        marginHorizontal: Platform.OS === 'web' ? '5vw' : wp('5%'),
        fontSize: Platform.OS === 'web' ? '1rem' : hp('2%'),
        width: Platform.OS === 'web' ? '90vw' : wp('90%'),
        height: Platform.OS === 'web' ? '5vh' : hp('5%'),
    },
    inputText: {
        fontSize: Platform.OS === 'web' ? '1rem' : hp('2%'),
        height: Platform.OS === 'web' ? '5vh' : hp('5%'),
        marginHorizontal: Platform.OS === 'web' ? '5vw' : wp('5%'),

    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: Platform.OS === 'web' ? '5vw' : wp('5%'),
        marginTop: Platform.OS === 'web' ? '2vh' : hp('2%'),
    },
    labelCheckbox: {
        fontSize: Platform.OS === 'web' ? '1rem' : hp('2%'),
        marginHorizontal: Platform.OS === 'web' ? '2vw' : wp('2%'),
        fontWeight: 'bold',
    },
    button: {
        borderRadius: 5,
        backgroundColor: '#8FD053',
        justifyContent: 'center',

        marginHorizontal: Platform.OS === 'web' ? '30vw' : wp('30%'),
        height: Platform.OS === 'web' ? '5vh' : hp('5%'),
        width: Platform.OS === 'web' ? '40vw' : wp('40%'),
    },
    buttonText: {
        color: '#000',
        textAlign: 'center',
        fontSize: Platform.OS === 'web' ? '1.5rem' : hp('2.5%')
    },
    loginContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: Platform.OS === 'web' ? '5vw' : wp('5%'),
        marginTop: Platform.OS === 'web' ? '2vh' : hp('2%'),
        marginBottom: Platform.OS === 'web' ? '2.5vh' : hp('2.5%'),
    },
    login: {
        fontSize: Platform.OS === 'web' ? '1rem' : hp('2.5%'),
        color: '#000',
    },
    loginBold: {
        fontWeight: 'bold',
        fontSize: Platform.OS === 'web' ? '1rem' : hp('2.5%'),
    },
    icon: {
        width: Platform.OS === 'web' ? '2rem' : wp('2%'),
        height: Platform.OS === 'web' ? '1.5rem' : hp('2.5%'),
    },
});