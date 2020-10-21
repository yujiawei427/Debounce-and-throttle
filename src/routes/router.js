const express = require('express');
const axios = require('axios'); //也可以用http fetch

const router = express.Router();

router.get('/api/autocomplete/:query', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  const autocompleteUrl =`https://autocomplete.geocoder.ls.hereapi.com/6.2/suggest.json?apiKey=${process.env.APIKEY}&maxresults=5&country=AUS&query=`;
  axios({
    method: 'GET',
    url: autocompleteUrl + req.params.query,
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    }
  }).then(response => {
    res.send(JSON.stringify(response.data))
  }).catch(error => {
    res.send(JSON.stringify(error), 400);
  })
});

router.use('/', express.static('client'))

module.exports = router; // router是middleware，api-serve是dependency injection用法