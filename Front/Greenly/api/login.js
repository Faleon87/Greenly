import * as Network from 'expo-network';

export const loginUser = async (username, password) => {
  try {
    // Verificar el estado de la red
    const networkState = await Network.getNetworkStateAsync();
    if (!networkState.isConnected) {
      throw new Error('No internet connection');
    }

    const response = await fetch('http://greenly.ddns.net:3000/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });


    const data = await response.json();

    if (data.message) {
      if (data.message.includes('User')) {
        throw new Error('UserError:' + data.message);
      } else if (data.message.includes('password')) {
        throw new Error('PasswordError:' + data.message);
      } else {
        throw new Error(data.message);
      }
    }

    return data;
  } catch (error) {
    console.error('Network error:', error.message);
    throw error;
  }
};