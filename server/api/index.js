'use strict'

const express = require('express')
const router = express.Router()
const fileUploader = require('../config/files/file-storage')
const Response = require('../response')

router.get('/', (req, res, next) => {
    Response.send(res, 200, Response.Message('HelloWorld!'))
})

router.post('/images', fileUploader.any(), (req, res, next) => {
    Response.send(res, 201, Response.Message('Done'))
})

module.exports = router