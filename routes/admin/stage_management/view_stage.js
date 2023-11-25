const express = require('express');
const axios = require('axios');

const { getMoment, getTabSideBase, getRouteDeBase, getAxiosConfig, getUrlBackend, getAxiosConfigWithToken, isInteger } = require('../../../config/utils');
const { DEFAULT_PROFILE_ADMIN, stage_NAME, stage_VERSION, stage_DESCRIPTION, ROUTE_ADMIN_VIEW_APPLICATION, ROUTE_ADMIN_VIEW_STAGE } = require('../../../config/consts');
const { activeSidebare, getIndice } = require('../../../config/sidebare');
const router = express.Router();

const urlapi = getUrlBackend();
const axconfig = getAxiosConfig();
const moment = getMoment();

const SERVICE_TYPE = "admin_view_stage"

const profile = DEFAULT_PROFILE_ADMIN;
const tabside = getTabSideBase(profile)
const idbloc  = 1
const blocname = tabside[idbloc].texte
const pagename = "Détails d'une stage"
const template = "stage_list"
const routedebase = getRouteDeBase(profile)
const index = getIndice(tabside[idbloc].elements, template)
const page = tabside[idbloc].elements[index].texte
activeSidebare(tabside[idbloc].elements, index)

router.get('/:stage_id', async function (req, res, next) {
  const axconfig = getAxiosConfigWithToken(req.session.usertoken)
  let stage_id = parseInt(req.params.stage_id)

  let hasError = false
  let stage = {}

  if (isInteger(stage_id)) {
    let urlcomplete = urlapi + ROUTE_ADMIN_VIEW_STAGE
    let xdata = {
      stage_id: stage_id
    }

    try {
      let response = await axios.post(urlcomplete, xdata, axconfig)

      if (response.status == 200 && response.data.success) {
        stage = response.data.data.stage
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
    res.redirect(routedebase + "/stage_management/stage_list")
  } else {
    res.render(
      profile + "/stage_management/view_stage", {
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
      stage_id: stage_id,
      stage: stage
    })
  }
});

module.exports = router;