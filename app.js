// configure.env
require('dotenv').config();

// configure express
const express = require('express');
const app = express();
const SERVER_PORT = process.env.SERVER_PORT;

// configure twilio
const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const FROM_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER;
const TO_PHONE_NUMBER = process.env.DEST_PHONE_NUMBER;
const twilio_client = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

// function to send sms with twilio, return a promise
function send_sms(message_body){
     return twilio_client.messages
            .create({
                body: message_body,
                from: FROM_PHONE_NUMBER,
                to: TO_PHONE_NUMBER
            });
}

// define main route
app.get('/', (req, res) => {
    send_sms('Hello world').then(twilio_response => {
        res.send(`SMS content : ${twilio_response.body}`);
    });
})

// start listening incoming requests
app.listen(SERVER_PORT, () => {
    console.log(`App url : http://localhost:${SERVER_PORT}/`);
})