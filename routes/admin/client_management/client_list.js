const express = require('express');
const axios = require('axios');

const { getMoment, getTabSideBase, getRouteDeBase, getAxiosConfig, getUrlBackend, getAxiosConfigWithToken } = require('../../../config/utils');
const { DEFAULT_PROFILE_ADMIN, stage_NAME, stage_VERSION, stage_DESCRIPTION, ROUTE_ADMIN_CLIENT_LIST } = require('../../../config/consts');
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
const pagename = "Liste des clients"
const template = "client_list"
const routedebase = getRouteDeBase(profile)
const index = getIndice(tabside[idbloc].elements, template)
const page = tabside[idbloc].elements[index].texte
activeSidebare(tabside[idbloc].elements, index)

router.get('/', async function (req, res, next) {
  const axconfig = getAxiosConfigWithToken(req.session.usertoken)
  let urlcomplete = urlapi + ROUTE_ADMIN_CLIENT_LIST

  let error = ""
  let clients = []

  try {
    let response = await axios.get(urlcomplete, axconfig)

    if (response.status == 200 && response.data.success) {
      clients = response.data.data.clients
    } else {
      error = response.data.message
    }
  } catch (err) {
    error = err.message
  }

  if (error) {
    console.log(error);
  }

  res.render(
    profile + "/" + tabside[idbloc].elements[index].template, {
    appName: stage_NAME,
    appVersion: stage_VERSION,
    appDescription: stage_DESCRIPTION,
    profile: profile,
    blocname: blocname,
    pagename: pagename,
    page: page,
    routedebase: routedebase,
    tabside: tabside,
    userdata: req.session.userdata,
    clients: clients,
    moment: moment,
    error: error
  })
});

router.post('/', async function (req, res, next) {
  let result = {
    success: false
  }

  res.json(result)
});

module.exports = router;