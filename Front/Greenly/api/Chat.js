export const Chat = async () => {
    const response = await fetch(`http://3.80.72.197:3000/chat/renderchat`);
    const data = await response.json();
    if (!response.ok) {
        throw new Error('Something went wrong!');
    }
    return data;
}   

