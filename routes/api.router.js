'use strict';

const router = require('express').Router();
// const ctrl = require('')
router.post('/send', function(req, res) {
  console.log('oi');

  res.sendStatus(201);
});

module.exports = router;
