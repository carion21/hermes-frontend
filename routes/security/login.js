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
  if (req.session.usertoken) {
    res.redirect("/" + req.session.userdata.profile)
  } else {
    res.render(
      "security/login", {
      appName: stage_NAME,
      appVersion: stage_VERSION,
      appDescription: stage_DESCRIPTION,
      service: service
    })
  }
});

router.post('/', async function (req, res, next) {
  let body = req.body
  let bcontrol = control_service_data(SERVICE_TYPE, body)

  let error = ""

  if (bcontrol.success) {
    let urlcomplete = urlapi + ROUTE_SECURITY_SIGNIN
    let xdata = {
      username: body.username,
      password: body.password
    }
    try {
      let response = await axios.post(urlcomplete, xdata, axconfig)
      if (response.status == 200 && response.data.success) {
        let rdata = response.data

        // let session = req.session
        req.session.usertoken = rdata.data.token
        req.session.expiration = rdata.data.expiration
        req.session.userdata = rdata.data.userdata

        if (DEFAULT_PROFILES.includes(req.session.userdata.profile)) {
          res.redirect("/" + req.session.userdata.profile)
        } else {
          error = "Profile is not valid"
        }

      } else {
        error = response.data.message
      }

    } catch (err) {
      error = err.message
    }

  } else {
    error = bcontrol.message
  }

  if (error) {
    res.render(
      "security/login", {
      appName: stage_NAME,
      appVersion: stage_VERSION,
      appDescription: stage_DESCRIPTION,
      service: service,
      rbody: body,
      error: error
    })
  }
});

module.exports = router;