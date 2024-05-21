

export const Chat = async () => {
    
    const response = await fetch(`http://192.168.0.22:3000/chat/renderchat`);
    
   const data = await response.json();


    if (!response.ok) {
        throw new Error('Something went wrong!');
    }


    return data;
}   

