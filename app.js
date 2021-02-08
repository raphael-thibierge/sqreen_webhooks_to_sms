// configure.env
require('dotenv').config();

// configure express
const express = require('express');
const app = express();

// define env vars
const SERVER_PORT = process.env.SERVER_PORT;

// define main route
app.get('/', (req, res) => {
    res.send('Hello World !');
})

// start listening incoming requests
app.listen(SERVER_PORT, () => {
    console.log(`App url : http://localhost:${SERVER_PORT}/`);
})