const express = require('express');
const axios = require('axios');

const { getMoment, getTabSideBase, getRouteDeBase, getAxiosConfig, getUrlBackend, getAxiosConfigWithToken, isInteger, isArray } = require('../../../config/utils');
const { DEFAULT_PROFILE_ADMIN, stage_NAME, stage_VERSION, stage_DESCRIPTION, ROUTE_ADMIN_VIEW_OPERATOR, ROUTE_ADMIN_APPLICATION_LIST, ROUTE_ADMIN_EDIT_OPERATOR } = require('../../../config/consts');
const { activeSidebare, getIndice } = require('../../../config/sidebare');
const { control_service_data } = require('../../../config/global_functions');
const router = express.Router();

const urlapi = getUrlBackend();
const axconfig = getAxiosConfig();
const moment = getMoment();

const SERVICE_TYPE = "admin_edit_operator"

const profile = DEFAULT_PROFILE_ADMIN;
const tabside = getTabSideBase(profile)
const idbloc = 2
const blocname = tabside[idbloc].texte
const pagename = "Modifier un opérateur"
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
      profile + "/operator_management/edit_operator", {
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
      operator_id: operator_id,
      operator: operator
    })
  }
});


router.post('/:operator_id', async function (req, res, next) {
  const axconfig = getAxiosConfigWithToken(req.session.usertoken)
  let operator_id = parseInt(req.params.operator_id)

  if (isInteger(operator_id)) {
    let body = req.body
    if (!isArray(body.application_ids)) {
      body.application_ids = [body.application_ids]
    }

    let bcontrol = control_service_data(SERVICE_TYPE, body)

    let applications = []

    let error = ""

    if (bcontrol.success) {
      let urlcomplete = urlapi + ROUTE_ADMIN_EDIT_OPERATOR

      let xdata = {
        operator_id: operator_id,
        username: body.username,
        firstname: body.firstname,
        lastname: body.lastname,
        email: body.email,
        phone: body.phone
      }

      try {
        response = await axios.post(urlcomplete, xdata, axconfig)
  
        if (response.status == 200 && response.data.success) {
          res.redirect(routedebase + "/operator_management/operator_list")
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
        profile + "/operator_management/edit_operator", {
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
        operator_id: operator_id,
        applications: applications,
        rbody: body,
        error: error
      })
    }
  } else {
    res.redirect(routedebase + "/admin_management/admin_list")
  }
});

module.exports = router;