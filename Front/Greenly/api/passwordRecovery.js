const recoverPassword = async (email) => {
      const response = await fetch('http://3.80.72.197:3000/user/recover', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
  
      const result = await response.text();

      if (response.ok) {
        return { success: true, message: result };
        

      } else {
        return { success: false, message: result.message || 'Something went wrong. Please try again.' };
      } 
  };

export default recoverPassword;