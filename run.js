const fetch = require("node-fetch");
const OAuth2 = require("simple-oauth2");
require("dotenv").config();

const clientId = process.env.OAUTH_CLIENT_ID;
const clientSecret = process.env.OAUTH_CLIENT_SECRET;

const apiHost = "https://sandbox-api.aife.economie.gouv.fr";
const tokenHost = "https://sandbox-oauth.aife.economie.gouv.fr";

const credentials = {
  client: {
    id: clientId,
    secret: clientSecret
  },
  auth: {
    tokenHost,
    tokenPath: "/api/oauth/token",
    authorizePath: "/api/oauth/authorize"
  },
  options: {
    authorizationMethod: "body"
  }
};

const getAccessToken = async () => {
  const oauth2 = OAuth2.create(credentials);
  try {
    const result = await oauth2.clientCredentials.getToken({
      scope: "openid"
    });
    const accessToken = oauth2.accessToken.create(result);
    return accessToken.token.access_token;
  } catch (error) {
    console.log("error", error);
    console.log("Access Token error", error.message);
  }
};

const dilaFetch = async ({ path, method = "POST", body }) => {
  const token = await getAccessToken();
  const url = `${apiHost}/${path}`;
  const data = await fetch(url, {
    method,
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body
  })
    .then(r => r.json())
    .catch(console.log);

  return data;
};

dilaFetch({
  path: "dila/legifrance/lf-engine-app/consult/kaliArticle",
  body: JSON.stringify({
    id: "KALIARTI000026231889"
  })
})
  .then(console.log)
  .catch(console.log);
