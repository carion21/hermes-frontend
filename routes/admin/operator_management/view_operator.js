const express = require('express');
const axios = require('axios');

const { getMoment, getTabSideBase, getRouteDeBase, getAxiosConfig, getUrlBackend, getAxiosConfigWithToken, isInteger } = require('../../../config/utils');
const { DEFAULT_PROFILE_ADMIN, APP_NAME, APP_VERSION, APP_DESCRIPTION, ROUTE_ADMIN_VIEW_OPERATOR, ROUTE_ADMIN_APPLICATION_LIST } = require('../../../config/consts');
const { activeSidebare, getIndice } = require('../../../config/sidebare');
const router = express.Router();

const urlapi = getUrlBackend();
const axconfig = getAxiosConfig();
const moment = getMoment();

const SERVICE_TYPE = "admin_operator_list"

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
  let operator = {}
  let applications = []

  if (isInteger(operator_id)) {
    let urlcomplete = urlapi + ROUTE_ADMIN_VIEW_OPERATOR
    let xdata = {
      operator_id: operator_id
    }

    try {
      let response = await axios.post(urlcomplete, xdata, axconfig)

      if (response.status == 200 && response.data.success) {
        operator = response.data.data.operator
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
  } else {
    res.render(
      profile + "/operator_management/view_operator", {
      appName: APP_NAME,
      appVersion: APP_VERSION,
      appDescription: APP_DESCRIPTION,
      profile: profile,
      blocname: blocname,
      pagename: pagename,
      page: page,
      routedebase: routedebase,
      tabside: tabside,
      userdata: req.session.userdata,
      operator_id: operator_id,
      operator: operator
    })
  }
});

module.exports = router;