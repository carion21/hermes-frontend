const express = require('express');
const router = express.Router();

const service = 'security'

// routers
const index = require('../routes/' + service + '/index')

const login = require('../routes/' + service + '/login')
const logout = require('../routes/' + service + '/logout')
const notfound = require('../routes/' + service + '/notfound')


// routes with each router
router.use('/', index)

router.use('/login', login)
router.use('/logout', logout)
router.use('/notfound', notfound)


module.exports = router;
