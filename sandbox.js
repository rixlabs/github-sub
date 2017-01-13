var fetch = require('node-fetch');

function askEvents(){
  return fetch('https://api.github.com/repos/rixlabs/mover/events', { method: 'GET', headers: {'User-Agent': ''} } )
          .then(r => r.json())
          .then(function(fetched) {
            return fetched[0]
          });
}

askEvents()
    .then(lastevent => console.log(lastevent));