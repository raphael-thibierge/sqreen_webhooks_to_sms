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

// configure body parser
const bodyParser = require('body-parser');
app.use(bodyParser.raw({ type: 'application/json' }))

// define sqreen signature verification function
const SQREEN_WEBHOOK_KEY = process.env.SQREEN_WEBHOOK_KEY;
const crypto = require('crypto');
function check_signature(req) {
    const digest = crypto.createHmac('sha256', SQREEN_WEBHOOK_KEY)
        .update(req.body)
        .digest();
    return crypto.timingSafeEqual(digest,  Buffer.from(req.header('X-Sqreen-Integrity'), 'hex'));
}


// define main route
app.post('/', (req, res) => {

    // verify sqreen signature
    if (check_signature(req)){
        // parse webhook data
        const data = JSON.parse(req.body.toString());

        // prepare sms content
        const sms_content = data[0].message_type;

        // send sms and then HTTP response
        send_sms(sms_content).then(twilio_response => {
            res.send(`SMS content : ${twilio_response.body}`);
        });
    }
    else {
        res.send('check_signature failed !')
    }
})

// start listening incoming requests
app.listen(SERVER_PORT, () => {
    console.log(`App url : http://localhost:${SERVER_PORT}/`);
})