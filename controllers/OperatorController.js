const express = require('express');
const router = express.Router();

const service = 'operator'

// routers
const index = require('../routes/' + service + '/index')

const request_list = require('../routes/' + service + '/request_management/request_list')
const change_status = require('../routes/' + service + '/request_management/change_status')
const view_request = require('../routes/' + service + '/request_management/view_request')


// routes with each router
router.use('/', index)

router.use('/request_management/request_list', request_list)
router.use('/request_management/change_status', change_status)
router.use('/request_management/view_request', view_request)


module.exports = router;