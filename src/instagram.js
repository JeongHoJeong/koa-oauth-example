const fetch = require('node-fetch')
const FormData = require('form-data')

const instagramClientId = process.env.INSTAGRAM_CLIENT_ID
const instagramClientSecret = process.env.INSTAGRAM_CLIENT_SECRET
const instagramRedirectUri = process.env.INSTAGRAM_REDIRECT_URI

function applyInstagramRoutes(router) {
  router.get('/instagram/callback', async ctx => {
    const { code } = ctx.query
    ctx.status = 200
    ctx.body = code

    const form = new FormData()
    form.append('client_id', instagramClientId)
    form.append('client_secret', instagramClientSecret)
    form.append('grant_type', 'authorization_code')
    form.append('redirect_uri', instagramRedirectUri)
    form.append('code', code)

    const resp = await fetch(
      `https://api.instagram.com/oauth/access_token`,
      {
        method: 'POST',
        body: form,
      },
    )

    const info = await resp.json()
    ctx.body = info
  })
}

function getInstagramLoginUrl() {
  return `https://api.instagram.com/oauth/authorize/?` +
    `client_id=${instagramClientId}&` +
    `redirect_uri=${encodeURIComponent(instagramRedirectUri)}&` +
    `response_type=code`
}

module.exports = {
  applyInstagramRoutes,
  getInstagramLoginUrl,
}
