import React, { useState } from 'react';
import { View, TextInput, Button, Text, ScrollView } from 'react-native';
import axios from 'axios';

function ChatScreen() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    setMessages([...messages, { text: input, sender: 'user' }]);
    setInput('');

    const response = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
      prompt: input,
      max_tokens: 60,
    }, {
      headers: {
        'Authorization': `Bearer YOUR_OPENAI_API_KEY`,
        'Content-Type': 'application/json',
      },
    });

    setMessages([...messages, { text: response.data.choices[0].text, sender: 'bot' }]);
  };

  return (
    <View>
      <ScrollView>
        {messages.map((message, index) => (
          <Text key={index} style={{ color: message.sender === 'user' ? 'blue' : 'red' }}>
            {message.text}
          </Text>
        ))}
      </ScrollView>
      <TextInput value={input} onChangeText={setInput} />
      <Button title="Send" onPress={sendMessage} />
    </View>
  );
}

export default ChatScreen;