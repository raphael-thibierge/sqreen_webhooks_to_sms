// configure twilio
const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const FROM_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER;
const TO_PHONE_NUMBER = process.env.DEST_PHONE_NUMBER;
const twilio_client = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

// function to send sms with twilio, return a promise
const sendSms = (message_body) => {
    return twilio_client.messages
        .create({
            body: message_body,
            from: FROM_PHONE_NUMBER,
            to: TO_PHONE_NUMBER
        });
}

module.exports = sendSms;