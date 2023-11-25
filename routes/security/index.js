const express = require('express');

const { getMoment } = require('../../config/utils');
const router = express.Router();

const moment = getMoment();
const service = "security"

router.get('/', async function (req, res, next) {
  res.redirect('/security/login')
});


module.exports = router;