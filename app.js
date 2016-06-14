'use strict';

const express = require('express');
const app = express();
const routes = require('./routes/index');
const midds = require('./middlewares/index');

app.use('/api/v1/', midds.PushRouter, routes.Api);

app.listen(9000, function() {
  console.log('listend in: 9000');
});
