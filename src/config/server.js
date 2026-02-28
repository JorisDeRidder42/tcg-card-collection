import express from 'express';
import axios from 'axios';

const app = express();

app.get('/api/sets', async (req, res) => {
  try {
    const response = await axios.get(VITE_APP_BASE_URL, {
      headers: { 'X-Api-Key': VITE_APP_API_KEY } // voeg hier je key in
    });
    res.json(response.data); // JSON terug naar React
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(5174, () => console.log('Proxy running on http://localhost:5174'));