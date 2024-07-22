const express = require('express');
const axios = require('axios');

const app = express();

app.get('/api/data', async (req, res) => {
  try {
    const response = await axios.get('https://api.example.com/data');
    res.json(response.data);
  } catch (error) {
    res.status(500).send('Error fetching data from API');
  }
});

app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});
