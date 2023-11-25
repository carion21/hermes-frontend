const express = require('express');
const router = express.Router();

const service = 'admin'

// routers
const index = require('../routes/' + service + '/index')

const stage_list = require('../routes/' + service + '/stage_management/stage_list')
const add_stage = require('../routes/' + service + '/stage_management/add_stage')
const edit_stage = require('../routes/' + service + '/stage_management/edit_stage')
const view_stage = require('../routes/' + service + '/stage_management/view_stage')
const enable_stage = require('../routes/' + service + '/stage_management/enable_stage')
const disable_stage = require('../routes/' + service + '/stage_management/disable_stage')
const delete_stage = require('../routes/' + service + '/stage_management/delete_stage')

const operator_list = require('../routes/' + service + '/operator_management/operator_list')
const add_operator = require('../routes/' + service + '/operator_management/add_operator')
const edit_operator = require('../routes/' + service + '/operator_management/edit_operator')
const view_operator = require('../routes/' + service + '/operator_management/view_operator')
const enable_operator = require('../routes/' + service + '/operator_management/enable_operator')
const disable_operator = require('../routes/' + service + '/operator_management/disable_operator')
const delete_operator = require('../routes/' + service + '/operator_management/delete_operator')

const reset_operator_password = require('../routes/' + service + '/operator_management/reset_password')

const client_list = require('../routes/' + service + '/client_management/client_list')
const add_client = require('../routes/' + service + '/client_management/add_client')
const edit_client = require('../routes/' + service + '/client_management/edit_client')
const view_client = require('../routes/' + service + '/client_management/view_client')
const enable_client = require('../routes/' + service + '/client_management/enable_client')
const disable_client = require('../routes/' + service + '/client_management/disable_client')
const delete_client = require('../routes/' + service + '/client_management/delete_client')

const reset_client_password = require('../routes/' + service + '/client_management/reset_password')

// const request_list = require('../routes/' + service + '/request_management/request_list')
// const view_request = require('../routes/' + service + '/request_management/view_request')


// routes with each router
router.use('/', index)

router.use('/stage_management/stage_list', stage_list)
router.use('/stage_management/add_stage', add_stage)
router.use('/stage_management/edit_stage', edit_stage)
router.use('/stage_management/view_stage', view_stage)
router.use('/stage_management/enable_stage', enable_stage)
router.use('/stage_management/disable_stage', disable_stage)
router.use('/stage_management/delete_stage', delete_stage)

router.use('/operator_management/operator_list', operator_list)
router.use('/operator_management/add_operator', add_operator)
router.use('/operator_management/edit_operator', edit_operator)
router.use('/operator_management/view_operator', view_operator)
router.use('/operator_management/enable_operator', enable_operator)
router.use('/operator_management/disable_operator', disable_operator)
router.use('/operator_management/delete_operator', delete_operator)

router.use('/operator_management/reset_password', reset_operator_password)

router.use('/client_management/client_list', client_list)
router.use('/client_management/add_client', add_client)
router.use('/client_management/edit_client', edit_client)
router.use('/client_management/view_client', view_client)
router.use('/client_management/enable_client', enable_client)
router.use('/client_management/disable_client', disable_client)
router.use('/client_management/delete_client', delete_client)

router.use('/client_management/reset_password', reset_client_password)

// router.use('/request_management/request_list', request_list)
// router.use('/request_management/view_request', view_request)



module.exports = router;