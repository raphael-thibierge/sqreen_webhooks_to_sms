// configure .env
require('dotenv').config();

// imports
const express = require('express');
const bodyParser = require('body-parser');
const sendSms = require('./sendSms.js');
const checkSqreenSignature = require('./checkSqreenSignature.js');

// prepare app
const app = express();
// set body parser middleware
app.use(bodyParser.raw({ type: 'application/json' }))
// set screen signature verification middleware
app.use(checkSqreenSignature);


// MAIN HTTP POST ENDPOINT
app.post('/', (req, res) => {

    const data = req.body[0];

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
    sendSms(sms_content).then(twilio_response => {
        res.send(`SMS content :\n ${twilio_response.body}`);
    });

})

module.exports = app;