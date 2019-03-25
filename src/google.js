const { google } = require('googleapis')

const googleClientId = process.env.GOOGLE_OAUTH2_CLIENT_ID
const googleClientSecret = process.env.GOOGLE_OAUTH2_CLIENT_SECRET

function applyGoogleRoutes(router) {
  router.post('/google/auth', async ctx => {
    const { code } = ctx.request.body

    const oauth2Client = new google.auth.OAuth2(
      googleClientId,
      googleClientSecret,
      'postmessage',
    )

    const { tokens } = await oauth2Client.getToken(code)
    oauth2Client.setCredentials(tokens)

    const people = google.people({
      version: 'v1',
      auth: oauth2Client,
    })

    const res = await people.people.get({
      resourceName: 'people/me',
      personFields: 'emailAddresses,names,photos',
    })

    ctx.status = 200
    ctx.body = res['data']
  })
}

module.exports = {
  applyGoogleRoutes,
  googleClientId,
}
