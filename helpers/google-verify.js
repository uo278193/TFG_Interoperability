const { OAuth2Client } = require('google-auth-library')

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const GOOGLE_SECRET_ID = process.env.GOOGLE_SECRET_ID
const REDIRECT_URI = "http://localhost:8080/"

const client = new OAuth2Client(CLIENT_ID);

  const googleVerify = async ( id_token ) => {
    const ticket = await client.verifyIdToken({
        idToken: id_token,
        audience: CLIENT_ID
    });

    const payload = ticket.getPayload();

    return payload

  }

module.exports = { googleVerify }