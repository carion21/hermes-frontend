const express = require('express');
const axios = require('axios');

const { getMoment, getTabSideBase, getRouteDeBase, getAxiosConfig, getUrlBackend } = require('../../config/utils');
const { DEFAULT_PROFILE_OPERATOR, stage_NAME, stage_VERSION, stage_DESCRIPTION } = require('../../config/consts');
const { activeSidebare, getIndice } = require('../../config/sidebare');
const router = express.Router();

const urlapi = getUrlBackend();
const axconfig = getAxiosConfig();
const moment = getMoment();

const profile = DEFAULT_PROFILE_OPERATOR;
const tabside = getTabSideBase(profile)
const idbloc  = 0
const blocname = tabside[idbloc].texte
const pagename = "Tableau de bord"
const template = "index"
const routedebase = getRouteDeBase(profile)
const index = getIndice(tabside[idbloc].elements, template)
const page = tabside[idbloc].elements[index].texte
activeSidebare(tabside[idbloc].elements, index)

router.get('/', async function (req, res, next) {

  res.render(
    profile + "/" +  tabside[idbloc].elements[index].template, {
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
  let result = {
    success: false
  }

  res.json(result)
});

module.exports = router;