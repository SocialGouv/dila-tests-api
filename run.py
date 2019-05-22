import os
import json
from dotenv import load_dotenv
from oauthlib.oauth2 import BackendApplicationClient
from requests_oauthlib import OAuth2Session

API_HOST = "https://sandbox-api.aife.economie.gouv.fr"
TOKEN_URL = 'https://sandbox-oauth.aife.economie.gouv.fr/api/oauth/token'

# 1. connect using the "client credentials" grant type
# cf https://requests-oauthlib.readthedocs.io/en/latest/oauth2_workflow.html#backend-application-flow
load_dotenv()
client_id = os.getenv("OAUTH_CLIENT_ID")
client_secret = os.getenv("OAUTH_CLIENT_SECRET")
# print("client_id is %s, client_secret is %s" % (client_id, client_secret))
client = BackendApplicationClient(client_id=client_id, scope="openid")
oauth = OAuth2Session(client=client)
token = oauth.fetch_token(
  token_url=TOKEN_URL,
  client_id=client_id,
  client_secret=client_secret
)
client = OAuth2Session(client_id, token=token)

# 2. try a random request
payload = {
  "codeName": "Code civil",
  "pageNumber": 1,
  "pageSize": 10,
  "sort": "TITLE_ASC",
  "states": [
    "VIGUEUR"
  ]
}
res = client.post(
  "%s/dila/legifrance/lf-engine-app/list/code" % API_HOST,
  data=json.dumps(payload)
)
print("res is %s" % res.json())
