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
        // WARNING : we only process first message
        const data = JSON.parse(req.body.toString())[0];

        // prepare sms content
        let sms_content = "Empty sms...";
        switch (data.message_type) {
            case 'test':
                sms_content = "Sqreen webhook test";
                break;

            case 'security_event':
                sms_content = "New security event : \n"
                    +`App: ${data.message.application_name}\n`
                    +`Env: ${data.message.environment}\n`
                    + data.message.humanized_description;
                break;

            case 'security_response':
                sms_content = "New security response triggered : \n"
                    +`App: ${data.message.application.name}\n`
                    +`Env: ${data.message.application.environment}\n`
                    +`Playbook: ${data.message.playbook.name}`;
                break;

            default:
                sms_content = "New security incident : \n"
                    +`App: ${data.message.application_id}\n`
                    +`Type: ${data.message_type}`;
                break;

        }


        // send sms and then HTTP response
        send_sms(sms_content).then(twilio_response => {
            res.send(`SMS content :\n ${twilio_response.body}`);
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