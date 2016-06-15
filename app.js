'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const https = require('https');
const fs = require('fs');
const routes = require('./routes/index');
const midds = require('./middlewares/index');

//SET ENVIRIOMENT
process.env.NODE_ENV = 'development';

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/api/v1/', cors(), midds.Origin, midds.PushRouter, routes.Api);

const cert = fs.readFileSync('./ssl/cert.crt', 'utf8');
const key = fs.readFileSync('./ssl/key.key', 'utf8');

const ssl = {cert: cert, key: key};
const port = 9000;

if(process.env.NODE_ENV === 'development') {
  app.listen(port, function() {
    console.log('listend in: ' + port);
  });
}

if(process.env.NODE_ENV === 'production') {
  const httpsServer = https.createServer(ssl, app);
  httpsServer.listen(port);
}
