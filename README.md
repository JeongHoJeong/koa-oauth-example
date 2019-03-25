# Koa OAuth Example (Twitter, Google)

Minimal OAuth example with [Koa](https://koajs.com/) and [node-oauth](https://github.com/ciaranj/node-oauth).

## How to test
You need to create your own Twitter app [here](https://developer.twitter.com/). You can find consumer API key and consumer API secret key in *Keys and tokens* tab of your app details page.

Then you need to set its callback URL according to your test environment. (e.g., http://localhost:3000/callback)

Create your own `.env` file at the project root, and then fill it with required variables.

```bash
TWITTER_CONSUMER_API_KEY=your-key
TWITTER_CONSUMER_API_SECRET_KEY=your-secret-key
GOOGLE_OAUTH2_CLIENT_ID=your-key
GOOGLE_OAUTH2_CLIENT_SECRET=your-secret-key
```

You can run the server by following commands.

```bash
yarn install
yarn start
```
