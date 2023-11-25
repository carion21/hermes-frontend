const express = require('express');
const axios = require('axios');

const { getMoment, getTabSideBase, getRouteDeBase, getAxiosConfig, getUrlBackend, getAxiosConfigWithToken, isArray } = require('../../../config/utils');
const { DEFAULT_PROFILE_ADMIN, stage_NAME, stage_VERSION, stage_DESCRIPTION, ROUTE_ADMIN_APPLICATION_LIST, ROUTE_ADMIN_ADD_CLIENT } = require('../../../config/consts');
const { activeSidebare, getIndice } = require('../../../config/sidebare');
const { control_service_data } = require('../../../config/global_functions');
const router = express.Router();

const urlapi = getUrlBackend();
const axconfig = getAxiosConfig();
const moment = getMoment();

const SERVICE_TYPE = "admin_add_client"

const profile = DEFAULT_PROFILE_ADMIN;
const tabside = getTabSideBase(profile)
const idbloc = 3
const blocname = tabside[idbloc].texte
const pagename = "Ajouter un client"
const template = "add_client"
const routedebase = getRouteDeBase(profile)
const index = getIndice(tabside[idbloc].elements, template)
const page = tabside[idbloc].elements[index].texte
activeSidebare(tabside[idbloc].elements, index)


router.get('/', async function (req, res, next) {

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
    userdata: req.session.userdata
  })
});

router.post('/', async function (req, res, next) {
  const axconfig = getAxiosConfigWithToken(req.session.usertoken)
  
  let body = req.body
  let bcontrol = control_service_data(SERVICE_TYPE, body)

  let error = ""

  if (bcontrol.success) {
    let urlcomplete = urlapi + ROUTE_ADMIN_ADD_CLIENT
    let xdata = {
      username: body.username,
      password: body.password,
      firstname: body.firstname,
      lastname: body.lastname,
      email: body.email,
      phone: body.phone
    }

    try {
      let response = await axios.post(urlcomplete, xdata, axconfig)

      if (response.status == 200 && response.data.success) {
        res.redirect(routedebase + "/client_management/client_list")
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
      moment: moment,
      rbody: body,
      error: error
    })
  }
});

module.exports = router;