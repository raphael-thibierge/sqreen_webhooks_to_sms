const express = require('express');
const app = express();
const server_port = 3000;

app.get('/', (req, res) => {
    res.send('Hello World !');
})

// start listening incoming requests
app.listen(server_port, () => {
    console.log(`App listening on port ${server_port}`);
})