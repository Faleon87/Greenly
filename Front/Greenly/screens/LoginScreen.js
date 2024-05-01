import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Input, CheckBox } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

// Importa tus imágenes aquí
import eyeIcon from '../img/view.png';
import eyeSlashIcon from '../img/hide.png';
import logoImage from '../img/Logo.png'; // Asegúrate de reemplazar esto con la ruta a tu imagen

export default function LoginScreen() {
  const [isSelected, setSelection] = React.useState(false);
  const [hidePassword, setHidePassword] = React.useState(true);
  const [error, setError] = React.useState(''); // Nuevo estado para el 
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const login = () => {
    fetch('http://localhost:3000/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setIsLoading(false);
        if (data.error) {
          setError(data.error);
        } else {
          // Aquí puedes redirigir al usuario a la siguiente pantalla
          console.log(data);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        setError('An error occurred. Please try again later.');
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={logoImage} style={styles.logoImage} />
        <Text style={styles.logo}>Greenly</Text>
      </View>
      <Text style={styles.subtitle}>Welcome back. Enter your credentials to access your account</Text>
      <Text style={styles.label}>Email Address or User name</Text>
      <Input
        placeholder="Enter your email or username"
        inputContainerStyle={styles.inputContainer}
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <Input
        placeholder="Enter your password"
        secureTextEntry={hidePassword}
        inputContainerStyle={styles.inputContainer}
        value={password}
        onChangeText={(text) => setPassword(text)}
        rightIcon={
          <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
            <Image
              source={hidePassword ? eyeSlashIcon : eyeIcon}
              style={{ width: 20, height: 20 }}
            />
          </TouchableOpacity>
        }
      />
      <View style={styles.checkboxContainer}>
        <CheckBox
          checked={isSelected}
          onPress={() => {
            setSelection(!isSelected);
            setError(''); // Limpiar el error cuando el checkbox se marca
          }}
          checkedColor='#03453D'
        />
        <Text style={styles.label}>Keep me signed in</Text>
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
      <Text style={styles.signup}>Don't have an Account? <Text style={styles.signupBold}>Sign up here</Text></Text>
    </View>
  );
}

const styles = StyleSheet.create({
  error: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: hp('2%'),
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    padding: '5%',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // Alinea los elementos al inicio del contenedor
    marginBottom: '3%',
  },
  logoImage: {
    width: wp('20%'),
    height: hp('10%'),
    marginRight: 10, // Ajusta este valor para cambiar el espacio entre la imagen y el texto
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
    fontSize: hp('2.5%'),
    fontWeight: 'bold',
    marginBottom: wp('2%'),
  },
  inputContainer: {
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: wp('10%'),
    paddingHorizontal: wp('4%'),
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: wp('8%'),
  },
  button: {
    backgroundColor: '#8FD053',
    padding: wp('3%'),
    marginBottom: wp('5%'),
    marginTop: wp('6%'),
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
    height: 40,
    borderWidth:  1.5,
    borderColor: 'black',
    borderRadius: 6,
  },
});