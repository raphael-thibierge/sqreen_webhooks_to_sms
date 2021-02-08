// configure twilio
const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const FROM_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER;
const TO_PHONE_NUMBER = process.env.DEST_PHONE_NUMBER;
const twilio = require('twilio');

// function to send sms with twilio, return a promise
const sendSms = (message_body) => {

    // TODO : remove this very ugly way to prevent sending SMS during tests
    if (process.env.APP_ENV === 'test'){
        return new Promise((resolve, reject)=>{resolve(message_body)});
    }

    const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
    return client.messages
        .create({
            body: message_body,
            from: FROM_PHONE_NUMBER,
            to: TO_PHONE_NUMBER
        });
}

module.exports = sendSms;