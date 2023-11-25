const express = require('express');
const axios = require('axios');

const { getMoment, getTabSideBase, getRouteDeBase, getAxiosConfig, getUrlBackend, getAxiosConfigWithToken, isInteger } = require('../../../config/utils');
const { DEFAULT_PROFILE_ADMIN, APP_NAME, APP_VERSION, APP_DESCRIPTION, ROUTE_ADMIN_VIEW_CLIENT, ROUTE_ADMIN_APPLICATION_LIST } = require('../../../config/consts');
const { activeSidebare, getIndice } = require('../../../config/sidebare');
const router = express.Router();

const urlapi = getUrlBackend();
const axconfig = getAxiosConfig();
const moment = getMoment();

const SERVICE_TYPE = "admin_client_list"

const profile = DEFAULT_PROFILE_ADMIN;
const tabside = getTabSideBase(profile)
const idbloc = 3
const blocname = tabside[idbloc].texte
const pagename = "Détails d'un client"
const template = "client_list"
const routedebase = getRouteDeBase(profile)
const index = getIndice(tabside[idbloc].elements, template)
const page = tabside[idbloc].elements[index].texte
activeSidebare(tabside[idbloc].elements, index)

router.get('/:client_id', async function (req, res, next) {
  const axconfig = getAxiosConfigWithToken(req.session.usertoken)
  let client_id = parseInt(req.params.client_id)

  let hasError = false
  let client = {}
  let applications = []

  if (isInteger(client_id)) {
    let urlcomplete = urlapi + ROUTE_ADMIN_VIEW_CLIENT
    let xdata = {
      client_id: client_id
    }

    try {
      let response = await axios.post(urlcomplete, xdata, axconfig)

      if (response.status == 200 && response.data.success) {
        client = response.data.data.client
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
    res.redirect(routedebase + "/client_management/client_list")
  } else {
    res.render(
      profile + "/client_management/view_client", {
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
      client_id: client_id,
      xclient: client
    })
  }
});

module.exports = router;