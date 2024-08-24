import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Platform } from 'react-native';
import recoverPassword  from '../api/passwordRecovery';
import { useNavigation } from '@react-navigation/native';

const PasswordRecoveryScreen = () => {

    const navigator = useNavigation();

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePasswordRecovery = async () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email address.');
      return;
    }

    setLoading(true);

    const result = await recoverPassword(email);
    if (result){
        navigator.navigate('Login');
    }


    setLoading(false);

    Alert.alert(result.success ? 'Success' : 'Error', result.message);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recover Password</Text>
      <Text style={styles.instructions}>Enter your email address to receive a password recovery link.</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TouchableOpacity style={styles.button} onPress={handlePasswordRecovery} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? 'Sending...' : 'Recover Password'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: Platform.OS === 'web' ? '4vw' : 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  instructions: {
    fontSize: Platform.OS === 'web' ? '2vw' : 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  input: {
    width: Platform.OS === 'web' ? '40vw' : '80%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#8FD053',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: Platform.OS === 'web' ? '20vw' : '60%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: Platform.OS === 'web' ? '2vw' : 16,
    fontWeight: 'bold',
  },
});

export default PasswordRecoveryScreen;