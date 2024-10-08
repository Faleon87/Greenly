export const getUserData = async (idUser) => {
    console.log('idUser:', idUser);
    try {
      const response = await fetch(`http://greenly.ddns.net:3000/user/profile/${idUser}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Data:', data);
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };