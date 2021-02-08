const crypto = require('crypto');
const SQREEN_HEADER_NAME = 'X-Sqreen-Integrity'

const checkSqreenSignature = (req, res, next) => {

    // check Sqreen Header exists
    if (typeof req.header(SQREEN_HEADER_NAME) === 'undefined' ){
        res.status(400).send('Missing header "X-Sqreen-Integrity"');
        return;
    }

    try {
        // check signature
        const SQREEN_WEBHOOK_KEY = process.env.SQREEN_WEBHOOK_KEY;
        const digest = crypto.createHmac('sha256', SQREEN_WEBHOOK_KEY)
            .update(req.body)
            .digest();
        const isValid =  crypto.timingSafeEqual(digest,  Buffer.from(req.header(SQREEN_HEADER_NAME), 'hex'));

        // if request if is valid, continue execution...
        if (isValid) {
            req.body = JSON.parse(req.body.toString());
            next();
        } else {
            throw "Is not valid";
        }

    } catch (e) {
        res.status(401).send('Signature verification failed');
    }

}

module.exports = checkSqreenSignature;