# Sqreen Webhook to SMS handler
Based on NodeJS + Express.

Handle [Sqreen](https://www.sqreen.com) HTTP webhooks and send basic infos by SMS using [Twilio](https://www.twilio.com).

## Usage
- Copy `example.env` to `.env` and configure APIs credentials
- Run it with docker
```bash
docker build . -t sqreen_webhooks
docker run -p 3000:3000 sqreen_webhooks
```
