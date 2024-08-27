export const Chat = async () => {
    const response = await fetch(`http://44.192.55.84:3000/chat/renderchat`);
    const data = await response.json();
    if (!response.ok) {
        throw new Error('Something went wrong!');
    }
    return data;
}   

