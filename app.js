var express = require('express')
var app = express()
var unirest = require('unirest')

const key = process.env.GHS_KEY

app.get('/success', (req, res) => {
  res.send('');
});

app.get('/', (req, res) => {
  unirest.get('https://api.github.com/repos/runexec/Polodex/commits')
  .headers({'Authorization': 'token '+key, 'User-Agent': ''})
  .send({ "parameter": 23, "foo": "bar" })
  .end(function (response) {
    console.log(response.body);
  });
  res.send('Hello');
});

app.post('/move', function (req, res) {
  res.send('Got a POST request')
})

app.listen(3030, function () {
  console.log('Example app listening on port 3030!')
})
