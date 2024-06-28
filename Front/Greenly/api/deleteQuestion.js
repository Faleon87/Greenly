import { Alert } from "react-native";

async function deleteQuestion(questionId) {
  // Muestra una alerta de confirmación antes de proceder
  Alert.alert(
    "Confirmación", // Título de la alerta
    "¿Estás seguro de que quieres eliminar este elemento?", // Mensaje de la alerta
    [
      {
        text: "Cancelar",
        onPress: () => console.log("Cancelado"),
        style: "cancel"
      },
      { text: "Eliminar", onPress: async () => {
          // Lógica para llamar a la API y borrar la pregunta
          console.log("Lógica de eliminación para el ID:", questionId);
          // Aquí iría el código para llamar a la API, por ejemplo:
          // const response = await fetch(`URL_DE_TU_API/${questionId}`, { method: 'DELETE' });
          // if (response.ok) { console.log('Elemento eliminado'); }
        } 
      }
    ],
    { cancelable: false } // Esto evita que se cierre la alerta al tocar fuera de ella
  );
}

export { deleteQuestion };