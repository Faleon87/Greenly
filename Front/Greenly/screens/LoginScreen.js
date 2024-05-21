import React  from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Input, CheckBox } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
// Importa tus imágenes aquí
import eyeIcon from '../img/hide.png';
import eyeSlashIcon from '../img/view.png';
import logoImage from '../img/Logo.png'; // Asegúrate de reemplazar esto con la ruta a tu imagen
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
   
     
       // Guarda el nombre de usuario en AsyncStorage
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
        // Navega a la siguiente pantalla
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
        <Image source={logoImage} style={styles.logoImage} />
        <Text style={styles.logo}>Greenly</Text>
      </View>
      <Text style={styles.subtitle}>Welcome back. Enter your credentials to access your account</Text>
      <Text style={styles.label}>Email Address or User Name</Text>
      <Input
        placeholder="Enter your email or username"
        inputContainerStyle={[styles.inputContainer, usernameError ? styles.errorInput : null]}
        inputStyle={{ marginLeft: wp('3%') }}
        value={username}
        onChangeText={(text) => {
          setUsername(text);
          setUsernameError(''); // Limpia el error cuando el usuario empieza a escribir
        }}
      />
      {usernameError ? <Text style={styles.error}>{usernameError}</Text> : null}
      <Text style={styles.label}>Password</Text>
      <Input
        placeholder="Enter your password"
        secureTextEntry={hidePassword}
        inputContainerStyle={[styles.inputContainer, passwordError ? styles.errorInput : null]}
        inputStyle={{ marginLeft: wp('3%') }}
        value={password}
        onChangeText={(text) => {
          setPassword(text);
          setPasswordError(''); // Limpia el error cuando el usuario empieza a escribir
        }}
        rightIcon={
          <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
            <Image source={hidePassword ? eyeIcon : eyeSlashIcon} style={styles.icon} />
          </TouchableOpacity>
        }
      />
      {passwordError ? <Text style={styles.error}>{passwordError}</Text> : null}
      <View style={styles.checkboxContainer}>
        <CheckBox
          checked={isSelected}
          onPress={() => {
            setSelection(!isSelected); // Cambia el estado del checkbox
            setError(''); // Limpiar el error cuando el checkbox se marca
          }}
          checkedColor='#03453D'
        />
        <Text style={styles.labelCheckbox}>Keep me signed in</Text> 
      </View>
      <Text>
        {error ? <Text style={styles.error}>{error}</Text> : null} {/* Muestra el error si existe */}
      </Text>
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
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
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
    fontSize: hp('2%'),
    textAlign: 'center',
    marginTop: wp('-10%'),
  },
  errorInput: {
    borderColor: 'red',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'flex-start',
    padding: wp('5%'),
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: wp('2%'),
  },
  logoImage: {
    width: wp('20%'),
    height: hp('10%'),
    marginRight: wp('2%'),
  },
  logo: {
    fontSize: hp('4%'),
    fontWeight: 'bold',
  },
  title: {
    fontSize: hp('4%'),
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: wp('8%'),
  },
  subtitle: {
    fontSize: hp('2.5%'),
    textAlign: 'center',
    marginBottom: wp('8%'),
  },
  label: {
    marginLeft: wp('3%'),
    fontSize: hp('2%'),
    fontWeight: 'bold',
    marginBottom: wp('2%'),
  },
  inputContainer: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: wp('2%'),
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
  signup: {
    fontSize: hp('2.2%'),
    color: '#000',
    textAlign: 'center',
  },
  signupBold: {
    fontWeight: 'bold',
    fontSize: hp('2.2%'),
  },
  inputContainer: {
    height: hp('6%'),
    borderWidth: 1.5,
    borderColor: 'black',
    marginBottom: hp('4%'),
    borderRadius: 10,
  },
  icon: {
    width: wp('5%'),
    height: hp('2.5%'),
  },
});