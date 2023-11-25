const express = require('express');

const axios = require('axios');

const { getAppName, getMoment, getUrlBackend, getAxiosConfig } = require('../../config/utils');
const { ROUTE_SECURITY_SIGNOUT } = require('../../config/consts');
const router = express.Router();

const urlapi = getUrlBackend();
const axconfig = getAxiosConfig();
const moment = getMoment();
const service = "security"

router.get('/', async function (req, res, next) {
  if (req.session.usertoken) {
    let urlcomplete = urlapi + ROUTE_SECURITY_SIGNOUT
    let xdata = {
      user_token: req.session.usertoken
    }
    try {
      let response = await axios.post(urlcomplete, xdata, axconfig)
      if (response.status == 200 && response.data.success) {
        let rdata = response.data
        console.log(rdata.message)
      }
    } catch (err) {
      console.error(err.message)
    }
    req.session.destroy();

  }
  res.redirect('/security');

});


module.exports = router;