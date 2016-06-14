'use strict';

const router = require('express').Router();
const ctrl = require('../controllers/index')

router.post('/send', ctrl.Api);

module.exports = router;
