const express = require('express');
const axios = require('axios');

const { getMoment, getTabSideBase, getRouteDeBase, getAxiosConfig, getUrlBackend, getAxiosConfigWithToken, isInteger } = require('../../../config/utils');
const { DEFAULT_PROFILE_OPERATOR, stage_NAME, stage_VERSION, stage_DESCRIPTION, ROUTE_OPERATOR_ENABLE_CLIENT, ROUTE_OPERATOR_UPDATE_REQUEST } = require('../../../config/consts');
const { activeSidebare, getIndice } = require('../../../config/sidebare');
const router = express.Router();

const urlapi = getUrlBackend();
const axconfig = getAxiosConfig();
const moment = getMoment();

const SERVICE_TYPE = "operator_update_request"

const profile = DEFAULT_PROFILE_OPERATOR;
const tabside = getTabSideBase(profile)
const idbloc = 1
const blocname = tabside[idbloc].texte
const template = "request_list"
const routedebase = getRouteDeBase(profile)
const index = getIndice(tabside[idbloc].elements, template)
const page = tabside[idbloc].elements[index].texte
activeSidebare(tabside[idbloc].elements, index)

router.get('/:request_id/:status_id', async function (req, res, next) {
  const axconfig = getAxiosConfigWithToken(req.session.usertoken)
  let request_id = parseInt(req.params.request_id)

  let hasError = false

  if (isInteger(request_id)) {
    let urlcomplete = urlapi + ROUTE_OPERATOR_UPDATE_REQUEST
    let xdata = {
      request_id: request_id,
      request_status: parseInt(req.params.status_id)
    }

    try {
      let response = await axios.post(urlcomplete, xdata, axconfig)

      if (response.status == 200 && response.data.success) {
        res.redirect(routedebase + "/request_management/view_request/" + request_id)
      } else {
        hasError = true
      }
    } catch (err) {
      hasError = true
    };
  } else {
    hasError = true
  }

  if (hasError) {
    res.redirect(routedebase + "/request_management/request_list")
  }
});

module.exports = router;