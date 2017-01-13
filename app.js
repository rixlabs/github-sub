var express = require('express')
var app = express()
var unirest = require('unirest')
var fetch = require('node-fetch');


const key = process.env.GHS_KEY

app.get('/success', (req, res) => {
  res.send('');
});



app.get('/', (req, res) => {
  console.log("before ask")
  askEvents().then(function (lastevent) {
    console.log("Then");
    console.log(lastevent);
    res.send(lastevent);
    console.log("sended");
  })

});

app.post('/move', function (req, res) {
  res.send('Got a POST request')
})

//.headers({'Authorization': 'token '+key, 'User-Agent': ''})

function askEvents(){
  return fetch('https://api.github.com/repos/rixlabs/mover/events', { method: 'GET', headers: {'User-Agent': ''} } )
          .then(r => r.json())
          .then(function(fetched) {
            return fetched[0]
          });
}



app.listen(3030, function () {
  console.log('Example app listening on port 3030!')
})
