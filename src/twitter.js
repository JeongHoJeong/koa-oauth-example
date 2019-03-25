const OAuth = require('oauth')

const twitterConsumerAPIKey = process.env.TWITTER_CONSUMER_API_KEY
const twitterConsumerAPISecretKey = process.env.TWITTER_CONSUMER_API_SECRET_KEY

const twitterOAuth = new OAuth.OAuth(
  'https://api.twitter.com/oauth/request_token',
  'https://api.twitter.com/oauth/access_token',
  twitterConsumerAPIKey,
  twitterConsumerAPISecretKey,
  '1.0A',
  'http://localhost:3000/twitter/callback',
  'HMAC-SHA1'
)

const twitterOAuthInfo = new Promise((resolve, reject) => {
  twitterOAuth.getOAuthRequestToken((error, oAuthToken, oAuthTokenSecret) => {
    if (error) {
      reject(error)
    } else {
      resolve({
        oAuthToken,
        oAuthTokenSecret,
      })
    }
  })
})

function applyTwitterRoutes(router) {
  router.get('/twitter/callback', async ctx => {
    const auth = await twitterOAuthInfo
    const { oauth_token, oauth_verifier } = ctx.query

    return new Promise(resolve => {
      twitterOAuth.getOAuthAccessToken(
        oauth_token,
        auth.oAuthTokenSecret,
        oauth_verifier,
        (error, oAuthAccessToken, oAuthAccessTokenSecret) => {
          if (error) {
            ctx.body = 'Error occured while getting access token.'
            ctx.status = 500
          } else {
            twitterOAuth.get(
              'https://api.twitter.com/1.1/account/verify_credentials.json',
              oAuthAccessToken,
              oAuthAccessTokenSecret,
              (error, twitterResponseData) => {
                if (error) {
                  ctx.status = 500
                  ctx.body = error
                } else {
                  ctx.status = 200
                  ctx.body = twitterResponseData
                }
                resolve()
              },
            )
          }
        },
      )
    })
  })
}

module.exports = {
  applyTwitterRoutes,
  twitterOAuthInfo,
}
