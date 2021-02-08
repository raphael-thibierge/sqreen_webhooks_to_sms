const app = require('./src/app.js');

// start listening incoming requests
const SERVER_PORT = process.env.SERVER_PORT;
app.listen(SERVER_PORT, () => {
    console.log(`App url : http://localhost:${SERVER_PORT}/`);
})