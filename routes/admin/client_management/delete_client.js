const express = require('express');
const axios = require('axios');

const { getMoment, getTabSideBase, getRouteDeBase, getAxiosConfig, getUrlBackend, getAxiosConfigWithToken, isInteger } = require('../../../config/utils');
const { DEFAULT_PROFILE_ADMIN, stage_NAME, stage_VERSION, stage_DESCRIPTION, ROUTE_ADMIN_DELETE_CLIENT } = require('../../../config/consts');
const { activeSidebare, getIndice } = require('../../../config/sidebare');
const { control_service_data } = require('../../../config/global_functions');
const router = express.Router();

const urlapi = getUrlBackend();
const axconfig = getAxiosConfig();
const moment = getMoment();

const SERVICE_TYPE = "admin_delete_client"

const profile = DEFAULT_PROFILE_ADMIN;
const tabside = getTabSideBase(profile)
const idbloc = 3
const blocname = tabside[idbloc].texte
const template = "client_list"
const routedebase = getRouteDeBase(profile)
const index = getIndice(tabside[idbloc].elements, template)
const page = tabside[idbloc].elements[index].texte
activeSidebare(tabside[idbloc].elements, index)

router.post('/:client_id', async function (req, res, next) {
  const axconfig = getAxiosConfigWithToken(req.session.usertoken)
  let body = req.body
  let client_id = parseInt(req.params.client_id)

  let bcontrol = control_service_data(SERVICE_TYPE, body)

  let hasError = false

  if (isInteger(client_id)) {

    if (bcontrol.success) {
      let urlcomplete = urlapi + ROUTE_ADMIN_DELETE_CLIENT
      let xdata = {
        client_id: client_id
      }

      try {
        let response = await axios.post(urlcomplete, xdata, axconfig)

        if (response.status == 200 && response.data.success) {
          res.redirect(routedebase + "/client_management/client_list")
        } else {
          hasError = true
        }
      } catch (err) {
        hasError = true
      };
    } else {
      hasError = true
    }

  } else {
    hasError = true
  }

  if (hasError) {
    res.redirect(routedebase + "/client_management/client_list")
  }
});

module.exports = router;