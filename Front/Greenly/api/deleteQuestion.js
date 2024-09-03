import { Alert } from "react-native";

async function deleteQuestion(questionId, onSuccess) {
  Alert.alert(
    "Confirmación",
    "¿Estás seguro de que quieres eliminar este elemento?",
    [
      {
        text: "Cancelar",
        onPress: () => console.log("Cancelado"),
        style: "cancel"
      },
      { text: "Eliminar", onPress: async () => {
          Alert.alert('Eliminando pregunta...', 'Con id: ' + questionId);

          try {
            const response = await fetch(`http://greenly.ddns.net:3000/chat/delete/${questionId}`, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
              },
            });

            if (!response.ok) {
              throw new Error(`Error: ${response.statusText}`);
            }

            if (response.ok) {
              Alert.alert('Pregunta eliminada', 'La pregunta se ha eliminado correctamente');
              if (onSuccess) {
                onSuccess(); // Llama al callback de éxito
              }
            }
            return await response.json();
          } catch (error) {
            console.error('Error:', error);
            throw error;
          }
        } 
      }
    ],
    { cancelable: false }
  );
}

export { deleteQuestion };