// LoginScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, CheckBox, Image } from 'react-native';
import { Input } from 'react-native-elements';

// Importa tus imágenes aquí
import eyeIcon from '../img/view.png';
import eyeSlashIcon from '../img/hide.png';

export default function LoginScreen() {
  const [isSelected, setSelection] = React.useState(false);
  const [hidePassword, setHidePassword] = React.useState(true);

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Greenly</Text>
      <Text style={styles.title}>Login</Text>
      <Text style={styles.subtitle}>Welcome back. Enter your credentials to account</Text>
      <Text style={styles.label}>Email Address or User name</Text>
      <Input
        style={styles.input}
        placeholder="Enter your email or username"
      />
      <Text style={styles.label}>Password</Text>
      <Input
        style={styles.input}
        placeholder="Enter your password"
        secureTextEntry={hidePassword}
        inputContainerStyle={styles.inputContainer}
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
          value={isSelected}
          onValueChange={setSelection}
          style={styles.checkbox}
        />
        <Text style={styles.label}>Keep me signed in</Text>
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
      <Text style={styles.signup}>Don't have an Account? Sign up here</Text>
    </View>
  );
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: 'center',
  },
  button: {
    backgroundColor: '#02907D',
    padding: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  signup: {
    fontSize: 14,
    color: '#02907D',
    textAlign: 'center',
  },
  inputContainer: {
    height: 40,},
});