# Celebal-Tech Project

This is a simple Express application connected to a MongoDB database using Mongoose.

## Prerequisites

- Node.js
- MongoDB


   ```sh
   npm install
   ```

## Usage

1. Start the MongoDB server
   ```sh
   mongod
   ```

2. Run the application
   ```sh
   node app.js
   ```

The server will start on port 9000 and you should see the message `Server started`.

## Code Overview

```javascript
const express = require('express');
const mongoose = require('mongoose');
const url = 'mongodb://127.0.0.1/celeb_database';

const app = express();

mongoose.connect(url, { useNewUrlParser: true });
const con = mongoose.connection;

con.on('open', () => {
    console.log('connected...');
});

app.use(express.json());

const alienRouter = require('./routes/route');
app.use('/aliens', alienRouter);

app.listen(9000, () => {
    console.log('Server started');
});
```

## Endpoints

- `GET /aliens` - Retrieve all aliens
- `POST /aliens` - Create a new alien
- `GET /aliens/:id` - Retrieve a specific alien by ID
- `PATCH /aliens/:id` - Update a specific alien by ID
- `DELETE /aliens/:id` - Delete a specific alien by ID

## License

This project is licensed under the MIT License.

