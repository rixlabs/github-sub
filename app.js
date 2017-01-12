var express = require('express')
var app = express()

// Initialize the OAuth2 Library
const simpleOauthModule = require('simple-oauth2')

//Must create a github Oauth application and set id and secret given by Github wth ENV variables
const id = process.env.GHS_ID
const secret = process.env.GHS_SECRET

//Set up Github endpoints
const oauth2 = simpleOauthModule.create({
  client: {
    id: id,
    secret: secret
  },
  auth: {
    tokenHost: 'https://github.com',
    tokenPath: '/login/oauth/access_token',
    authorizePath: '/login/oauth/authorize',
  }
});


const authorizationUri = oauth2.authorizationCode.authorizeURL({
  redirect_uri: 'http://localhost:3030/callback',
  scope: 'notifications',
  state: '3(#0/!~',
});



// Initial page redirecting to Github
app.get('/auth', (req, res) => {
  console.log(authorizationUri);
  res.redirect(authorizationUri);
});

// Callback service parsing the authorization token and asking for the access token
app.get('/callback', (req, res) => {
  const code = req.query.code;
  const options = {
    code,
  };

  oauth2.authorizationCode.getToken(options, (error, result) => {
    if (error) {
      console.error('Access Token Error', error.message);
      return res.json('Authentication failed');
    }

    console.log('The resulting token: ', result);
    const token = oauth2.accessToken.create(result);

    return res
      .status(200)
      .json(token);
  });
});

app.get('/success', (req, res) => {
  res.send('');
});

app.get('/', (req, res) => {
  res.send('Hello<br><a href="/auth">Log in with Github</a>');
});

app.post('/move', function (req, res) {
  res.send('Got a POST request')
})

app.listen(3030, function () {
  console.log('Example app listening on port 3030!')
})
