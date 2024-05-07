import React, { useState } from 'react';
import { Button, TextInput, View, Text, ScrollView } from 'react-native';
import axios from 'axios';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

axios.post('https://api.openai.com/v4/engines/davinci-codex/completions', {
  prompt,
  max_tokens: maxTokens,
}, {
  headers: {
    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
    'Content-Type': 'application/json',
  },
}).then(response => {
  console.log(response.data.choices[0].text.trim());
}).catch(error => {
  console.error(error);
});
