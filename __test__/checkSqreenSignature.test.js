const checkSqreenSignature = require('../src/checkSqreenSignature.js');
const app = require('../src/app.js');
const request = require('supertest');


describe("Test the root path", () => {

    test("Missing header X-Sqreen-Integrity not allowed", done => {
        request(app)
            .post("/")
            .then(response => {
                expect(response.statusCode).toBe(400);
                done();
            });
    });

});


