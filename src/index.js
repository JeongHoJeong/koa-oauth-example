const Koa = require('koa')
const Router = require('koa-router')
const views = require('koa-views')
const bodyParser = require('koa-bodyparser')

require('dotenv').config()

const { applyTwitterRoutes, twitterOAuthInfo } = require('./twitter')
const { applyGoogleRoutes, googleClientId } = require('./google')
const { applyInstagramRoutes, getInstagramLoginUrl } = require('./instagram')

const app = new Koa()
const router = new Router()

applyTwitterRoutes(router)
applyGoogleRoutes(router)
applyInstagramRoutes(router)

const port = process.env.PORT || 3000

router.get('/', async ctx => {
  const auth = await twitterOAuthInfo
  const twitterLoginUrl = `https://twitter.com/oauth/authenticate?oauth_token=${auth.oAuthToken}`
  const instagramLoginUrl = getInstagramLoginUrl()

  await ctx.render('index', {
    twitterLoginUrl,
    instagramLoginUrl,
    googleClientId,
  })
})

app
  .use(views('views', {
    map: {
      html: 'underscore',
    },
  }))
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(port, () => {
  console.log(`Server opened at: http://localhost:${port}`)
})
