// app.mjs
import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS
app.use(cors());

app.get('/api/users', async (req, res) => {
  try {
    const response = await fetch('https://602e7c2c4410730017c50b9d.mockapi.io/users');
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Error fetching users' });
  }
});


export default app;
