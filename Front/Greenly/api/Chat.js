

export const Chat = async (idUser) => {
    
   
    
    const response = await fetch(`http://192.168.0.22:3000/chat/${idUser}`);
    
   const data = await response.json();

   console.log(data);

    if (!response.ok) {
        throw new Error('Something went wrong!');
    }


    return data;
}   

