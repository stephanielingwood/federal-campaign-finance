'use strict';

var express = require('express');
var _ = require('lodash');

var app = express();
var port = process.env.PORT || 3000;
var requestLib = require('request');
var api = process.env.SUNLIGHTAPI;


app.get('/', function(req, res) {
  requestLib('http://realtime.influenceexplorer.com/api/candidates/?format=json&state=WA&apikey=' + api, function (error, response, body) {
    if(!error && response.statusCode === 200) {
      var prettified = JSON.parse(body);
      var bigSpender = _.max(prettified.results, function(cand) {
        return Number(cand['total_expenditures']);
      });
      res.send(bigSpender);
    }
    res.send('error');
  });

});

app.listen(port, function() {
  console.log('Server started on port %d', port);
});
