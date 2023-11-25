const express = require('express');
const axios = require('axios');

const { getMoment, getTabSideBase, getRouteDeBase, getAxiosConfig, getUrlBackend, getAxiosConfigWithToken, isInteger } = require('../../../config/utils');
const { DEFAULT_PROFILE_ADMIN, stage_NAME, stage_VERSION, stage_DESCRIPTION, ROUTE_ADMIN_VIEW_OPERATOR, ROUTE_ADMIN_APPLICATION_LIST, ROUTE_ADMIN_RESET_OPERATOR_PASSWORD } = require('../../../config/consts');
const { activeSidebare, getIndice } = require('../../../config/sidebare');
const router = express.Router();

const urlapi = getUrlBackend();
const axconfig = getAxiosConfig();
const moment = getMoment();

const SERVICE_TYPE = "admin_reset_operator_password"

const profile = DEFAULT_PROFILE_ADMIN;
const tabside = getTabSideBase(profile)
const idbloc  = 2
const blocname = tabside[idbloc].texte
const pagename = "Détails d'un opérateur"
const template = "operator_list"
const routedebase = getRouteDeBase(profile)
const index = getIndice(tabside[idbloc].elements, template)
const page = tabside[idbloc].elements[index].texte
activeSidebare(tabside[idbloc].elements, index)

router.get('/:operator_id', async function (req, res, next) {
  const axconfig = getAxiosConfigWithToken(req.session.usertoken)
  let operator_id = parseInt(req.params.operator_id)

  let hasError = false

  if (isInteger(operator_id)) {
    let urlcomplete = urlapi + ROUTE_ADMIN_RESET_OPERATOR_PASSWORD
    let xdata = {
      operator_id: operator_id
    }

    try {
      let response = await axios.post(urlcomplete, xdata, axconfig)

      if (response.status == 200 && response.data.success) {
        res.redirect(routedebase + "/operator_management/view_operator/" + operator_id)
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
    res.redirect(routedebase + "/operator_management/operator_list")
  }
});

module.exports = router;