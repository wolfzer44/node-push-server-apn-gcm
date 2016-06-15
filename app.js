'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes/index');
const midds = require('./middlewares/index');

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/api/v1/', cors(), midds.Origin, midds.PushRouter, routes.Api);

app.listen(9000, function() {
  console.log('listend in: 9000');
});
