// Import the express module
const express = require('express');

// Create an instance of express
const app = express();

// Middleware to log requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Route for the root endpoint
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// Route for the /about endpoint
app.get('/about', (req, res) => {
  res.send('This is the about page.');
});

// Handle 404 - Keep this as a last route
app.use((req, res, next) => {
  res.status(404).send("Sorry, can't find that!");
});

// Start the server on port 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
