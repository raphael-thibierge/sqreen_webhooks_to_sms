# Sqreen Webhook to SMS handler
![CI](https://github.com/raphael-thibierge/sqreen_webhooks_to_sms/workflows/CI/badge.svg)

Based on NodeJS + Express.

Handle [Sqreen](https://www.sqreen.com) HTTP webhooks and send basic infos by SMS using [Twilio](https://www.twilio.com).

Note: this is very minimal and was created just to play around with Sqreen webhooks. This code will probably not be maintained or improved.

## Usage
- Copy `example.env` to `.env` and configure APIs credentials
- Run it with docker
```bash
docker build . -t sqreen_webhooks
docker run -p 3000:3000 sqreen_webhooks
```

## TODOs
- [x] tests on sqreen sample
- [x] refactoring
- [ ] request body validation
- [ ] process multiple messages from request body, not only the first one
- [ ] protect with sqreen
- [ ] improve sms content
