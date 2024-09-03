import { Alert } from "react-native";

const updateLikes= async (id, likes) => {

  console.log(id, likes);

    const response = await fetch(`http://greenly.ddns.net:3000/chat/updatelikes/${id}`, {
      method: 'PUT', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ likes }),
    });
  
    if (!response.ok) {
        Alert.alert('Error', 'Hubo un error al actualizar los likes');
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  
    const data = await response.json();
    console.log(data);
    return data;
    
  }

export default updateLikes;