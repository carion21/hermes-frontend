const express = require('express');

const { getAppName, getMoment } = require('../../config/utils');
const router = express.Router();

const moment = getMoment();
const service = "home"

router.get('/', async function (req, res, next) {

  res.redirect('/security')
});


module.exports = router;