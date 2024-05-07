const axios = require('axios');

const prompt = 'Translate the following English text to French: "{text}"';
const maxTokens = 60;

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
