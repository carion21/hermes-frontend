const express = require('express');
const axios = require('axios');

const { getMoment, getTabSideBase, getRouteDeBase, getAxiosConfig, getUrlBackend, getAxiosConfigWithToken, isInteger } = require('../../../config/utils');
const { DEFAULT_PROFILE_OPERATOR, stage_NAME, stage_VERSION, stage_DESCRIPTION, ROUTE_OPERATOR_VIEW_REQUEST, GENDER_TYPES, GENDER_TYPES_LABELS, _STATUSES_LABELS, _STATUSES_BADGES, ROUTE_OPERATOR_BOOK_LIST_BY_REQUEST, REQUEST_STATUSES_LABELS, REQUEST_STATUSES_BADGES, OPERATOR_REQUEST_STATUSES_PERMISSIONS } = require('../../../config/consts');
const { activeSidebare, getIndice } = require('../../../config/sidebare');
const router = express.Router();

const urlapi = getUrlBackend();
const axconfig = getAxiosConfig();
const moment = getMoment();

const SERVICE_TYPE = "operator_view_request"

const profile = DEFAULT_PROFILE_OPERATOR;
const tabside = getTabSideBase(profile)
const idbloc = 1
const blocname = tabside[idbloc].texte
const pagename = "Détails d'une demande de reclamation"
const template = "request_list"
const routedebase = getRouteDeBase(profile)
const index = getIndice(tabside[idbloc].elements, template)
const page = tabside[idbloc].elements[index].texte
activeSidebare(tabside[idbloc].elements, index)


router.get('/:request_id', async function (req, res, next) {
  const axconfig = getAxiosConfigWithToken(req.session.usertoken)
  let request_id = parseInt(req.params.request_id)

  let hasError = false
  let request = {}
  let deliverybook = {}

  if (isInteger(request_id)) {
    let urlcomplete = urlapi + ROUTE_OPERATOR_VIEW_REQUEST
    let xdata = {
      request_id: request_id
    }

    try {
      let response = await axios.post(urlcomplete, xdata, axconfig)

      if (response.status == 200 && response.data.success) {
        request = response.data.data.request
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
  } else {
    res.render(
      profile + "/request_management/view_request", {
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
      labels: REQUEST_STATUSES_LABELS,
      badges: REQUEST_STATUSES_BADGES,
      permissions: OPERATOR_REQUEST_STATUSES_PERMISSIONS,
      request_id: request_id,
      request: request,
      moment: moment
    })
  }
});

module.exports = router;