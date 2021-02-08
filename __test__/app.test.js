const app = require('../src/app.js');
const request = require('supertest');

describe("Test app with Webhook preview samples provided by Sqreen", () => {

    process.env.APP_ENV = 'test';

    test("Security event", done => {
        process.env.SQREEN_WEBHOOK_KEY = 'ad61a02ac978865752d42fcbdf7227049fe727caff8b3ceaf5b96b0e2557fcc7';
        request(app)
            .post("/")
            .set({'Content-Type': 'application/json', 'X-Sqreen-Integrity': '39855f30529bc20bef733f60a0a8e7d8ee5c1b0cf93abbd4a1904dd462775e5d'})
            .send('[{"message_id": null, "api_version": "2", "date_created": "2021-02-08T12:45:00.078701+00:00", "message_type": "security_event", "retry_count": 0, "message": {"risk_coefficient": 25, "event_category": "http_error", "event_kind": "not_found", "application_id": "601366f227a5d5001fe83586", "application_name": "montres-berger", "environment": "production", "date_occurred": "2021-01-30T10:03:54.905000+00:00", "event_id": "60152f0bbdc966000fc88b58", "event_url": "https://my.sqreen.com/application/601366f227a5d5001fe83586/events/60152f0bbdc966000fc88b58", "humanized_description": "Potential Vulnerability discovery from 103.6.198.100", "ips": [{"address": "103.6.198.100", "is_tor": false, "hostname": "jassid.mschosting.com", "geo": {"code": "MYS", "point": [112.5, 2.5]}, "date_resolved": "2021-01-30T10:03:55.148000+00:00"}]}}]')
            .then(response => {
                expect(response.statusCode).toBe(200);
                done();
            });
    });

    test("Webhook Test payload", done => {
        process.env.SQREEN_WEBHOOK_KEY = '6ec4dfa5d0a5bf55a22bfb09b31b3b9e477585dba216308daff6846030be713a';
        request(app)
            .post("/")
            .set({'Content-Type': 'application/json', 'X-Sqreen-Integrity': '1cc53d806b193455c86b92667432ca214f0fb77288a265beb106a928004b4600'})
            .send('[{"message_id": null, "api_version": "2", "date_created": "2021-02-08T12:45:00.363713+00:00", "message_type": "test", "retry_count": 0, "message": {"application_name": "montres-berger", "environment": "production", "id": "9adffc2374c70b1ee84711225e7fc618", "event_category": "test", "event_kind": "test_kind", "risk": 42, "date_occurred": "2021-02-08T12:45:00.363819+00:00", "humanized_description": "", "url": "http://test", "ips": [{"address": "42.42.42.42", "date_resolved": "2021-02-08T12:45:00.363859+00:00"}]}}]')
            .then(response => {
                expect(response.statusCode).toBe(200);
                done();
            });
    });

    test("Sample Incident", done => {
        process.env.SQREEN_WEBHOOK_KEY = '9b2d2b52e469f753c4d80fb998e4fe4a28e4c114e9a7578fe002879f0b21bf1c';
        request(app)
            .post("/")
            .set({'Content-Type': 'application/json', 'X-Sqreen-Integrity': '27141ffd4c52b9af672adcffbdcffc22c1fc1367ef31ec913485782ce3929e5c'})
            .send('[{"message_id": null, "api_version": "2", "date_created": "2021-02-08T12:45:00.364140+00:00", "message_type": "http_scan", "retry_count": 0, "message": {"incident_thread": "track_collection_401be473f7c55f732882c781fb007a35", "incident_status": "created", "date_started": "2021-01-29T01:39:04.897000+00:00", "date_last_updated": "2021-01-29T02:02:10.118000+00:00", "application_id": "601366f227a5d5001fe83586", "new_related_ips": [{"address": "213.245.178.46", "is_tor": false, "hostname": "213-245-178-46.rev.numericable.fr", "geo": {"code": "FRA", "city": "Paris", "point": [2.4075, 48.8323]}, "date_resolved": "2021-01-29T01:39:21.738000+00:00", "vpn": false, "proxy": false, "datacenter": false, "metadata": {"version": 4, "multicast": false, "private": false, "global": true, "unspecified": false, "reserved": false, "loopback": false, "network_type": "public"}, "critical": false, "tags": []}]}}]')
            .then(response => {
                expect(response.statusCode).toBe(200);
                done();
            });
    });

    test("Playbook", done => {
        process.env.SQREEN_WEBHOOK_KEY = '6f6fcb85ce31f2afa69144d6bfa4c9ea8ae531c15f7a7680994158bf0a30ee42';
        request(app)
            .post("/")
            .set({'Content-Type': 'application/json', 'X-Sqreen-Integrity': '0e583a043e067801856d5cbeee35912afa6ccb4f9524a5968bf16cd64460e6dd'})
            .send('[{"message_id": null, "api_version": "2", "date_created": "2021-02-08T12:45:00.399927+00:00", "message_type": "security_response", "retry_count": 0, "message": {"properties": {"ips": [{"ip_cidr": "127.0.0.1"}], "user_identifiers": ["sqreen@example.com"]}, "application": {"name": "montres-berger", "id": "601366f227a5d5001fe83586", "environment": "production"}, "playbook": {"id": "6021324c88ecfb001f891814", "name": "Test Playbook"}}}]')
            .then(response => {
                expect(response.statusCode).toBe(200);
                done();
            });
    });
});