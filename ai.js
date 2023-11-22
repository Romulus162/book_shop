const dotenv = require('dotenv');
const ai = require('openai');

dotenv.config();

const openai = new ai.OpenAI({
  apikey: process.env.OPENAI_API_KEY,
});

openai.beta.assistants.create({
  name: 'Customer Service',
  instructions: 'You answer questions about books',
  model: 'gpt-4-1106-preview',
});
