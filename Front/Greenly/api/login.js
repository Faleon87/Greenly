export const loginUser = async (username, password) => {
      const response = await fetch('http://44.192.55.84:3000/user/login', { // Cambiar la IP por la de tu servidor
      method: 'POST', // Método HTTP POST
      headers: { // Cabeceras de la petición
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username, // Nombre de usuario
        password: password, // Contraseña
      }),
    });
    const data = await response.json(); // Convierte la respuesta en un objeto JSON
  
    if (data.message) {
      if (data.message.includes('User')) { // Comprueba si el mensaje contiene la palabra 'User'
        throw new Error('UserError:' + data.message); // Lanza un error personalizado
      } else if (data.message.includes('password')) { // Comprueba si el mensaje contiene la palabra 'password'
        throw new Error('PasswordError:' + data.message); // Lanza un error personalizado
      } else { 
        throw new Error(data.message); // Lanza un error con el mensaje recibido
      }
    }
   
  
    return data;
  };