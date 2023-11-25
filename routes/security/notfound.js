const express = require('express');
const axios = require('axios');
const validator = require('email-validator');

const { getMoment, getUrlBackend, getAxiosConfig } = require('../../config/utils');
const { ROUTE_SECURITY_SIGNIN, stage_NAME, stage_VERSION, stage_DESCRIPTION, DEFAULT_PROFILES } = require('../../config/consts');
const { control_service_data } = require('../../config/global_functions');
const router = express.Router();

const SERVICE_TYPE = "security_login"

const urlapi = getUrlBackend();
const axconfig = getAxiosConfig();
const moment = getMoment();
const service = "security"

router.get('/', async function (req, res, next) {
  res.render(
    "security/notfound", {
    appName: stage_NAME,
    appVersion: stage_VERSION,
    appDescription: stage_DESCRIPTION,
    service: service
  })
});


module.exports = router;