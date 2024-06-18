export const getUserData = async (idUser) => {
    try {
      const response = await fetch(`http://192.168.0.22:3000/user/profile/${idUser}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };