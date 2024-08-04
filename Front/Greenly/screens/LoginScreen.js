import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Platform } from 'react-native';
import { Input, CheckBox } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import eyeIcon from '../img/hide.png';
import eyeSlashIcon from '../img/view.png';
import logoImage from '../img/Logo.png';
import { loginUser } from '../api/login';

export default function LoginScreen({ navigation }) {
  const [isSelected, setSelection] = React.useState(false);
  const [hidePassword, setHidePassword] = React.useState(true);
  const [error, setError] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const [usernameError, setUsernameError] = React.useState('');
  const [passwordError, setPasswordError] = React.useState('');

  const [isLoading, setIsLoading] = React.useState(false);

  const login = async () => {
    setIsLoading(true);
    try {
      const data = await loginUser(username, password);
      setIsLoading(false);

      await AsyncStorage.setItem('nombre', data.username);

      if (data.img !== null && data.img !== undefined) {
        await AsyncStorage.setItem('img', data.img);
      } else {
        await AsyncStorage.setItem('img', 'https://www.kindpng.com/picc/m/78-785827_user-profile-avatar-login-human-png-icon.png');
      }

      await AsyncStorage.setItem('idUser', JSON.stringify(data.idUser));

      if (username === 'admin') {
        navigation.navigate('Admin');
      } else {
        navigation.navigate('Pantalla');
      }
    } catch (error) {
      setIsLoading(false);
      if (error.message.startsWith('UserError:')) {
        setUsernameError(error.message.substring(10));
      } else if (error.message.startsWith('PasswordError:')) {
        setPasswordError(error.message.substring(14));
      } else {
        console.log(error.message);
        setError(error.message);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={logoImage} style={styles.logoImage} resizeMode='contain' />
        <Text style={styles.logo}>Greenly</Text>
      </View>
      <Text style={styles.subtitle}>Welcome back. Enter your credentials to access your account</Text>
      <Text style={styles.label}>Email Address or User Name</Text>
      <Input
        placeholder="Enter your email or username"
        inputContainerStyle={[styles.inputContainer, usernameError ? styles.errorInput : null]}
        inputStyle={styles.input}
        value={username}
        onChangeText={(text) => {
          setUsername(text);
          setUsernameError(''); // Clear error when user starts typing
        }}
      />
      {usernameError ? <Text style={styles.error}>{usernameError}</Text> : null}
      <Text style={styles.label}>Password</Text>
      <Input
        placeholder="Enter your password"
        secureTextEntry={hidePassword}
        inputContainerStyle={[styles.inputContainer, passwordError ? styles.errorInput : null]}
        inputStyle={styles.input}
        value={password}
        onChangeText={(text) => {
          setPassword(text);
          setPasswordError(''); // Clear error when user starts typing
        }}
        rightIcon={
          <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
            <Image source={hidePassword ? eyeIcon : eyeSlashIcon} style={styles.icon} resizeMode='contain' />
          </TouchableOpacity>
        }
      />
      {passwordError ? <Text style={styles.error}>{passwordError}</Text> : null}
      <View style={styles.checkboxContainer}>
        <CheckBox
          checked={isSelected}
          onPress={() => {
            setSelection(!isSelected); // Toggle checkbox state
            setError(''); // Clear error when checkbox is checked
          }}
          checkedColor='#03453D'
        />
        <Text style={styles.labelCheckbox}>Keep me signed in</Text>
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null} 
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          if (!isSelected) {
            setError('Please check the checkbox before continuing.');
          } else {
            setError('');
            setIsLoading(true);
            login();
          }
        }}
      >
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
      <View style={styles.signupContainer}>
        <Text style={styles.signup}>Don't have an Account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.signupBold}>Sign up here</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  error: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: Platform.OS === 'web' ? '1rem' : hp('2%'),
    textAlign: 'left',
    marginBottom: Platform.OS === 'web' ? '2vh': hp('2%')
  },
  errorInput: {
    borderColor: 'red',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    padding: Platform.OS === 'web' ? '5vw' : wp('5%'), // Usa vw en la web y % en móviles
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Platform.OS === 'web' ? '5vh' : hp('5%'), // Usa vh en la web y % en móviles
  },
  logoImage: {
    width: Platform.OS === 'web' ? '20vw' : wp('20%'),
    height: Platform.OS === 'web' ? '10vh' : hp('10%'),
    marginRight: Platform.OS === 'web' ? '2vw' : wp('2%'),
  },
  logo: {
    fontSize: Platform.OS === 'web' ? '2rem' : hp('4%'),
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: Platform.OS === 'web' ? '1rem' : hp('2.5%'),
    textAlign: 'center',
    marginBottom: Platform.OS === 'web' ? '4vh' : hp('4%'),
    paddingHorizontal: Platform.OS === 'web' ? '5vw' : wp('5%'),
  },
  label: {
    fontSize: Platform.OS === 'web' ? '1rem' : hp('2%'),
    fontWeight: 'bold',
    marginBottom: Platform.OS === 'web' ? '1vh' : hp('1%'),
    paddingHorizontal: Platform.OS === 'web' ? '2vw' : wp('2%'),
  },
  inputContainer: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: Platform.OS === 'web' ? '2vh' : hp('2%'),
    paddingHorizontal: Platform.OS === 'web' ? '2vw' : wp('3%'),
    height: Platform.OS === 'web' ? '6vh' : hp('6%'),

  },
  input: {
    fontSize: Platform.OS === 'web' ? '1rem' : hp('2%'),
    
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Platform.OS === 'web' ? '2vh' : hp('2%'),
  },
  labelCheckbox: {
    fontSize: Platform.OS === 'web' ? '1rem' : hp('2%'),
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#8FD053',
    paddingVertical: Platform.OS === 'web' ? '2vh' : hp('2%'),
    paddingHorizontal: Platform.OS === 'web' ? '10vw' : wp('10%'),
    marginBottom: Platform.OS === 'web' ? '3vh' : hp('3%'),
    borderRadius: 5,
    alignItems: 'center',
    boxShadow: Platform.OS === 'web' ? '0px 4px 6px rgba(0, 0, 0, 0.1)' : 'none',
    elevation: Platform.OS === 'android' ? 5 : 0,
  },
  buttonText: {
    color: '#000',
    fontSize: Platform.OS === 'web' ? '1.5rem' : hp('2.5%'),
  },
  signup: {
    fontSize: Platform.OS === 'web' ? '1rem' : hp('2.2%'),
    color: '#000',
    textAlign: 'center',
  },
  signupBold: {
    fontWeight: 'bold',
    fontSize: Platform.OS === 'web' ? '1rem' : hp('2.2%'),
  },
  icon: {
    width: Platform.OS === 'web' ? '5vw' : wp('5%'),
    height: Platform.OS === 'web' ? '2.5vh' : hp('2.5%'),
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
